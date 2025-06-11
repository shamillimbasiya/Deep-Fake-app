# Deep Fakes in Practice

This project explores the creation and application of deepfake technologies through a modular pipeline of open-source models. The project demonstrates two primary models:

1. **Face Reenactment Model**: This pipeline uses [**LivePortrait**](https://github.com/KwaiVGI/LivePortrait) for face reenactment, enabling dynamic facial motion transfer, and [**rvc-python**](https://github.com/daswer123/rvc-python) for realistic voice cloning.

2. **Lipsync Model**: This pipeline employs [**XTTS-v2**](https://huggingface.co/coqui/XTTS-v2) for generating speech from text input and a reference voice clip, coupled with [**Wav2Lip**](https://github.com/Rudrabha/Wav2Lip) to create accurate lip synchronization.

## Installation instruction

This project require node and miniconda. If you already have these, jump to [step 2](#step-2).

#### Step 1 

Install [Node](https://nodejs.org/en/download/package-manager).

Download [Miniconda3](https://www.anaconda.com/download/success).

Install Miniconda3:
```bash
bash Miniconda3-latest-Linux-x86_64.sh
```

#### Step 2

Clone the repository and navigate into the backend

```bash
# Clone the repository
git clone git@gitlab.liu.se:TDDE19_teachers/2024/deep-fakes-in-practice.git # Using ssh

# Navigate into the project backend
cd deep-fakes-in-practice/impersona-app/backend
```

Activate conda and create an environment:
```bash
source ~/miniconda3/bin/activate

# Create conda enviroment for face reanactment
conda create -n face python=3.9 pip=24.0
```

Press "y" and then:
```bash
# Activate the environment
conda activate face

# Install dependencies
pip install -r face_requirements.txt
```

Install the LivePortrait model:
```bash
# Download weigths
cd face_reenactment
huggingface-cli download KwaiVGI/LivePortrait --local-dir pretrained_weights --exclude "*.git*" "README.md" "docs"

# If the download failed, try to install huggingface-cli manually, otherwise skip this step
pip install -U "huggingface_hub[cli]"
```

Set up enviroment for the lipsync model:
```bash
# Create conda enviroment for lipsync model (name of enviroment must be "lipsync")
cd ..
conda create -n lipsync python=3.9 pip=24.0
```
Press "y" and then:
```bash
# Activate the environment
conda activate lipsync

# Install dependencies
pip install -r lipsync_requirements.txt
# Now librosa==0.9.1 will have to be installed, ignore warnings during that install
pip install librosa==0.9.1
```
(The error is expected, please ignore)

The installation is now done. See [Running Instructions](#running-instructions) to run and generate videos.

## Files and Directories

### Backend

- ***impersona-app/backend/face_reenacment/***

    Contains the implementation of the face reenactment pipeline, which maps facial expressions from a driving video to a source image/video.

- ***impersona-app/backend/lipsync_pipeline/***

    Contains the implementation of the TTS-guided lip-sync pipeline, which synchronize the lip movements in a video with a generated audio file. 

- ***impersona-app/backend/app.py***

    Starts the backend service by running the Flask server.

- ***impersona-app/backend/face_requirements.txt***

    A requirements file specifying the necessary Python packages to run the face reenactment pipeline.

- ***impersona-app/backend/lipsync_requirements.txt***

    A requirements file specifying the necessary Python packages to run the TTS-guided lip-sync pipeline.

### Frontend

- ***impersona-app/frontend/src/***

    The source code for the React-based frontend. It includes components, styles, and logic for user interaction and communication with the backend.

- ***impersona-app/frontend/package-lock.json & package.json***

    These files manage the Node.js dependencies for the frontend.

## Running instruction
To run and generate videos, the frontend and the backend need to be started. This must be done in the "face" enviroment:
```bash
# Activate face enviroment
conda activate face

# Activate backend (do not close terminal)
python app.py
```
(If needed press "y" when starting the backend for the first time)


Create a new terminal and then start the frontend:
```bash
# Navigate to frontend (assuming you are currently standing in the backend folder)
cd ../frontend
npm i
npm start
```

## License
The project is licensed under the [MIT license](https://opensource.org/license/mit).