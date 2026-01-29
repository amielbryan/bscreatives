import runpod
import json
import time
import requests
import os
import base64

# Configuration
WEB_URL = "http://127.0.0.1:8188"

# Wait for ComfyUI to start
def check_comfy_status():
    for _ in range(60): # Wait up to 60s
        try:
            response = requests.get(WEB_URL)
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

    # Basic prompt injection
    # Assuming Node 6 is the CLIP Text Encode for prompt (Based on standard API format)
    if "6" in workflow and "inputs" in workflow["6"]:
        workflow["6"]["inputs"]["text"] = prompt
    
    # Trigger Generation
    try:
        p = {"prompt": workflow}
        response = requests.post(f"{WEB_URL}/prompt", json=p)
        result = response.json()
        
        if 'prompt_id' not in result:
             return {"error": "Failed to trigger generation", "details": result}

        prompt_id = result['prompt_id']
        print(f"Generation started: {prompt_id}")
        
        # Polling for completion
        # We loop until the prompt_id appears in the history
        timeout = 120 # 2 minutes timeout
        start_time = time.time()
        
        while time.time() - start_time < timeout:
            try:
                history_resp = requests.get(f"{WEB_URL}/history/{prompt_id}")
                history = history_resp.json()
                
                if prompt_id in history:
                    # Found it!
                    outputs = history[prompt_id]['outputs']
                    
                    # Assume Node 9 is SaveImage
                    if '9' in outputs:
                        images = outputs['9']['images']
                        if len(images) > 0:
                            filename = images[0]['filename']
                            subfolder = images[0]['subfolder']
                            folder_type = images[0]['type']
                            
                            # Get the image content
                            view_resp = requests.get(
                                f"{WEB_URL}/view", 
                                params={"filename": filename, "subfolder": subfolder, "type": folder_type}
                            )
                            
                            image_data = base64.b64encode(view_resp.content).decode('utf-8')
                            
                            return {
                                "status": "success",
                                "message": "Generation complete",
                                "image": f"data:image/png;base64,{image_data}"
                            }
            except Exception as e:
                print(f"Polling error: {e}")
            
            time.sleep(1)
            
        return {"error": "Generation timed out"}

    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    if check_comfy_status():
        runpod.serverless.start({"handler": handler})
    else:
        print("ComfyUI failed to start")
