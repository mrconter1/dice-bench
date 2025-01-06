# DiceBench 🎲

A Post-Human Level (PHL) benchmark for testing superintelligent AI systems through dice prediction.

## Motivation

As AI systems increasingly match or exceed human performance on traditional benchmarks, we need new ways to measure capabilities beyond human limits. Just as humans can predict vehicle trajectories—a task impossible for simpler animals—advanced AI systems should demonstrate superior prediction of complex physical systems like dice rolls, even when humans cannot. This creates an opportunity to measure intelligence at levels far above human capability, rather than using human-level performance as a ceiling.

## Overview

DiceBench is a novel benchmark designed to evaluate AI systems beyond human-level performance. It consists of a private evaluation set of 100 videos and a public dataset of 10 videos, each showing a die being rolled and cutting approximately one second before it comes to rest.

[![Website](https://img.shields.io/badge/Website-dicebench.vercel.app-blue)](https://dicebench.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## Public Dataset

The public dataset contains 10 videos available in the `/public/dataset` directory:

```
FEA.webm, FEB.webm, FEC.webm  - Expected outcome: 5
FYA.webm, FYB.webm, FYC.webm  - Expected outcome: 4
SA.webm, SB.webm              - Expected outcome: 6
TA.webm, TB.webm              - Expected outcome: 3
```

Each video is recorded using a Galaxy S24 camera and shows a die being rolled across different surface types, cutting before the final outcome is visible.

## Evaluation

The evaluation process is implemented in the `/evaluation` directory:

- `openai_evaluator.py` - Main evaluation script for running GPT-4o on video inputs
- `video_mapping.py` - Maps video filenames to their expected outcomes

To run the evaluation:

1. Install dependencies:
```bash
pip install openai python-dotenv opencv-python
```

2. Set up your OpenAI API key:
```bash
export OPENAI_API_KEY='your-key-here'
```

3. Run the evaluator:
```bash
python evaluation/openai_evaluator.py
```

## Current Results

| System | Accuracy |
|--------|----------|
| Random Baseline | 16.67% |
| Human Performance | 27% |
| GPT-4o | 33% |

## Access

The private evaluation set is kept secure to maintain benchmark integrity. Researchers interested in evaluating their models can contact us at rasmus.lindahl1996@gmail.com for access.

## Citation

```bibtex
@misc{dicebench2024,
  title = {DiceBench: A Post-Human Level Benchmark},
  author = {Lindahl, Rasmus},
  year = {2024},
  publisher = {becose},
  url = {https://dicebench.vercel.app},
  note = {AI consultancy specializing in advanced machine learning solutions}
}
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
