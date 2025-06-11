# Deep Fakes in Practice

TODO: A short description of what the project is about.

## Installation instruction

TODO: A complete description of how to install the project and all dependencies. Verify by a clean install.

```bash
py -3.10 -m venv venv
venv\Scripts\activate
```

Firstly, check your current CUDA version by:
```bash
nvcc -V # example versions: 11.1, 11.8, 12.1, etc.
```

Then, install the corresponding torch version. Here are examples for different CUDA versions. Visit the [PyTorch Official Website](https://pytorch.org/get-started/previous-versions) for installation commands if your CUDA version is not listed:
```bash
# for CUDA 11.1
pip install torch==1.10.1+cu111 torchvision==0.11.2 torchaudio==0.10.1 -f https://download.pytorch.org/whl/cu111/torch_stable.html
# for CUDA 11.8
pip install torch==2.3.0 torchvision==0.18.0 torchaudio==2.3.0 --index-url https://download.pytorch.org/whl/cu118
# for CUDA 12.1
pip install torch==2.3.0 torchvision==0.18.0 torchaudio==2.3.0 --index-url https://download.pytorch.org/whl/cu121
# ...
```

Finally, install the remaining dependencies:
```bash
pip install -r requirements.txt
```

The easiest way to download the pretrained weights is from HuggingFace:
```bash
# !pip install -U "huggingface_hub[cli]"
huggingface-cli download KwaiVGI/LivePortrait --local-dir pretrained_weights --exclude "*.git*" "README.md" "docs"
```

If you cannot access to Huggingface, you can use [hf-mirror](https://hf-mirror.com/) to download:
```bash
# !pip install -U "huggingface_hub[cli]"
export HF_ENDPOINT=https://hf-mirror.com
huggingface-cli download KwaiVGI/LivePortrait --local-dir pretrained_weights --exclude "*.git*" "README.md" "docs"
```


## Files

TODO: List of important files/directories and a short description of them

## Running instruction
TODO: Full instructions for how to run the project, including setting up all dependables.


LivePortrait

```bash
# source input is an image
python inference.py -s assets/examples/source/s9.jpg -d assets/examples/driving/d0.mp4

# source input is a video ✨
python inference.py -s assets/examples/source/s13.mp4 -d assets/examples/driving/d0.mp4

# more options to see
python inference.py -h
```


RVC
```bash
# WINDOWS example (-mp is the choosen model in the \models directory)
python -m rvc_python cli -md .\models\ -i .\sound\morgan_freeman_sound.mp3 -o output.wav -mp morgan -de cuda:0

# LINUX example (-mp is the choosen model in the models directory)
python -m rvc_python cli -md models/ -i sound/morgan_freeman_sound.mp4 -o output.wav -mp morgan -de cuda:0

```

Running LivePortrait + RVC (example expects morgan model (models/morgan/morgan.pth + models/morgan/morgan.index))
```bash
# example (-mp is the choosen model in the \models directory)
python main_pipeline.py -s assets/examples/source/morgan_freeman.jpg -d assets/examples/driving/morgan_freeman.mp4 -v morgan

```


## License
The project is licensed under the MIT license (https://opensource.org/license/mit).
