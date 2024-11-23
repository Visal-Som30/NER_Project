# Named Entity Recognition (NER) Project
This project is focused on building a Named Entity Recognition (NER) system using machine learning or deep learning models. NER is a fundamental Natural Language Processing (NLP) task that involves identifying and classifying entities (such as NLP terms) in text data.

The project demonstrates how to preprocess text, train a custom NER model, and use it for entity extraction. It includes the following components:

- Data preprocessing and preparation
- Training a custom NER model
- Evaluating model performance
- Making predictions on new data

# Setting Up the NER Project
Follow these steps to clone the project, set up a virtual environment, and install all the necessary dependencies.

## Step 1: Clone the Project
Start by cloning the project repository from GitHub (or another Git hosting service) to your local machine.

```
git clone https://github.com/Visal-Som30/NER_Project.git
```

## Step 2: Navigate to the Project Directory
After cloning the project, navigate into the project folder:

```
cd ner-project
```

## Step 3: Create a Virtual Environment
Next, create a virtual environment to isolate project dependencies.

**For Linux/MacOS:**
```
python -m venv venv
```

**For Windows:**
```
python -m venv venv
```

This will create a virtual environment named `venv` inside the project directory.

## Step 4: Activate the Virtual Environment
Activate the virtual environment to start using it.

**For Linux/MacOS:**
```
source venv/bin/activate
``` 

**For Windows:**
```
.\venv\Scripts\activate
```

Once activated, your terminal prompt should show `(venv)`, indicating that the virtual environment is active.

## Step 5: Install Project Dependencies
Now, install all the required dependencies listed in the `requirements.txt` file.

```
pip install -r requirements.txt
```

This will install all the necessary libraries like numpy, pandas, and others.

# Project Structure
```
ner_project/
├── data/
│   ├── train.csv                # Training data for NER model
│   ├── test.csv                 # Testing data for NER model
│   └── processed_data/          # Preprocessed data for training
├── models/                      # Trained and fine-tuned models
│   ├── trained_model/           # Model folder for saving trained model
│   └── fine_tuned_model/        # Fine-tuned models (if using transformers)
├── notebooks/                   # Jupyter Notebooks for experimentation
├── src/                         # Source code for data preprocessing, training, and inference
│   ├── __init__.py              # Initialize as a Python package
│   ├── preprocessing.py         # Data preprocessing scripts
│   ├── training.py              # Training script for the NER model
│   ├── evaluation.py            # Evaluation script for the trained model
│   └── inference.py             # Inference script for making predictions
├── requirements.txt             # Project dependencies
├── README.md                    # Project overview and setup instructions
└── config.yaml                  # Configuration file for hyperparameters and settings
```


