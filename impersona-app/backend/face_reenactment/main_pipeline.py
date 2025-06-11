from rvc_python.infer import RVCInference

import os
import os.path as osp
import tyro

from live_portrait_src.config.argument_config import ArgumentConfig
from live_portrait_src.config.inference_config import InferenceConfig
from live_portrait_src.config.crop_config import CropConfig
from live_portrait_src.live_portrait_pipeline import LivePortraitPipeline
from ffmpeg_src.ffmpeg_commands import *


def partial_fields(target_class, kwargs):
    return target_class(**{k: v for k, v in kwargs.items() if hasattr(target_class, k)})


def fast_check_args(args: ArgumentConfig):
    if not osp.exists(args.source):
        raise FileNotFoundError(f"source info not found: {args.source}")
    if not osp.exists(args.driving):
        raise FileNotFoundError(f"driving info not found: {args.driving}")


def create_live_portrait_model(source, driving, output_dir, voice_model):
    # set tyro theme
    tyro.extras.set_accent_color("bright_cyan")
    #args = tyro.cli(ArgumentConfig)
    args = ArgumentConfig(
        source=source,
        driving=driving,
        output_dir=output_dir,
        voice_model=voice_model
    )

    ffmpeg_dir = os.path.join(os.getcwd(), "ffmpeg")
    if osp.exists(ffmpeg_dir):
        os.environ["PATH"] += (os.pathsep + ffmpeg_dir)

    if not fast_check_ffmpeg():
        raise ImportError(
            "FFmpeg is not installed. Please install FFmpeg (including ffmpeg and ffprobe) before running this script. https://ffmpeg.org/download.html"
        )

    fast_check_args(args)

    # specify configs for inference
    inference_cfg = partial_fields(InferenceConfig, args.__dict__)
    crop_cfg = partial_fields(CropConfig, args.__dict__)

    live_portrait_pipeline = LivePortraitPipeline(
        inference_cfg=inference_cfg,
        crop_cfg=crop_cfg
    )

    # run  
    wfp, _ = live_portrait_pipeline.execute(args)

    return wfp, args


def process_audio_with_rvc(model_name, input_audio_path, output_audio_path):
    rvc = RVCInference(models_dir="./face_reenactment/models", device="cuda:0")
    rvc.load_model(model_name)
    rvc.set_params(f0up_key=2, protect=0.5)
    
    rvc.infer_file(input_audio_path, output_audio_path)
    
    rvc.unload_model()


#if __name__ == "__main__":
def main_file(model_name, source):
    driving = "face_reenactment/assets/driving/driving.mp4"
    output_dir = "face_reenactment/animations/"
    voice_model = model_name

    # LivePortrait (face reenactment)
    wpf_path, args = create_live_portrait_model(source, driving, output_dir, voice_model)

    # add rvc
    extracted_audio_path = "./face_reenactment/sound/original_sound.wav"
    new_audio_path = "./face_reenactment/sound/output.wav"
    output_video_path = "./face_reenactment/assets/output/output.mp4"
    extract_audio_from_video(wpf_path, extracted_audio_path)
    
    process_audio_with_rvc(args.voice_model, extracted_audio_path, new_audio_path)

    replace_audio_in_video(wpf_path, new_audio_path, output_video_path)
