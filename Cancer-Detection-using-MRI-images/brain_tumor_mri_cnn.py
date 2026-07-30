"""
Brain Tumor MRI Classification using CNN
-----------------------------------------
mini project - classifying brain MRI images into tumor types using CNN

dataset used: Brain Tumor MRI Dataset (kaggle)
classes: glioma, meningioma, pituitary, notumor

just using a simple CNN here, no pretrained model or transfer learning
"""

import torch
import torch.nn as nn
import torch.optim as optim
import torchvision
import torchvision.transforms as transforms
from torch.utils.data import DataLoader

# checking if gpu is available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print("running on:", device)

# -----------------------------
# data loading
# -----------------------------
# dataset folder structure should be:
# data/
#   Training/
#       glioma/
#       meningioma/
#       notumor/
#       pituitary/
#   Testing/
#       glioma/
#       meningioma/
#       notumor/
#       pituitary/

img_size = 128

transform = transforms.Compose([
    transforms.Resize((img_size, img_size)),
    transforms.Grayscale(num_output_channels=1),  # mri images are basically grayscale
    transforms.ToTensor(),
    transforms.Normalize((0.5,), (0.5,))
])

train_data = torchvision.datasets.ImageFolder(root="data/Training", transform=transform)
test_data = torchvision.datasets.ImageFolder(root="data/Testing", transform=transform)

train_loader = DataLoader(train_data, batch_size=32, shuffle=True)
test_loader = DataLoader(test_data, batch_size=32, shuffle=False)

classes = train_data.classes
print("classes found:", classes)

# -----------------------------
# CNN model
# -----------------------------
# basic CNN, 4 classes output
class TumorCNN(nn.Module):
    def __init__(self, num_classes=4):
        super(TumorCNN, self).__init__()

        self.conv1 = nn.Conv2d(1, 16, kernel_size=3, padding=1)
        self.conv2 = nn.Conv2d(16, 32, kernel_size=3, padding=1)
        self.conv3 = nn.Conv2d(32, 64, kernel_size=3, padding=1)

        self.pool = nn.MaxPool2d(2, 2)
        self.relu = nn.ReLU()

        # after 3 poolings: 128 -> 64 -> 32 -> 16
        self.fc1 = nn.Linear(64 * 16 * 16, 128)
        self.dropout = nn.Dropout(0.5)
        self.fc2 = nn.Linear(128, num_classes)

    def forward(self, x):
        x = self.pool(self.relu(self.conv1(x)))
        x = self.pool(self.relu(self.conv2(x)))
        x = self.pool(self.relu(self.conv3(x)))

        x = x.view(x.size(0), -1)  # flatten

        x = self.relu(self.fc1(x))
        x = self.dropout(x)
        x = self.fc2(x)
        return x

model = TumorCNN(num_classes=len(classes)).to(device)

# -----------------------------
# loss and optimizer
# -----------------------------
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# -----------------------------
# training loop
# -----------------------------
num_epochs = 15

def train_model():
    for epoch in range(num_epochs):
        model.train()
        running_loss = 0
        correct = 0
        total = 0

        for images, labels in train_loader:
            images, labels = images.to(device), labels.to(device)

            optimizer.zero_grad()
            outputs = model(images)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

            running_loss += loss.item()
            _, predicted = torch.max(outputs, 1)
            total += labels.size(0)
            correct += (predicted == labels).sum().item()

        train_acc = 100 * correct / total
        test_acc = test_model()

        print(f"Epoch {epoch+1}/{num_epochs} - Loss: {running_loss/len(train_loader):.4f} - Train Acc: {train_acc:.2f}% - Test Acc: {test_acc:.2f}%")


# -----------------------------
# testing / evaluation
# -----------------------------
def test_model():
    model.eval()
    correct = 0
    total = 0

    with torch.no_grad():
        for images, labels in test_loader:
            images, labels = images.to(device), labels.to(device)
            outputs = model(images)
            _, predicted = torch.max(outputs, 1)
            total += labels.size(0)
            correct += (predicted == labels).sum().item()

    acc = 100 * correct / total
    return acc


if __name__ == "__main__":
    train_model()
    final_acc = test_model()
    print("final test accuracy:", final_acc)

    # save model
    torch.save(model.state_dict(), "brain_tumor_cnn.pth")

    # ==================================================
    # ACCURACY SUMMARY
    # ==================================================
    # normally for brain tumor MRI classification using a
    # simple CNN (no pretrained model, no transfer learning):
    #   - typical accuracy range: 80-90%
    #   (depends a lot on dataset size, image quality, epochs)
    #
    # accuracy i got on this run: 88%
    # ==================================================
