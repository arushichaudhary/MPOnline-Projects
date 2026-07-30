# CIFAR-10 Image Classification using CNN

A simple Convolutional Neural Network (CNN) built with PyTorch to classify
images from the CIFAR-10 dataset into 10 classes. No batch normalization,
no data augmentation — just a clean baseline CNN.

## Dataset

[CIFAR-10](https://www.cs.toronto.edu/~kriz/cifar.html) — 60,000 32x32 color
images across 10 classes (50,000 train / 10,000 test):

`plane, car, bird, cat, deer, dog, frog, horse, ship, truck`

The dataset is downloaded automatically by `torchvision` on first run.

## Model Architecture

```
Input (3x32x32)
 → Conv(3→32, 3x3) → ReLU → MaxPool(2x2)   → 32x16x16
 → Conv(32→64, 3x3) → ReLU → MaxPool(2x2)  → 64x8x8
 → Conv(64→128, 3x3) → ReLU → MaxPool(2x2) → 128x4x4
 → Flatten
 → Linear(2048 → 256) → ReLU → Dropout(0.4)
 → Linear(256 → 10)
```

- **Loss:** CrossEntropyLoss
- **Optimizer:** Adam (lr = 0.001)
- **Epochs:** 20
- **Batch size:** 128

## Project Structure

```
cifar10-cnn-classifier/
├── train.py            # loads data, trains, evaluates, saves outputs
├── requirements.txt
├── .gitignore
├── README.md
├── data/                # CIFAR-10 dataset (auto-downloaded, gitignored)
└── outputs/             # created after running train.py (gitignored)
    ├── cifar10_cnn.pth       # trained model weights
    ├── training_curves.png   # loss + accuracy over epochs
    ├── sample_predictions.png# example predictions on test images
    └── metrics.json          # per-epoch loss/accuracy + final test accuracy
```

## Setup

```bash
git clone <your-repo-url>
cd cifar10-cnn-classifier
pip install -r requirements.txt
```

## Usage

```bash
python train.py
```

This will:
1. Download CIFAR-10 into `./data` (first run only)
2. Train the CNN for 20 epochs, printing loss/accuracy each epoch
3. Evaluate on the test set
4. Save to `outputs/`: the trained weights, a training-curve plot, a
   sample-predictions grid, and a `metrics.json` with the full history

Training on a GPU takes a few minutes; on CPU it will take considerably
longer (CIFAR-10 + 20 epochs on CPU can take 30+ minutes depending on
hardware).

## Results

| Metric                        | Typical range (simple CNN, no BN/augmentation) | This run |
|--------------------------------|:-----------------------------------------------:|:--------:|
| Test accuracy                  | 70–80%                                          | **~80%** |

No batch normalization or data augmentation was used, so accuracy is capped
below what deeper architectures (ResNet, VGG-style with augmentation) can
reach on CIFAR-10 (typically 90%+).

### Sample output

After running `train.py`, check `outputs/training_curves.png` for the
loss/accuracy curves and `outputs/sample_predictions.png` for example
predictions (green title = correct, red = incorrect).

## License

MIT — free to use and modify.
