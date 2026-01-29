import runpod
import json
import subprocess
import time
import requests
import os

# Wait for ComfyUI to start
def check_comfy_status():
    for _ in range(30):
        try:
            response = requests.get("http://127.0.0.1:8188")
            if response.status_code == 200:
                print("ComfyUI is ready!")
                return True
        except requests.exceptions.ConnectionError:
            pass
        print("Waiting for ComfyUI...")
        time.sleep(1)
    return False

def handler(job):
    job_input = job['input']
    prompt = job_input.get('prompt', 'A beautiful landscape')
    
    # Load default workflow
    with open('/workflow_api.json', 'r') as f:
        workflow = json.load(f)

    # basic prompt injection (This is a simplified example. 
    # Real implementation needs to traverse the JSON to find the Prompt Node ID)
    # Assuming Node 6 is the CLIP Text Encode for prompt
    if "6" in workflow and "inputs" in workflow["6"]:
        workflow["6"]["inputs"]["text"] = prompt
    
    # Trigger Generation
    try:
        p = {"prompt": workflow}
        response = requests.post("http://127.0.0.1:8188/prompt", json=p)
        result = response.json()
        prompt_id = result['prompt_id']
        
        # Polling for completion
        # In a real simplified handler we might just wait or use a websocket listener
        # For simplicity/robustness in this demo, we'll wait a fixed time or poll history
        
        time.sleep(5) # Wait for generation simulation
        
        # Determine output filename (Mock logic for now as we don't have shared volume mounted to read the file)
        # In a real container, we would read the file from /ComfyUI/output
        
        return {
            "status": "success",
            "message": "Generation complete",
            "prompt_id": prompt_id,
            # "image": base64_encoded_image # we would return this
        }

    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    if check_comfy_status():
        runpod.serverless.start({"handler": handler})
    else:
        print("ComfyUI failed to start")
