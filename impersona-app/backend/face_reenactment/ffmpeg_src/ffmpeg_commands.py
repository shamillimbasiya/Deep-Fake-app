import os
import subprocess


def fast_check_ffmpeg():
    try:
        subprocess.run(["ffmpeg", "-version"], capture_output=True, check=True)
        return True
    except:
        return False


def extract_audio_from_video(video_path, output_audio_path):

    # Check if the output file exists
    if os.path.exists(output_audio_path):
        # Remove the existing file to overwrite it
        os.remove(output_audio_path)

    command = [
        "ffmpeg",
        "-i", video_path,       # Input video file
        "-q:a", "0",            # Best quality
        "-map", "a",            # Select only the audio stream
        output_audio_path       # Output audio file
    ]
    subprocess.run(command, check=True)


def replace_audio_in_video(video_path, new_audio_path, output_video_path):


    # Check if the output file exists
    if os.path.exists(output_video_path):
        # Remove the existing file to overwrite it
        os.remove(output_video_path)

    command = [
        "ffmpeg",
        "-i", video_path,       # Input video file
        "-i", new_audio_path,   # New audio file
        "-c:v", "copy",         # Copy the video stream without re-encoding
        "-map", "0:v",          # Use video stream from the first input
        "-map", "1:a",          # Use audio stream from the second input (new audio)
        "-shortest",            # Stop when the shortest stream ends
        output_video_path       # Output video file
    ]
    subprocess.run(command, check=True)
