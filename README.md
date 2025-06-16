# MachineLearning_WebApp

This project is heavily inspired by the YouTube tutorial  
**"No Blackbox Machine Learning Course in JavaScript"** by Dr. Radu Mariescu-Istodor.  
Watch it here: [https://www.youtube.com/watch?v=vDDjtwQDw2k](https://www.youtube.com/watch?v=vDDjtwQDw2k)

![Screenshot](img/MachineLearning_WebApp.png)

---

## What This Project Is About

This project evolves step by step by introducing methods to collect and process hand-drawn pictures as input. These images are pre-labeled and used for training a neural network.

The course comes with a large dataset you can download. Various strategies are discussed for developing intelligent image classification algorithms. 

Initially, we implement a basic multi-layer perceptron (MLP) completely from scratch in JavaScript. Later in the course, we transition to Python libraries to evaluate and compare the performance of our custom MLP.

---

## Preparation

Install [Node.js](https://nodejs.org/) if it is not already installed.

---

## Python Virtual Environment

Set up your Python environment:

1. Create a virtual environment
2. Install dependencies:

```bash
pip install -r requirements.txt
````

---

## Usage (from `/node` directory)

### 1. Generate Dataset

```bash
node dataset_generator.js
```

This script will:

* Delete the `/data/dataset` folder if it exists
* Create the `/data/models` directory if it doesn't exist
* For each sample:

  * Extract session, student, and drawing content
  * Generate a `.json` and a corresponding `.img` file
* Generate `samples.json` in `/data/dataset`

---

### 2. Extract Features

```bash
node feature_extractor.js
```

This script will:

* Split the data into training and test datasets (you can configure the sizes)
* Normalize image data
* Create:

  * `training.json`, `testing.json`, `training.csv`, and `testing.csv` in `/data/dataset`
  * `training.js`, `testing.js`, and `minMax.js` in `/common/js_objects`

---

### 3. Run Evaluation

Navigate to the `/python` directory and run one of the following:

#### Using Python:

```bash
python mlp.py
```

#### Using Node.js:

```bash
node run_evaluation_mlp.js
```

---

## View Results

Open `viewer.html` in your browser to explore the results.

You can interact with two modes using the **"Toggle Output"** button:

* **Neural Network View**:
  Displays the network architecture, including:

  * Input layer (each pixel corresponds to one input neuron)
  * Two hidden layers with color-coded activation values
    (blue = negative, yellow = positive)
  * Output layer showing the predicted class probabilities

* **Bigram View**:
  Shows a bigram/confusion matrix representing prediction accuracy
  by visualizing the distribution of predicted classes for each actual class.

---

### Drawing Mode

Click **"Toggle Input"** to open a drawing canvas.

* Use the left mouse button to draw an image.
* The system will classify the image and show the top predicted category above the canvas.








