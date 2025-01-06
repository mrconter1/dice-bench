import cv2
import base64
import os
from openai import OpenAI
import json
from typing import List, Dict
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def extract_frames(video_path: str, target_fps: int = 30) -> List[str]:
    """
    Extract frames from a video file and convert them to base64.
    
    Args:
        video_path: Path to the video file
        target_fps: Target frames per second to extract
    
    Returns:
        List of base64 encoded frames
    """
    video = cv2.VideoCapture(video_path)
    base64_frames = []
    
    # Get video properties
    original_fps = video.get(cv2.CAP_PROP_FPS)
    frame_interval = max(1, round(original_fps / target_fps))
    frame_count = 0
    
    print(f"Original video FPS: {original_fps}")
    print(f"Frame interval: {frame_interval}")
    
    while video.isOpened():
        success, frame = video.read()
        if not success:
            break
            
        # Only keep frames according to target FPS
        if frame_count % frame_interval == 0:
            _, buffer = cv2.imencode(".jpg", frame)
            base64_frames.append(base64.b64encode(buffer).decode("utf-8"))
        
        frame_count += 1
    
    video.release()
    print(f"Extracted {len(base64_frames)} frames")
    return base64_frames

def get_model_prediction(frames: List[str], client: OpenAI) -> int:
    """
    Get the model's prediction for the dice outcome.
    
    Args:
        frames: List of base64 encoded frames
        client: OpenAI client instance
    
    Returns:
        Predicted dice value (1-6)
    """
    messages = [
        {
            "role": "user",
            "content": [
                "These frames are from a video of a dice being thrown. Based on these frames, what number will the die land on? Please respond with ONLY the number (1-6). Even if you are not sure make sure to guess.",
                *map(lambda x: {"image": x, "resize": 768}, frames),
            ],
        },
    ]
    
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=messages,
        max_tokens=2000
    )
    
    # Extract the predicted number from the response
    try:
        prediction = int(response.choices[0].message.content.strip())
        if 1 <= prediction <= 6:
            return prediction
        else:
            raise ValueError("Prediction out of range")
    except (ValueError, AttributeError):
        print(f"Error parsing model response: {response.choices[0].message.content}")
        return None

def evaluate_video(video_path: str, expected_outcome: int) -> Dict:
    """
    Evaluate a single video and return the results.
    
    Args:
        video_path: Path to the video file
        expected_outcome: The actual outcome of the dice throw
    
    Returns:
        Dictionary containing evaluation results
    """
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    
    # Extract frames
    print(f"Processing video: {video_path}")
    frames = extract_frames(video_path)
    print(f"Extracted {len(frames)} frames")
    
    # Get prediction
    prediction = get_model_prediction(frames, client)
    if prediction is None:
        return {
            "video": video_path,
            "expected": expected_outcome,
            "predicted": None,
            "correct": False,
            "error": "Failed to get valid prediction"
        }
    
    # Compare results
    is_correct = prediction == expected_outcome
    
    return {
        "video": video_path,
        "expected": expected_outcome,
        "predicted": prediction,
        "correct": is_correct
    }

def main():
    # Test with one video first
    video_path = "public/dataset/FEA.webm"
    expected_outcome = 5  # Based on test-data.ts
    
    results = evaluate_video(video_path, expected_outcome)
    
    # Print results
    print("\nEvaluation Results:")
    print(f"Video: {results['video']}")
    print(f"Expected Outcome: {results['expected']}")
    print(f"Model Prediction: {results['predicted']}")
    print(f"Correct: {results['correct']}")

if __name__ == "__main__":
    main() 