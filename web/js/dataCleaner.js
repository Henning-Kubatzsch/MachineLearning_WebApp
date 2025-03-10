const flaggedSamples=[];

function toggleFlaggedSample(sample){
    if(flaggedSamples.includes(sample.id)){
        //splice removes elements from start start-index value
        const index = flaggedSamples.indexOf(sample.id, 1);
        flaggedSamples.splice(index,1);
    }else{
        console.log('wants to push sample: ' + sample.id);
        flaggedSamples.push(sample.id)
    }
    [...document.querySelectorAll(".flagged")].forEach(
        (e)=>e.classList.remove("flagged")
    );

    for(const id of flaggedSamples){
        const el = document.getElementById("sample_" + id);
        el.classList.add("flagged");
    }
}