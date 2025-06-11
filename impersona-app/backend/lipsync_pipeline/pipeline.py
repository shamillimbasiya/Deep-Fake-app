
import subprocess
from TTS.api import TTS
import sys
tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2", gpu=True)

def main(prompt):
    #text = "Doanald Trump just won the election and Kamala lost with one vote. I VOTED FOR TRUMPINATOR, or i dont know. I forgot. I will sleep now"
    speaker = "main.mp3"
    output_name = "output.wav"

    tts.tts_to_file(text=prompt,
                    file_path=f"lipsync_pipeline/output/audio/{output_name}",
                    speaker_wav=f"lipsync_pipeline/assets/reference_voices/{speaker}",
                    language="en")



    audio_name = "output.wav"
    video_name = "main.mp4"
    output_name = "result.mp4"

    audio_path = f"lipsync_pipeline/output/audio/{audio_name}"
    video_path = f"lipsync_pipeline/assets/reference_videos/{video_name}"
    output_path = f"lipsync_pipeline/output/video/{output_name}"

    # command = f"python Wav2Lip/inference.py --checkpoint_path Wav2Lip/checkpoints/wav2lip_gan.pth --face {video_path} --audio {audio_path} --outfile {output_path} --pads 0 20 0 0"

    # !{command}


    command = [
        'python', 'lipsync_pipeline/Wav2Lip/inference.py', 
        '--checkpoint_path', "lipsync_pipeline/Wav2Lip/checkpoints/wav2lip_gan.pth",
        '--audio', audio_path, 
        '--face', video_path, 
        '--outfile', output_path,
        #'--pads', "0", "20", "0", "0"
    ]

    # Run the command
    subprocess.run(command)

if __name__ == "__main__":
    prompt = sys.argv[1]
    main(prompt)