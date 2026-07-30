"""
Evaluate a trained DQN agent on CartPole-v1 and report performance.

Usage:
    python evaluate.py --episodes 20
"""

import argparse

import gymnasium as gym
import numpy as np

from dqn_agent import DQNAgent


def evaluate(model_path: str, episodes: int, render: bool):
    env = gym.make("CartPole-v1", render_mode="human" if render else None)
    state_dim = env.observation_space.shape[0]
    action_dim = env.action_space.n

    agent = DQNAgent(state_dim, action_dim)
    agent.load(model_path)

    scores = []
    for episode in range(1, episodes + 1):
        state, _ = env.reset()
        done = False
        total_reward = 0.0

        while not done:
            action = agent.select_action(state, greedy=True)
            state, reward, terminated, truncated, _ = env.step(action)
            done = terminated or truncated
            total_reward += reward

        scores.append(total_reward)
        print(f"Episode {episode:3d} | reward: {total_reward:.1f}")

    env.close()

    scores = np.array(scores)
    print(f"\nMean reward over {episodes} episodes: {scores.mean():.1f}")
    print(f"Min: {scores.min():.1f} | Max: {scores.max():.1f} | Std: {scores.std():.1f}")
    return scores


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--model", type=str, default="checkpoints/dqn_cartpole.pt")
    parser.add_argument("--episodes", type=int, default=20)
    parser.add_argument("--render", action="store_true", help="Render episodes to screen")
    args = parser.parse_args()

    evaluate(args.model, args.episodes, args.render)
