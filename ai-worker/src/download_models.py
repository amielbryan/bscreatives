import os
import requests
from tqdm import tqdm

# Configuration
HF_TOKEN = os.environ.get("HF_TOKEN")
Models = [
    {
        "url": "https://huggingface.co/Lykon/DreamShaper/resolve/main/DreamShaper_8_pruned.safetensors",
        "path": "/ComfyUI/models/checkpoints/DreamShaper_8_pruned.safetensors"
    }
]

def download_file(url, path, token=None):
    headers = {}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    
    response = requests.get(url, headers=headers, stream=True)
    if response.status_code == 200:
        total_size = int(response.headers.get('content-length', 0))
        block_size = 1024
        
        with open(path, 'wb') as file:
            for data in tqdm(response.iter_content(block_size), total=total_size, unit='iB', unit_scale=True):
                file.write(data)
        print(f"Downloaded {path}")
    else:
        print(f"Failed to download {url}. Status: {response.status_code}")

if __name__ == "__main__":
    for model in Models:
        if not os.path.exists(model["path"]):
            print(f"Downloading {model['path']}...")
            download_file(model["url"], model["path"], HF_TOKEN)
        else:
            print(f"Model already exists: {model['path']}")
