window.onload = function() {
    console.time("build HTML")
    var wrapper = document.querySelector('#wrapper')
    var answerBox = createNode("div", "", "answerBox");
    var buttonNode = createNode("button", "Click ME!");

    wrapper.appendChild(buttonNode);
    wrapper.appendChild(answerBox);
    wrapper.insertBefore(createNode("h2", " Your Random Number's"), document.querySelector('.answerBox'));
    var button = document.querySelector('button');
    console.log(button)
    button.addEventListener("click", function(e){
        var number = randomNumberGen();
        var node = createNode("p", number);
        document.querySelector('.answerBox').appendChild(node);
        var array = buildArray(".answerBox p");
        if (!document.querySelector('.sumContainer')) {
            wrapper.appendChild(createNode("div", "", "sumContainer"))
        } else if (!document.querySelector('.sumTitle')) {
            document.querySelector('.sumContainer').appendChild(createNode("h3", "Sum: 0", "sumTitle"));
        } else {
            document.querySelector('.sumTitle').innerHTML = "Sum: " + sum(array);
        }
        if (!document.querySelector('.meanContainer')) {
            wrapper.appendChild(createNode("div", "", "meanContainer"))
        } else if (!document.querySelector('.meanTitle')) {
            document.querySelector('.meanContainer').appendChild(createNode("h3", "Mean: 0", "meanTitle"));
        } else {
            document.querySelector('.meanTitle').innerHTML = "Mean: " + mean(array).toFixed(2);
        }
        if (!document.querySelector('.medianContainer')) {
            wrapper.appendChild(createNode("div", "", "medianContainer"))
        } else if (!document.querySelector('.medianTitle')) {
            document.querySelector('.medianContainer').appendChild(createNode("h3", "Median: 0", "medianTitle"));
        } else {
            document.querySelector('.medianTitle').innerHTML = "Median: " + median(array).toFixed(2);
        }
})
    console.timeEnd("build HTML")
}

function createNode(type, innerText="", className, idName, attributes=[]) {
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
    var count = 0;
    for (var i = 0; i < arr.length; i++){
        count += parseInt(arr[i]);
    }
    return count
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