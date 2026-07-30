# Brain Tumor MRI Classification using CNN

A mini deep learning project that classifies brain MRI scans into four
categories using a simple Convolutional Neural Network (CNN) built with
PyTorch — no pretrained models or transfer learning involved.

## Overview

Brain tumor diagnosis from MRI scans is normally done manually by
radiologists. This project explores whether a basic CNN, trained from
scratch, can learn to distinguish between tumor types directly from MRI
images.

## Dataset

- **Source:** [Brain Tumor MRI Dataset (Kaggle)](https://www.kaggle.com/datasets/masoudnickparvar/brain-tumor-mri-dataset)
- **Classes (4):**
  - `glioma`
  - `meningioma`
  - `pituitary`
  - `notumor`

Expected folder structure:

```
data/
├── Training/
│   ├── glioma/
│   ├── meningioma/
│   ├── notumor/
│   └── pituitary/
└── Testing/
    ├── glioma/
    ├── meningioma/
    ├── notumor/
    └── pituitary/
```

> The `data/` folder is not included in this repo. Download the dataset
> from Kaggle and place it in this structure before running the script.

## Model Architecture

A simple 3-layer CNN:

| Layer | Details |
|---|---|
| Conv1 | 1 → 16 channels, 3x3 kernel, ReLU, MaxPool |
| Conv2 | 16 → 32 channels, 3x3 kernel, ReLU, MaxPool |
| Conv3 | 32 → 64 channels, 3x3 kernel, ReLU, MaxPool |
| FC1 | 64×16×16 → 128, ReLU, Dropout (0.5) |
| FC2 | 128 → 4 (output classes) |

**Preprocessing:**
- Images resized to 128x128
- Converted to grayscale (single channel)
- Normalized to [-1, 1]

**Training setup:**
- Loss: CrossEntropyLoss
- Optimizer: Adam (lr = 0.001)
- Batch size: 32
- Epochs: 15
- Device: GPU if available, else CPU

## How to Run

1. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
2. Download the dataset from Kaggle and place it under `data/` as shown
   above.
3. Run the script:
   ```
   python brain_tumor_mri_cnn.py
   ```

The script will train the model, print per-epoch train/test accuracy,
save the trained weights to `brain_tumor_cnn.pth`, and print the final
test accuracy.

## Results

| Metric | Value |
|---|---|
| Final test accuracy | **88%** |
| Typical expected range* | 80–90% |

\* For a simple CNN trained from scratch (no pretrained backbone), 80–90%
test accuracy is typical on this dataset. Actual results vary with
dataset size/quality, number of epochs, and random initialization.

## License

Please check the dataset's license on Kaggle before any other use.
