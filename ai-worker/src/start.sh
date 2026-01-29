# Download Models
python /src/download_models.py

# Start ComfyUI in the background
cd /ComfyUI
python main.py --listen 127.0.0.1 --port 8188 &

# Start the RunPod Handler
cd /
python -u /src/handler.py
