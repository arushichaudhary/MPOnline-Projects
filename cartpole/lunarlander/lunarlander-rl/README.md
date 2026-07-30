# LunarLander DQN

A Deep Q-Network (DQN) agent trained from scratch with PyTorch to land the LunarLander environment from Gymnasium.

## Overview

LunarLander is a benchmark reinforcement learning environment: a lander must fire its engines to touch down gently between two flags on an unpredictable, randomly generated terrain. The agent observes an 8-dimensional state (position, velocity, angle, angular velocity, and leg-ground contact flags) and chooses one of four discrete actions: do nothing, fire left engine, fire main engine, fire right engine. The environment is considered "solved" when the agent averages a reward of 200+ over 100 consecutive episodes.

This project implements DQN from scratch, including:
- A feedforward Q-network (PyTorch)
- Experience replay buffer
- A separate target network for stable learning
- Epsilon-greedy exploration with decay

## Project structure

```
lunarlander-rl/
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

LunarLander needs the Box2D physics backend, which is pulled in via the `gymnasium[box2d]` extra in requirements.txt. If installation of `box2d-py` fails, you may need SWIG on your system first (e.g. `apt install swig` or `brew install swig`).

## Training

```bash
python train.py --episodes 1500
```

This trains the agent and saves:
- `checkpoints/dqn_lunarlander.pt` — the trained model weights
- `results/scores.npy` — the reward for every training episode

LunarLander is considerably harder than CartPole. Training typically takes 800-1500+ episodes to reach an average reward of 200 over 100 episodes, and can vary a lot run to run. Unlike CartPole's fixed 500-step cap, LunarLander episodes can run up to 1000 steps, so early training (large replay buffer, big batches) takes noticeably longer per episode.

## Evaluating a trained agent

```bash
python evaluate.py --episodes 20
```

Add `--render` to watch the agent land in a window:

```bash
python evaluate.py --episodes 5 --render
```

## Visualizing training progress

```bash
python plot_results.py
```

Saves a reward-over-time plot to `results/training_curve.png`, showing both the raw per-episode reward and a smoothed 100-episode moving average.

## How it works

At each timestep, the agent observes an 8-dimensional state vector (x/y position, x/y velocity, angle, angular velocity, and two leg-contact booleans) and chooses one of four actions: do nothing, fire left orientation engine, fire main engine, fire right orientation engine.

The Q-network learns to estimate the expected future reward for each action given a state. During training:

1. The agent acts using an epsilon-greedy policy — mostly exploiting its current best guess, occasionally exploring randomly.
2. Every transition (state, action, reward, next state, done) is stored in a replay buffer.
3. On each step, a random batch is sampled from the buffer and used to update the Q-network via gradient descent, using a separate, slower-updating target network to compute stable target values.
4. Epsilon decays over time, so the agent explores less and exploits more as it learns.

Reward shaping in LunarLander already accounts for fuel use, crashing, and successful landings, so the raw episode reward is a good measure of landing quality: roughly +100 to +140 for landing safely, large negative for crashing, and small negative penalties for firing engines.

## Next steps

- Try Double DQN or Dueling DQN architectures for more stable learning
- Add a Prioritized Experience Replay buffer to sample more useful transitions
- Try the continuous-action variant (`LunarLanderContinuous-v3`) with DDPG or SAC instead of DQN
- Log training metrics to TensorBoard for richer visualization
