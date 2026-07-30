import random
from collections import deque

import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim


class QNetwork(nn.Module):
    """Small feedforward network mapping a 4-dim CartPole state to Q-values for 2 actions."""

    def __init__(self, state_dim: int, action_dim: int, hidden_dim: int = 128):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(state_dim, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, action_dim),
        )

    def forward(self, x):
        return self.net(x)


class ReplayBuffer:
    """Fixed-size buffer storing past transitions for experience replay."""

    def __init__(self, capacity: int = 20000):
        self.buffer = deque(maxlen=capacity)

    def push(self, state, action, reward, next_state, done):
        self.buffer.append((state, action, reward, next_state, done))

    def sample(self, batch_size: int):
        batch = random.sample(self.buffer, batch_size)
        states, actions, rewards, next_states, dones = zip(*batch)
        return (
            np.array(states, dtype=np.float32),
            np.array(actions, dtype=np.int64),
            np.array(rewards, dtype=np.float32),
            np.array(next_states, dtype=np.float32),
            np.array(dones, dtype=np.float32),
        )

    def __len__(self):
        return len(self.buffer)


class DQNAgent:
    """Deep Q-Network agent with a target network and epsilon-greedy exploration."""

    def __init__(
        self,
        state_dim: int,
        action_dim: int,
        lr: float = 1e-3,
        gamma: float = 0.99,
        buffer_capacity: int = 20000,
        batch_size: int = 64,
        epsilon_start: float = 1.0,
        epsilon_end: float = 0.02,
        epsilon_decay: float = 0.995,
        target_update_every: int = 250,
        device: str = "cpu",
    ):
        self.device = torch.device(device)
        self.action_dim = action_dim
        self.gamma = gamma
        self.batch_size = batch_size
        self.epsilon = epsilon_start
        self.epsilon_end = epsilon_end
        self.epsilon_decay = epsilon_decay
        self.target_update_every = target_update_every
        self.steps_since_target_update = 0

        self.policy_net = QNetwork(state_dim, action_dim).to(self.device)
        self.target_net = QNetwork(state_dim, action_dim).to(self.device)
        self.target_net.load_state_dict(self.policy_net.state_dict())
        self.target_net.eval()

        self.optimizer = optim.Adam(self.policy_net.parameters(), lr=lr)
        self.buffer = ReplayBuffer(buffer_capacity)

    def select_action(self, state: np.ndarray, greedy: bool = False) -> int:
        if not greedy and random.random() < self.epsilon:
            return random.randrange(self.action_dim)
        with torch.no_grad():
            state_t = torch.as_tensor(state, dtype=torch.float32, device=self.device).unsqueeze(0)
            q_values = self.policy_net(state_t)
            return int(torch.argmax(q_values, dim=1).item())

    def store(self, state, action, reward, next_state, done):
        self.buffer.push(state, action, reward, next_state, done)

    def decay_epsilon(self):
        self.epsilon = max(self.epsilon_end, self.epsilon * self.epsilon_decay)

    def train_step(self):
        if len(self.buffer) < self.batch_size:
            return None

        states, actions, rewards, next_states, dones = self.buffer.sample(self.batch_size)

        states_t = torch.as_tensor(states, device=self.device)
        actions_t = torch.as_tensor(actions, device=self.device).unsqueeze(1)
        rewards_t = torch.as_tensor(rewards, device=self.device)
        next_states_t = torch.as_tensor(next_states, device=self.device)
        dones_t = torch.as_tensor(dones, device=self.device)

        q_values = self.policy_net(states_t).gather(1, actions_t).squeeze(1)

        with torch.no_grad():
            next_q_values = self.target_net(next_states_t).max(dim=1)[0]
            targets = rewards_t + self.gamma * next_q_values * (1 - dones_t)

        loss = nn.functional.smooth_l1_loss(q_values, targets)

        self.optimizer.zero_grad()
        loss.backward()
        torch.nn.utils.clip_grad_norm_(self.policy_net.parameters(), max_norm=10)
        self.optimizer.step()

        self.steps_since_target_update += 1
        if self.steps_since_target_update >= self.target_update_every:
            self.target_net.load_state_dict(self.policy_net.state_dict())
            self.steps_since_target_update = 0

        return loss.item()

    def save(self, path: str):
        torch.save(self.policy_net.state_dict(), path)

    def load(self, path: str):
        state_dict = torch.load(path, map_location=self.device)
        self.policy_net.load_state_dict(state_dict)
        self.target_net.load_state_dict(state_dict)
