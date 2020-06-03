/*
 * Author: Mounceph Morssaoui
 * Github: Mounceph99
 * Created on: May 21, 2020
 * Last Modified: May 26, 2020
 * 
 * Description:
 *  This file takes care of any possible user interaction with the 
 *  application. Takes care of buttons, slider...
 */

//Variables for scale how many lines to sort.
//Size is for how many individual boxes there will. 
//boxWidth is for the individual box unit used to graph
var size, boxWidth;
//containerWidth/containerHeight store the containers width and height
//The extra variables are for extras such as respective padding, border and margin sizes
var containerWidth, containerHeight, extra_width, extra_height;
//Used for visualisation and speed factot
var time;
//Used to know if the board was reshuffled
var isShuffle = false;
//Store the sorting method Note: Bubble sort is the default
let sortMethod;

// https://beautifier.io/ parse code to make it clean



//This function re-initializes the vertical bars of different height and colors
//to later sort.
function shuffle() {
    //Set shuffle variable to true
    isShuffle = true;
    //Get the range of the slider and set the boxWidth and how many boxes
    //will be made
    getSize();
    //Re-init bars array
    numbers = new Array();
    //Get the div.container in which the bars will be displayed in
    let parentDiv = document.getElementsByClassName("container")[0];
    //Clear the container
    parentDiv.textContent = "";

    //Create the bars
    for (let i = 0; i < size; i++) {
        //Create a div with class .box and set its width
        numbers.push(document.createElement("div"));
        numbers[i].className = "box";
        numbers[i].style.width = boxWidth;

        //Randomly assign it a height
        let randomHeight = Math.floor(Math.random() * 251) + 5;
        //Convert to string for CSS
        numbers[i].style.height = randomHeight.toString() + "px";

        //Align the bottom of the bars with the container, set its top margin
        //accordingly
        let difference = containerHeight - randomHeight;
        //Convert to string for CSS
        numbers[i].style.marginTop = difference.toString() + "px";

        //Set the bars color, which is based on height
        numbers[i].style.backgroundColor = generateColorHeight(randomHeight);

        //Add element to container
        parentDiv.appendChild(numbers[i]);
    }

}

//This function returns the color based on the height
function generateColorHeight(height) {
    //256 is for how many colors there are in rgb() {0-255}
    //7 is for how many colors will be allowed
    let rangeC = Math.floor(height / (256 / 7));
    let color, rMul, gMul, bMul;
    switch (rangeC) {
        //purple
        case 0:
            rMul = 128;
            gMul = 0;
            bMul = 128;
            break;

        //indigo
        case 1:
            rMul = 75;
            gMul = 0;
            bMul = 130;
            break;
        //blue
        case 2:
            rMul = 18;
            gMul = 94;
            bMul = 166;
            break;
        //green
        case 3:
            rMul = 90;
            gMul = 166;
            bMul = 18;
            break;
        //yellow
        case 4:
            rMul = 255;
            gMul = 255;
            bMul = 0;
            break;
        //orange
        case 5:
            rMul = 255;
            gMul = 140;
            bMul = 0;
            break;
        //red
        case 6:
            rMul = 255;
            gMul = 0;
            bMul = 0;
            break;

    }
    //Convert color to rgb() string for CSS
    return "rgb(" + rMul.toString() + "," + gMul.toString() + "," + bMul.toString() + ")";

}

//This function return a string that truncates the two last chars
//Useful to remove the "px" in measurements with "px"
//All in all, this function removes the last 2 characters of a string
function removePx(str) {
    return str.substring(0, str.length - 2);
}

//This function is used to create the visuals, and slow down the computation
const sleep = (milliseconds) => {
    if (milliseconds == 0) {
        return
    }
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

//This function is called when the window loads and initializes everything
function init() {
    //Border (left and right) length and padding-left combined of .container
    extra_width = 11;
    //Top and bottom border length combined of .container
    extra_height = 10;
    //Height of container 
    containerHeight = document.getElementsByClassName("container")[0].offsetHeight - extra_height;
    //Width of container
    containerWidth = document.getElementsByClassName("container")[0].offsetWidth - extra_width;
    //Retrieve value from range slider
    getSize();

    //Default Sorting
    changeSort();

    //Create the vertical bars to which we sort
    shuffle();
}

//This function  and store the value of the range slider which is used to
//know how many boxes or bars to have in container. Also, sets the width of each
//bar or box accordingly.
function getSize() {
    //set size, this sets how many vertical bars to have. Taken from slider.
    size = document.getElementsByTagName("input")[0].value;
    //this sets the width of each vertical bar
    boxWidth = (containerWidth / size).toString() + "px";
}

//This function is used to speed up or slow down the visuals
function speed() {
    //Get text of speed button
    let currentSpeed = document.getElementsByClassName("speedButton")[0].innerText;
    //A looping process: Default->Speed Up->Slow Down->Default...
    switch (currentSpeed) {
        case "0.25x":
            document.getElementsByClassName("speedButton")[0].innerText = "0.5x"
            time = 120;
            break;
        case "0.5x":
            document.getElementsByClassName("speedButton")[0].innerText = "1x"
            time = 60;
            break;
        case "1x":
            document.getElementsByClassName("speedButton")[0].innerText = "3x"
            time = 30;
            break;
        case "3x":
            document.getElementsByClassName("speedButton")[0].innerText = "5x"
            time = 1;
            break;
        case "5x":
            document.getElementsByClassName("speedButton")[0].innerText = "0.25x"
            time = 240;
            break;
        default:
            document.getElementsByClassName("speedButton")[0].innerText = "1x"
            time = 60;
            break;
    }
}

//This function is associated with the jet button, which instantly sorts
//the vertical from wherever it is (can be at the start or in the middle of
//sorting)
async function instantDone() {
    let tempTime = time;
    time = 0;
    sort();
    //Allow a small delay before resetting back to previous time, respective on size.
    await sleep(size);
    time = tempTime;
}

//This function changes the writing on the sorting button, with respective
//to user's selected sorting algorithm
async function changeSort(sortName) {

    //Allow for a small delay because the function is called before the URL is changed
    await sleep(4);
    setSort();
    formatSortForButton()

    //undefined only occurs when the page is first loaded, set default sorting to bubble sort
    if (sortName == undefined) {
        document.getElementsByClassName("sortButton")[0].innerText = sortMethod;
    } else {
        document.getElementsByClassName("sortButton")[0].innerText = sortName;
    }

    //Re-shuffle
    shuffle();


}

//This function returns the url of the page as a string
function getURL() {
    return window.location.href.toString();
}

//This function sets the sorting method
function setSort() {
    try {
        let reg = /#/;
        let url = getURL();
        let position = reg.exec(url).index + 1;
        sortMethod = url.substring(position);
    } catch (err) {
       
        sortMethod = "bubble";
    }

}

//Helper function the formats the sorting method string to put on button
function formatSortForButton() {
    let firstLetter = sortMethod.charAt(0).toUpperCase();
    sortMethod = sortMethod.substring(1);
    sortMethod = firstLetter + sortMethod + " Sort";
}

//Initialize variables on window load
window.onload = init;
//end