# Adult Census Income Classification

Predicting whether an individual's annual income exceeds $50,000 using demographic and employment data, comparing five classification algorithms.

## Dataset

**Adult Census Income Dataset** — contains demographic and employment-related attributes (age, education, occupation, hours worked, etc.) with a binary target: whether income exceeds $50K/year.

- Source: [Kaggle](https://www.kaggle.com/datasets/uciml/adult-census-income) | [UCI Repository](https://archive.ics.uci.edu/dataset/2/adult)
- 32,561 rows × 15 columns

## Project Structure

| Task | Description |
|---|---|
| 1. Dataset Understanding | Shape, dtypes, summary stats, class balance, EDA plots |
| 2. Data Cleaning | Handling `'?'` missing values, duplicates, mode imputation |
| 3. Feature Engineering | Dropping redundant columns, encoding, scaling, train/test split |
| 4. Model Building | Logistic Regression, Decision Tree, Random Forest, KNN, SVM |
| 5. Performance Evaluation | Accuracy, Precision, Recall, F1, ROC-AUC + visualizations |

## Results

| Algorithm | Accuracy | Precision | Recall | F1 Score | ROC-AUC |
|---|---|---|---|---|---|
| Logistic Regression | 0.8520 | 0.7403 | 0.5944 | 0.6594 | 0.9021 |
| Decision Tree | 0.8526 | 0.7659 | 0.5593 | 0.6465 | 0.8888 |
| Random Forest | **0.8569** | **0.7826** | 0.5625 | 0.6545 | **0.9116** |
| KNN | 0.8411 | 0.6814 | **0.6397** | 0.6599 | 0.8885 |
| SVM | 0.8513 | 0.7560 | 0.5651 | 0.6467 | 0.8892 |

**Random Forest** achieved the best overall performance (Accuracy and ROC-AUC), while **KNN** had the highest Recall, catching more true high-income earners at the cost of precision.

## How to Run

1. Clone this repo:
   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>
   ```
2. Install dependencies:
   ```bash
   pip install pandas numpy scikit-learn matplotlib seaborn jupyter
   ```
3. Launch the notebook:
   ```bash
   jupyter notebook Adult_Income_Classification.ipynb
   ```
   Or open it directly in [Google Colab](https://colab.research.google.com/).

## Files

- `Adult_Income_Classification.ipynb` — full analysis notebook (all 5 tasks)
- `adult.csv` — raw dataset
- `README.md` — this file

## Tech Stack

`Python` · `pandas` · `NumPy` · `scikit-learn` · `matplotlib` · `seaborn`
