window.onload = function() {
    console.time("build HTML")
    var wrapper = document.querySelector('#wrapper')
    var answerBox = createNode("div", "", "answerBox");
    var buttonNode = createNode("button", "Click ME!");

    wrapper.appendChild(buttonNode);
    wrapper.appendChild(answerBox);
    wrapper.insertBefore(createNode("h2", "The DATA"), document.querySelector('.answerBox'));
    document.querySelector('.answerBox').style.display = "none";
    buildDom();
    var button = document.querySelector('button');
    button.addEventListener("click", function(e){
        var number = randomNumberGen();
        var node = createNode("p", number);
        document.querySelector('.answerBox').appendChild(node);
        // var data = getData();
        setData()
        console.log(charts)
        var chartOne = new Chartkick.LineChart("chart-1", [
            Object.assign({}, charts.mean),
            Object.assign({}, charts.median),
            Object.assign({}, charts.number),
            Object.assign({}, charts.mode),
            Object.assign({}, charts.upperBound),
            Object.assign({}, charts.lowerBound),
        ]);
})
    console.timeEnd("build HTML");
    // wrapper.appendChild(createNode("input", "", "Username", "", [["type", "text"], ["name", "username"], ["placeholder", "enter username..."]]))

}
var charts = {
    mean: {name: 'Mean', data:{}},
    median: {name: 'Median', data:{}},
    number: {name: 'Number', data:{}},
    mode: {name: 'Mode', data:{}},
    upperBound: {name: 'Upper Bound', data:{}},
    lowerBound: {name: 'Lower Bound', data:{}},
}
function setData(){
    var array = buildArray(".answerBox p");
    // deviationData: [{name: "Deviation", data: {Deviation: standardDeviation(variance(array))}},],
    // variance: [{name: "variance", data: {variance: variance(array)}}]}
    var tick = (new Date()).toISOString()
    // console.log(tick)
    charts.mean.data[tick] = mean(array)
    charts.number.data[tick] = array[array.length-1]
    charts.median.data[tick] = mode(array)
    charts.upperBound.data[tick] = upperBound(array)
    charts.lowerBound.data[tick] = lowerBound(array)
    console.log("key: ", tick, "value: ", mean(array), "\n")
    console.log("key: ", tick, "value: ", array[array.length-1], "\n")
    console.log("key: ", tick, "value: ", mode(array), "\n")
    console.log("key: ", tick, "value: ", upperBound(array), "\n")
    console.log("key: ", tick, "value: ", lowerBound(array), "\n")
    console.log(typeof charts.mean.data)
    console.log(charts.mean.data)

}
function createNode(type, innerText="", className, idName, attributes={}) {
    var node = document.createElement(type);
    node.innerHTML = innerText;
    if (className) node.className = className;
    if (idName) node.id = idName;
    if (attributes.length > 0) {
        for (var i = 0; i < attributes.length; i++) {
            for (var j=0, k=1; j < attributes[i].length; j += 2, k += 2) {
                node.setAttribute(attributes[i][j], attributes[i][k]);
            }
        }
    }
    return node
}

function randomNumberGen(){
    return Math.floor(Math.random() * 100);
}

function buildArray(node) {
    var result = [], matches = document.querySelectorAll(node);
    for (var i = 0; i < matches.length; i++) {
        result.push(matches[i].innerHTML);
    }
    return result
}




function sum(arr) {
    return arr.reduce((a, b) => a + b);
}

function mean(arr) {
    return sum(arr) / arr.length
}

function median(arr) {

    arr.sort( function(a,b) {return a - b;} );

    var half = Math.floor(arr.length/2);

    if(arr.length % 2)
        return parseInt(arr[half]);
    else
        return (parseInt(arr[half-1]) + parseInt(arr[half])) / 2.0;
}

// clearly I didnt write this function must ask daniel how to write this in a way that makes sense too me.

function mode(arr) {
    var object = {}, maxCount = 0, maxValue, m;
    for (var i=0, iLen=arr.length; i<iLen; i++) {
        m = arr[i];

        if (!object.hasOwnProperty(m)) {
            object[m] = 0;
        }
        ++object[m];

        if (object[m] > maxCount) {
            maxCount = object[m];
            maxValue = m;
        }
    }
    return maxValue;
}

function upperBound(arr) {
    var bound = 0;
    for (var i = 0; i < arr.length; i++){
        loc = arr[i];
        if (loc > bound) {
            bound = loc
        }
    }
    return bound
}

function lowerBound(arr) {
    var bound = upperBound(arr);
    for (var i = 0; i < arr.length; i++){
        loc = arr[i];
        if (loc < bound) {
            bound = loc
        }
    }
    return bound
}


function standardDeviation(Variance) {
    return Math.sqrt(Variance)
}
function variance(arr) {
    var m = mean(arr);
    var vari = 0;
    for (var i = 0; i<arr.length; i++)  {
        vari += (arr[i] - m)
    }
    vari *= vari
    return vari / (arr.length-1)
}

function buildDom() {

    // Setup sum
    if (!document.querySelector('.sumContainer')) wrapper.appendChild(createNode("div", "", "sumContainer"))
    else if (!document.querySelector('.sumTitle')) document.querySelector('.sumContainer').appendChild(createNode("h3", "Sum: 0", "sumTitle"));
    else  document.querySelector('.sumTitle').innerHTML = "Sum: " + sum(array);
    // Setup Mean
    if (!document.querySelector('.meanContainer')) wrapper.appendChild(createNode("div", "", "meanContainer"))
    else if (!document.querySelector('.meanTitle')) document.querySelector('.meanContainer').appendChild(createNode("h3", "Mean: 0", "meanTitle"));
    else  document.querySelector('.meanTitle').innerHTML = "Mean: " + mean(array).toFixed(2);
    // Setup Median
    if (!document.querySelector('.medianContainer')) wrapper.appendChild(createNode("div", "", "medianContainer"))
    else if (!document.querySelector('.medianTitle')) document.querySelector('.medianContainer').appendChild(createNode("h3", "Median: 0", "medianTitle"));
    else  document.querySelector('.medianTitle').innerHTML = "Median: " + median(array).toFixed(2);
    // Setup Mode
    if (!document.querySelector('.modeContainer')) wrapper.appendChild(createNode("div", "", "modeContainer"));
    else if (!document.querySelector('.modeTitle')) document.querySelector('.modeContainer').appendChild(createNode("h3", "Mode: 0", "modeTitle"));
    else document.querySelector('.modeTitle').innerHTML = "Mode: " + mode(array);
    //Setup upperBound
    if (!document.querySelector('.boundContainer')) wrapper.appendChild(createNode("div", "", "boundContainer"));
    else if (!document.querySelector('.boundTitle')) document.querySelector('.boundContainer').appendChild(createNode("h3", "Upper Bound: 0", "boundTitle"));
    else document.querySelector('.boundTitle').innerHTML = "Upper Bound: "+ upperBound(array);
    //Setup LowerBound
    if (!document.querySelector('.lowerboundContainer')) wrapper.appendChild(createNode("div", "", "lowerboundContainer"));
    else if (!document.querySelector('.lowerboundTitle')) document.querySelector('.lowerboundContainer').appendChild(createNode("h3", "Lower Bound: 0", "lowerboundTitle"));
    else document.querySelector('.lowerboundTitle').innerHTML = "Lower Bound: "+ lowerBound(array);
    //Setup Variance
    if (!document.querySelector('.varianceContainer')) wrapper.appendChild(createNode("div", "", "varianceContainer"));
    else if (!document.querySelector('.varianceTitle')) document.querySelector('.varianceContainer').appendChild(createNode("h3", "Variance: 0", "varianceTitle"));
    else document.querySelector('.varianceTitle').innerHTML = "Variance: "+ variance(array);
    //Setup Std Deviation
    if (!document.querySelector('.stdDeviationContainer')) wrapper.appendChild(createNode("div", "", "stdDeviationContainer"));
    else if (!document.querySelector('.stdDeviationTitle')) document.querySelector('.stdDeviationContainer').appendChild(createNode("h3", "Standard Deviation: 0", "stdDeviationTitle"));
    else document.querySelector('.stdDeviationTitle').innerHTML = "Standard Deviation: "+ standardDeviation(variance(array));
    
    
    wrapper.appendChild(createNode("div", "", "", "chart-1", [["style", "300px"]]));
    wrapper.appendChild(createNode("div", "", "", "chart-2", [["style", "300px"]]));   
    wrapper.appendChild(createNode("div", "", "", "chart-3", [["style", "300px"]]));   
}
