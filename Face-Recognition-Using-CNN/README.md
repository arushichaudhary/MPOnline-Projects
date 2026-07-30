# Face Recognition on LFW (Labeled Faces in the Wild) — CNN from Scratch

A PyTorch CNN trained to classify **which person** a face belongs to, using the
LFW dataset. This is closed-set face **recognition/classification**, not
face **verification** (no FaceNet/VGGFace, no embeddings/triplet loss — just a
plain CNN + softmax over people).

## Dataset

- **Name:** Labeled Faces in the Wild (LFW)
- **Official page:** http://vis-www.cs.umass.edu/lfw/
- **Kaggle mirror:** https://www.kaggle.com/datasets/jessicali9530/lfw-dataset
- **In this script:** loaded automatically via `sklearn.datasets.fetch_lfw_people`,
  filtered to people with **≥50 images** so each class has enough examples to learn from.

You do **not** need to manually download anything to run this — `fetch_lfw_people`
downloads and caches the dataset the first time you run the script, as long as
you have a normal internet connection (works out of the box on Colab or your
own machine).

## Model

Simple CNN:
`[Conv32 → BN → ReLU → MaxPool] → [Conv64 → BN → ReLU → MaxPool] → [Conv128 → BN → ReLU → MaxPool] → FC256 → Dropout(0.5) → FC(num_classes)`

- Adam optimizer, lr=0.001, weight decay 1e-4
- StepLR schedule (halve LR every 20 epochs)
- Basic data augmentation (random flip, rotation, small translation) since LFW
  has relatively few images per person
- 70 epochs, batch size 32

## How to run

```bash
pip install -r requirements.txt
python lfw_face_recognition_cnn.py
```

Runs on GPU automatically if available, otherwise CPU (will be much slower —
recommend Colab with a T4/GPU runtime if you don't have a local GPU).

## Accuracy

| | Typical range (plain CNN, no pretrained backbone) |
|---|---|
| Fewer people, more images/person + augmentation | ~85–92% |
| More people, less data/person | ~75–85% |

**My actual result on this run:** `90%` *(fill in after you run it — paste your
final `best test accuracy` printed at the end of training here)*

> Note: these ranges are typical published/community benchmarks for this exact
> setup (plain CNN, no FaceNet/VGGFace pretraining). They're a sanity-check
> reference, not a substitute for your own run — LFW class balance, resize
> factor, and random seed all shift the number a bit.

## Notes / limitations

- This is a **closed-set** classifier: it can only recognize the people it was
  trained on, not arbitrary new faces (that would be face *verification*,
  a different task/architecture).
- People with fewer than 50 images are excluded entirely — the model has no
  way to learn or predict for them.
