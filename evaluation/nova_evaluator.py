import os
import base64
import json
from pathlib import Path
from dotenv import load_dotenv
from video_mapping import get_expected_outcome
from typing import Dict

import boto3
bedrock_r = boto3.client("bedrock-runtime")

# Load environment variables
load_dotenv()

NOVA_PROMPT = "These frames are from a video of a dice being thrown. Based on these frames, what number will the die land on? Please respond with ONLY the number (1-6). Even if you are not sure make sure to guess. You need to **ALWAYS** give a number even if you are not sure. And **only** reply with a number and nothing else."

def get_model_prediction(video_path: str) -> int:
    """
    Get the model's prediction for the dice outcome.

    Args:
        video_path: Path to the video file

    Returns:
        Predicted dice value (1-6)
    """

    with open(video_path, "rb") as video_file:
        video_content = video_file.read()

    messages = [
        {
            "role": "user",
            "content": [
                {
                    "video": {
                        "format": "webm",
                        "source": {
                            "bytes": video_content
                        }
                    }
                },
                {"text": NOVA_PROMPT}
            ]
        }
    ]

    inf_params = {"temperature": 0.3, "maxTokens": 300}

    # Call Bedrock API
    response = bedrock_r.converse(
        modelId="us.amazon.nova-pro-v1:0",
        messages=messages,
        inferenceConfig=inf_params
    )

    try:
        prediction = int(response["output"]["message"]["content"][0]["text"].strip())
        if 1 <= prediction <= 6:
            return prediction
        else:
            raise ValueError("Prediction out of range")
    except (ValueError, KeyError, IndexError):
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
    # Get prediction
    prediction = get_model_prediction(video_path)
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
    dataset_path = Path("public/dataset")
    video_files = list(dataset_path.glob("*.webm"))

    all_results = []

    for video_path in video_files:
        video_name = video_path.stem
        expected_outcome = get_expected_outcome(video_name)

        if expected_outcome is None:
            print(f"Warning: Could not determine expected outcome for {video_path.name}")
            continue

        print(f"\nProcessing {video_path.name}...")
        results = evaluate_video(str(video_path), expected_outcome)
        all_results.append(results)

        # Print individual results
        print(f"Expected: {results['expected']}, Predicted: {results['predicted']}, Correct: {results['correct']}")

    # Calculate and print summary statistics
    total_videos = len(all_results)
    correct_predictions = sum(1 for r in all_results if r['correct'])
    accuracy = (correct_predictions / total_videos) * 100 if total_videos > 0 else 0

    print("\nEvaluation Summary:")
    print(f"Total videos processed: {total_videos}")
    print(f"Correct predictions: {correct_predictions}")
    print(f"Accuracy: {accuracy:.2f}%")

if __name__ == "__main__":
    main()
