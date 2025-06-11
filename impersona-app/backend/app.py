from flask import Flask, jsonify, request, send_file
from flask_cors import CORS

import sys
import os
import subprocess

sys.path.append(os.path.join(os.path.dirname(__file__), 'face_reenactment'))
from face_reenactment.main_pipeline import main_file

sys.path.append(os.path.join(os.path.dirname(__file__), 'lipsync_pipeline'))

app = Flask(__name__)

CORS(app)

name_dict = {
    "Donald Trump": "trump",
    "Barack Obama": "obama",
    "Morgan Freeman": "morgan",
    "Darth Vader": "vader",
    "Albert Einstein": "einstein",
    "Mark Zuckerberg": "zuckerberg",
    "Bill Gates": "gates",
    "Brittany Murphy": "murphy",
    "Egirl": "egirl"
}


def save_data_to_path(file_path, data):
    # Ensure the directory exists
    directory = os.path.dirname(file_path)
    if not os.path.exists(directory):
        os.makedirs(directory)

    data.save(file_path)


@app.route('/upload', methods=['POST'])
def generate_video():
    if 'imageFile' not in request.files or 'videoFile' not in request.files:
            return jsonify({"error": "No image or video file found in the request"}), 400

    
    source = request.files['imageFile']
    vid = request.files['videoFile']
    model_name_full = request.form['voice']

    model_name = name_dict.get(model_name_full, "Name not found")

    
    if source.content_type.startswith("image/"):
        source_path = "face_reenactment/assets/source/source.jpg"
        save_data_to_path(source_path, source)
    elif source.content_type.startswith("video/"):
        source_path = "face_reenactment/assets/source/source.mp4" 
        save_data_to_path(source_path, source)
    
    save_data_to_path("face_reenactment/assets/driving/driving.mp4", vid)

    try:
        main_file(model_name, source_path)
    except Exception as e:
        return jsonify({"error": f"Video generation failed: {str(e)}"}), 500
    
    video_path = "face_reenactment/assets/output/output.mp4"

    # Make sure the file exists before serving it
    if os.path.exists(video_path):
        return send_file(video_path, mimetype='video/mp4'), 200
    else:
        return jsonify({"error": "Video not found"}), 404


@app.route("/generate", methods=["POST"])
def lipsync():
    print(request.files)
    if 'audioFile' not in request.files or 'videoFile' not in request.files:
        return jsonify({"error": "No audio or video file found in the request"}), 400

    audio = request.files["audioFile"]
    video = request.files["videoFile"]
    prompt = request.form["prompt"]

    save_data_to_path("lipsync_pipeline/assets/reference_voices/main.mp3", audio)
    save_data_to_path("lipsync_pipeline/assets/reference_videos/main.mp4", video)

    command = ["conda", "run", "-n", 
               "lipsync", "python", "lipsync_pipeline/pipeline.py", 
               prompt]
    subprocess.run(command)
    video_path = "lipsync_pipeline/output/video/result.mp4"

    if os.path.exists(video_path):
        return send_file(video_path, mimetype='video/mp4'), 200
    else:
        return jsonify({"error": "Video not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
