FROM pytorch/pytorch:2.1.2-cuda12.1-cudnn8-runtime

ENV DEBIAN_FRONTEND=noninteractive
ENV PYTHONUNBUFFERED=1
ENV PIP_NO_CACHE_DIR=1

WORKDIR /

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    wget \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN pip install --upgrade pip
RUN pip install runpod requests

# Clone ComfyUI
RUN git clone https://github.com/comfyanonymous/ComfyUI.git
WORKDIR /ComfyUI
RUN pip install -r requirements.txt

# Install ComfyUI Manager (optional, useful for custom nodes)
WORKDIR /ComfyUI/custom_nodes
RUN git clone https://github.com/ltdrdata/ComfyUI-Manager.git

# Go back to root
WORKDIR /

# Copy worker code
COPY src /src
COPY workflow_api.json /workflow_api.json

# Model Download Script
# You can uncomment this to bake models into the image, 
# or use a network volume (Recommended for large models).
# For now, we will demonstrate downloading a small model or placeholder.
# ENV HF_TOKEN="your_token_here"

CMD ["/src/start.sh"]
