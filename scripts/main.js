import { shuffle } from './shuffler.js';

// function to generate and place random quote
function makeQuote(data) {

    const indexStart = quoteInfo.state.count;
    const numberQ = Number(numberSelection.value);

    let quote = "";

    for (let i = indexStart; i < numberQ + indexStart; i++) {

        let modulo = i % quoteInfo.state.length;
        let q = data[modulo];
        quote += `<p class="oneQ">${q.question}</p>`;
    }

    document.getElementById("quoteInfo").innerHTML = quote;

}
let dataUrl = './data.json';
// dataUrl = 'https://gist.githubusercontent.com/madrigal415/424e18ac9f92b34cfdfb6c1adc4ec284/raw/bff15332dd6d9286471b81d60dc83526817c43be/IcebreakerMaker.json';

// run function on button click
const quoteInfo = document.getElementById("quoteInfo");
const buttonPrevious = document.querySelector("#previous");
const buttonNext = document.querySelector("#next");
const numberSelection = document.querySelector("#num-select");

// add functions to quoteInfo element
quoteInfo.state = {
    count: 0,
    length: 0,
    decrement: () => {
        quoteInfo.state.count -= 1 * Number(numberSelection.value);
        quoteInfo.state.count % quoteInfo.state.length - 1;
        if (quoteInfo.state.count < 0) {
            quoteInfo.state.count = (quoteInfo.state.length) - numberSelection.value;
        }
    },
    increment: () => {
        quoteInfo.state.count += 1 * Number(numberSelection.value);

    }
};

buttonPrevious.addEventListener("click", function () {
    quoteInfo.state.decrement(); // add one to the index
    getJson(Number(numberSelection.value), quoteInfo.state.count);
});

buttonNext.addEventListener("click", function () {

    quoteInfo.state.increment(); // add one to the index
    getJson(Number(numberSelection.value), quoteInfo.state.count);
});

// run function on button click
numberSelection.addEventListener("click", function (e) {
    getJson(Number(numberSelection.value), quoteInfo.state.count);
});

// run get quote on load
window.onload = () => { main() };

async function getDataAsync(location) {
    let response = await fetch(location);
    let data = await response.json()
    return shuffle(data);
}

async function main() {
    const data = await getDataAsync(dataUrl);
    storeJson(data); // put data in local storage
    getJson();
}

// store json in local storage
function storeJson(x) {
    localStorage.setItem('questions', JSON.stringify(x));
}

function getJson() {
    let retrievedObject = localStorage.getItem('questions');
    let parsedData = JSON.parse(retrievedObject); // set name of variable
    quoteInfo.state.length = parsedData.length; // set app state length 
    makeQuote(parsedData);
}
