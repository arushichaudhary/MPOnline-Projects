"""
Plot training reward curve from a saved scores file.

Usage:
    python plot_results.py
"""

import argparse

import matplotlib.pyplot as plt
import numpy as np


def moving_average(x, window: int = 20):
    if len(x) < window:
        return x
    return np.convolve(x, np.ones(window) / window, mode="valid")


def plot(scores_path: str, out_path: str):
    scores = np.load(scores_path)
    smoothed = moving_average(scores, window=20)

    plt.figure(figsize=(9, 5))
    plt.plot(scores, alpha=0.3, label="Episode reward")
    plt.plot(
        range(len(scores) - len(smoothed), len(scores)),
        smoothed,
        label="20-episode moving average",
        linewidth=2,
    )
    plt.axhline(475, color="gray", linestyle="--", linewidth=1, label="Solved threshold (475)")
    plt.xlabel("Episode")
    plt.ylabel("Total reward")
    plt.title("DQN training progress on CartPole-v1")
    plt.legend()
    plt.tight_layout()
    plt.savefig(out_path, dpi=150)
    print(f"Saved plot to {out_path}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--scores", type=str, default="results/scores.npy")
    parser.add_argument("--out", type=str, default="results/training_curve.png")
    args = parser.parse_args()

    plot(args.scores, args.out)
