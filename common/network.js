class NeuralNetwork{
    // neuronCounts is an Array of neuronCounts per Level
    constructor(neuronCounts){

        this.levels=[];

        for(let i=0; i<neuronCounts.length-1; i++){
            this.levels.push(new Level(
                neuronCounts[i], 
                neuronCounts[i+1]
            ));
        }
    }

    static feedForward(givenInputs, network){
        let outputs = Level.feedForward(
            givenInputs, 
            network.levels[0]);
        for(let i = 1; i < network.levels.length; i++){
            outputs = Level.feedForward(
                outputs, network.levels[i]
            );
        }      
        return outputs;
    }
    static mutate(network, amount=1){
        network.levels.forEach(level =>{
            for(let i=0; i<level.biases.length; i++){
                level.biases[i]=lerp(
                    level.biases[i],
                    Math.random()*2-1,
                    amount
                )
            }
            for(let i=0; i<level.weights.length; i++){
                for(let j=0; j<level.weights[i].length; j++){
                    level.weights[i][j] = lerp(
                        level.weights[i][j],
                        Math.random()*2-1,
                        amount
                    )
                }
            }
        })
    }
}

class Level{
    constructor(inputCount, outputCount){

        // see example: Brilliant -> Introduction to NN -> Level 3 -> Curve Fitting

        // inputCount == count neurons on Level[i-1]
        // -> on Level #1: values from the sensors
        this.inputs=new Array(inputCount);
        // outputCount == count nerons on Level[i+1] == count weights per neron == count biases on Level[i+1]
        this.outputs=new Array(outputCount);

        //every neuron on a level has a bias
        this.biases=new Array(outputCount);

        this.weights=[];

        //every neuron gets a weight
        for(let i = 0; i < inputCount; i++){
            this.weights[i] = new Array(outputCount);
        }

        Level.#randomize(this);
    }

    // we use a static method so we can seriallize it later
    static #randomize(level){
        for(let i = 0; i < level.inputs.length; i++){
            for(let j = 0; j < level.outputs.length; j++){
                //get random value for weights between -1 and 1
                level.weights[i][j] = Math.random()*2 - 1;
            }
        }
        for(let i = 0; i < level.biases.length; i++){
            level.biases[i]=Math.random()*2 - 1;
        }
    }

    static feedForward(givenInputs, level){
        
        for(let i=0; i < level.inputs.length; i++){
            level.inputs[i] = givenInputs[i];
        }  
        for(let i=0; i < level.outputs.length; i++){
            let sum = 0;
            for(let j=0; j< level.inputs.length; j++){
                sum += level.inputs[j] 
                * level.weights[j][i]
            }
            // here we use the hyperplane equation
            // on that point we could also use the sigmoid function to calculate the output via f(sum + level.biases[i])
            // also here we only use linear functions, to get more complex we would need to use libraries like tensor flow  

            if(sum > level.biases[i]){
                //turning it on
                level.outputs[i] = 1;
            }else{
                //turning it off
                level.outputs[i] = 0;
            }
        }
        return level.outputs;
    }

}