"""
Train a DQN agent to land LunarLander-v3 using Gymnasium.

Usage:
    python train.py --episodes 1500
"""

import argparse
import os

import gymnasium as gym
import numpy as np

from dqn_agent import DQNAgent

os.makedirs("checkpoints", exist_ok=True)
os.makedirs("results", exist_ok=True)


def train(episodes: int, target_score: float, seed: int = 0):
    env = gym.make("LunarLander-v3")
    state_dim = env.observation_space.shape[0]
    action_dim = env.action_space.n

    agent = DQNAgent(state_dim, action_dim)

    scores = []
    recent_scores = []

    for episode in range(1, episodes + 1):
        state, _ = env.reset(seed=seed + episode)
        episode_reward = 0.0
        done = False

        while not done:
            action = agent.select_action(state)
            next_state, reward, terminated, truncated, _ = env.step(action)
            done = terminated or truncated

            agent.store(state, action, reward, next_state, float(done))
            agent.train_step()

            state = next_state
            episode_reward += reward

        agent.decay_epsilon()
        scores.append(episode_reward)
        recent_scores.append(episode_reward)
        if len(recent_scores) > 100:
            recent_scores.pop(0)

        avg_recent = sum(recent_scores) / len(recent_scores)

        if episode % 10 == 0 or episode == 1:
            print(
                f"Episode {episode:4d} | reward: {episode_reward:7.1f} | "
                f"avg(last100): {avg_recent:7.1f} | epsilon: {agent.epsilon:.3f}"
            )

        if avg_recent >= target_score and len(recent_scores) == 100:
            print(f"\nSolved in {episode} episodes! Average reward over last 100: {avg_recent:.1f}")
            break

    agent.save("checkpoints/dqn_lunarlander.pt")
    np.save("results/scores.npy", np.array(scores))
    print("\nSaved trained model to checkpoints/dqn_lunarlander.pt")
    print("Saved episode scores to results/scores.npy")

    env.close()
    return scores


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--episodes", type=int, default=1500, help="Max training episodes")
    parser.add_argument(
        "--target-score",
        type=float,
        default=200.0,
        help="Average reward over 100 episodes considered 'solved'",
    )
    parser.add_argument("--seed", type=int, default=0)
    args = parser.parse_args()

    train(args.episodes, args.target_score, args.seed)
