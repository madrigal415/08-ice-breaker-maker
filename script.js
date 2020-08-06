"use strict";
console.log("testing 1 2 @@@");
// function to generate and place random quote

function makeQuote(data) {
    let quote = "Click qet quote to get a quote!";

    const numberQs = Object.keys(data).length;

    const randNumber = Math.floor(Math.random() * numberQs);

    console.log(randNumber);

    const q = data[randNumber];

    console.log('Q!!!')
    console.log(q);
    console.log(q.question);
    console.log(q.name);

    quote = `<p>${q.question}</p>`;

    document.getElementById("quoteInfo").innerHTML = quote;

    let r, g, b;
    r = Math.ceil(Math.random() * 255);
    g = Math.ceil(Math.random() * 255);
    b = Math.ceil(Math.random() * 255);

    var ne;

    let color = "rgb(" + r + "," + g + "," + b + ")";

    document.getElementById("quoteInfo").style.borderColor = color;

    document.getElementById("quoteInfo").style.color = color;
}

function getQuestion() {
    fetch("data.json")
        .then(response => {
            if (!response.ok) { throw response }
            return response.json()  //we only get here if there is no error
        })
        .then(json => {
            makeQuote(json);
        })
        .catch(err => {
            console.log(err);
        })
}

// run function on button click
const button = document.querySelector("#button");
button.addEventListener("click", function (e) {

    getQuestion();
});


