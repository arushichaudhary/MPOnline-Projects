# CartPole DQN

A Deep Q-Network (DQN) agent trained from scratch with PyTorch to balance the classic CartPole environment from Gymnasium.

## Overview

CartPole is a benchmark reinforcement learning environment: a pole is attached to a cart that moves along a frictionless track. The agent can push the cart left or right, and the episode ends if the pole tilts too far or the cart leaves the track. The environment is considered "solved" when the agent averages a reward of 475+ over 20 consecutive episodes (max possible reward per episode is 500).

This project implements DQN from scratch, including:
- A small feedforward Q-network (PyTorch)
- Experience replay buffer
- A separate target network for stable learning
- Epsilon-greedy exploration with decay

## Project structure

```
cartpole-rl/
├── dqn_agent.py       # QNetwork, ReplayBuffer, and DQNAgent classes
├── train.py           # Training loop
├── evaluate.py        # Loads a trained model and reports performance
├── plot_results.py    # Plots the training reward curve
├── requirements.txt
└── README.md
```

## Setup

```bash
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Training

```bash
python train.py --episodes 400
```

This trains the agent and saves:
- `checkpoints/dqn_cartpole.pt` — the trained model weights
- `results/scores.npy` — the reward for every training episode

Training typically solves the environment (average reward 475+ over 20 episodes) within 200-400 episodes, though this varies run to run since the agent starts from random exploration.

## Evaluating a trained agent

```bash
python evaluate.py --episodes 20
```

Add `--render` to watch the agent play in a window:

```bash
python evaluate.py --episodes 5 --render
```

## Visualizing training progress

```bash
python plot_results.py
```

Saves a reward-over-time plot to `results/training_curve.png`, showing both the raw per-episode reward and a smoothed moving average.

## How it works

At each timestep, the agent observes the environment as a 4-dimensional state vector (cart position, cart velocity, pole angle, pole angular velocity) and chooses one of two actions: push left or push right.

The Q-network learns to estimate the expected future reward for each action given a state. During training:

1. The agent acts using an epsilon-greedy policy — mostly exploiting its current best guess, occasionally exploring randomly.
2. Every transition (state, action, reward, next state, done) is stored in a replay buffer.
3. On each step, a random batch is sampled from the buffer and used to update the Q-network via gradient descent, using a separate, slower-updating target network to compute stable target values.
4. Epsilon decays over time, so the agent explores less and exploits more as it learns.

## Next steps

- Try Double DQN or Dueling DQN architectures for more stable learning
- Add a Prioritized Experience Replay buffer to sample more useful transitions
- Extend to a harder environment, e.g. LunarLander-v2 or Acrobot-v1
- Log training metrics to TensorBoard for richer visualization
