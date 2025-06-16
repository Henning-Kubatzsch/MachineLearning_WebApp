# MachineLearning_WebApp

## Preparation:
install node.js

## python venv
- sklear



Terminal at /node

1. create datasets
```
node dataset_generator.js
```
* deletes data/dataset folder if existing
* creates data/models directory if not existing
* from every sample:
    * takes content (session, student, drawings) 
    * writes .json file
    * creates .img file
* creates samples.json file in /data/dataset
* 

2. extract features from dataset
```
node feature_extractor.js
```
* creates training and test datasets (splits samples)
    * adjust sizes
* normalizes image information
* creates 
    * testing.json/ training.json and testin.csv/ training.csv in /data/dataset
    * testing.js / training.js in /common/js_objects
* writes minMax.js in /common/js_objects

3. Run Evaluation

go to folder python

run 
```
pyhton mlp.py
```

or
```
node run_evaluation_mlp.js
```

* 