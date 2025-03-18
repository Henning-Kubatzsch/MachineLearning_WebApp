from functions import readFeatureFile
from sklearn.neural_network import MLPClassifier

hidden = (10, 10)

mlp = MLPClassifier(
   hidden, 
   max_iter= 10000, 
   random_state=1,
    #rectified linear unit is enabled by default -> for having the code fully compatablile with js code we need to adapt the js. network
   activation='tanh'
)

X, y = readFeatureFile("../data/dataset/training.csv")

mlp.fit(X, y)

X, y = readFeatureFile("../data/dataset/testing.csv")

accuracy = mlp.score(X, y)
print("Accuracy:", accuracy)

# gives us the biases of every layer
# print(mlp.intercepts_)

# gives us the weights of all levels
# print(mlp.coefs_)

classes = [
    "car", "fish", "house", "tree", "bicycle", "guitar", "pencil", "clock"
]

jsonObj = {
    "neuronCounts": [len(X[0]), hidden, len(classes)],
    "classes": classes,
    "network": {
        "levels": []
    }
}

for i in range(0, len(mlp.coefs_)):
    level = {
        "weights": mlp.coefs_[i].tolist(),
        "biases": mlp.intercepts_[i].tolist(),
        # generates list of mlp.coefs_[i] [0]-lists of: [[0],[0], ...] 
        "inputs": [0] * len(mlp.coefs_[i]),
        "outputs": [0] * len(mlp.intercepts_[i])
    }
    jsonObj["network"]["levels"].append(level)

import json
# create json object with an indent -> we can read it more nicely
json_object = json.dumps(jsonObj, indent = 2)

with open("../data/models/model.json", "w") as outfile:
    outfile.write(json_object)

with open("../common/js_objects/model.js", "w") as outfile:
    outfile.write("const model = " + json_object + ";")
    