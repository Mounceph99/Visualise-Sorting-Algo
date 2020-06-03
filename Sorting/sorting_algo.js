/*
 * Author: Mounceph Morssaoui
 * Github: Mounceph99
 * Created on: May 21, 2020
 * Last Modified: May 28, 2020
 * 
 * Description:
 *     First half of sorting algorithms and its helper functions
 *     This file takes care of: Bubble, Selection, Insertion, Radix and Counting sort.
 *     Helper functions: sort(), swap(i,y), getMaxHeight()
 * 
 */

//Used to know if the sorting visualisation is currently running
let inProgress = false;

function sort() {
    //To assure only one bubble sort is happening and that the bubble sort
    //can restart with new parameters without any problems.
    isShuffle = false;
    //If there is already a bubble sort visual hapenning, ignore demand to sort.
    if (inProgress == false) {
        inProgress = true;
    } else {
        return
    }

    //Do selected sort
    switch (sortMethod) {
        case "Bubble Sort":
            bubble();
            break;
        case "Selection Sort":
            selection();
            break;
        case "Insertion Sort":
            insertion();
            break;
        case "Radix Sort":
            radix();
            break;
        case "Counting Sort":
            counting();
            break;
        case "Heap Sort":
            heap();
            break;
        case "Quick Sort":
            quick();
            break;
        case "Merge Sort":
            merge();
            break;
    }


}
//This function sorts according to bubble sort the vertical boxes from lowest to heighest
//Bubble sort compares two adjacent element, if the current element is bigger
//than the next element, swap. Loop through the list until sorted.
//This function is async to visualize the process
async function bubble() {

    for (var inner = 0; inner < numbers.length - 1; inner++) {
        for (var outer = 0; outer < numbers.length - inner - 1; outer++) {

            //Getting and truncating the number portion of the height of the
            //left element
            let heightLeftpx = numbers[outer].style.height;
            heightLeftpx = parseInt(removePx(heightLeftpx));

            //Getting and truncating the number portion of the height of the
            //right element
            let heightRightpx = numbers[outer + 1].style.height;
            heightRightpx = parseInt(removePx(heightRightpx));

            //Swap adjacent elements if the left is bigger
            if (heightLeftpx > heightRightpx) {

                try {
                    //Follows current Location and tracks it with a white bar for user to follow easily
                    let tempColorWhite = numbers[outer].style.backgroundColor;
                    numbers[outer].style.backgroundColor = "rgb(255,255,255)";
                    //Allows for visualization
                    await sleep(time);
                    //Swap vertical bars
                    swap(outer, outer + 1);
                    //Restore color, note that is the swap happened, the white bar continues with the largest
                    numbers[outer + 1].style.backgroundColor = tempColorWhite;
                } catch (err) {
                    //Ignore error
                }
                
            }
            //If at any point, the user decides to reshuffle, stop visualisation immediately
            if (isShuffle) {
                break;
            }
        }
        //If at any point, the user decides to reshuffle, stop visualisation immediately
        if (isShuffle) {
            isShuffle = false;
            break;
        }
     
    }
    //Done sorting, allow for a new sort
    inProgress = false;
}

//This function sorts according to Selection sort the vertical boxes from lowest to heighest
//Selection sort finds the minimum height, then places it at the beginning. Continously does so,
//until all is sorted.
//This function is async to visualize the process
async function selection() {

    for (let outer = 0; outer < numbers.length; outer++) {
        //Set minimum to first value
        let minIndex = outer;
        //Getting and truncating the number portion of the height of the
        //left element
        let heightMin = numbers[minIndex].style.height;
        heightMin = parseInt(removePx(heightMin));

        //Follows current Location and tracks it with a green bar for user to follow easily
        let tempColorGreen = numbers[outer].style.backgroundColor;
        numbers[outer].style.backgroundColor = "rgb(0,255,0)";

        for (let inner = outer + 1; inner < numbers.length; inner++) {

            //If at any point, the user decides to reshuffle, stop visualisation immediately
            if (isShuffle) {
                break;
            }

            //Getting and truncating the number portion of the height of the
            //right element
            let heightCurrent = numbers[inner].style.height;
            heightCurrent = parseInt(removePx(heightCurrent));

            //Change temptative minimum bar
            if (heightCurrent < heightMin) {
                //Follows next swapping bar and tracks it with a white bar for user to follow easily
                let tempColorWhite = numbers[inner].style.backgroundColor;
                numbers[inner].style.backgroundColor = "rgb(255,255,255)";
                try {
                    //Allows for visualization
                    await sleep(time);
                } catch (err) {
                    console.log(err);
                }
                //Set minIndex to current index
                minIndex = inner;

                //Set min height
                heightMin = numbers[minIndex].style.height;
                heightMin = parseInt(removePx(heightMin));
                //Restore color, note that is the swap happened, the white bar continues with the smallest
                numbers[minIndex].style.backgroundColor = tempColorWhite;
            }

        }
        //Done current iteration, put smallest bar at the beginning
        if (minIndex != outer) {
            try {
                //Allows for visualization
                await sleep(time);
                swap(minIndex, outer);
            } catch (err) {
                //Ignore error
            }

        }
        //Restore color, note that is the swap happened, the white bar continues with the largest
        numbers[minIndex].style.backgroundColor = tempColorGreen;

        //If at any point, the user decides to reshuffle, stop visualisation immediately
        if (isShuffle) {
            isShuffle = false;
            break;
        }

    }

    //Done sorting, allow for a new sort
    inProgress = false;
}

//This function sorts according to Insertion sort the vertical boxes from lowest to heighest
//Insertion sort is very similar to how we sort playing cards. Start at the beginning,
//if the current card is smaller then it previous card, swap them. Continue, until it is no longer
// the case, then continue from where it was first located and do the same with that bar. Continously does so,
//until all is sorted.
//This function is async to visualize the process
async function insertion() {

    for (let forward = 1; forward < numbers.length; forward++) {
        //Getting and truncating the number portion of the height of the
        //left element
        let heightCurrent = numbers[forward].style.height;
        heightCurrent = parseInt(removePx(heightCurrent));

        //Set initial index of bar that is about to move
        let indexCurrent = forward;

        //Follows current Location and tracks it with a green bar for user to follow easily
        if ((forward + 1) < numbers.length) {
            var tempColorGreen = numbers[forward + 1].style.backgroundColor;
            numbers[forward + 1].style.backgroundColor = "rgb(0,255,0)";
        }

        //This for loop goes backwards
        for (let backward = forward - 1; backward >= 0; backward--) {

            //If at any point, the user decides to reshuffle, stop visualisation immediately
            if (isShuffle) {
                break;
            }

            //Follows current Location and tracks it with a white bar for user to follow easily
            let tempColorWhite = numbers[indexCurrent].style.backgroundColor;
            numbers[indexCurrent].style.backgroundColor = "rgb(255,255,255)";

            //indexCompare for which it is currently comparing the height of
            let indexCompare = backward;
            //Convert and set height to a number
            let heightCompare = numbers[backward].style.height;
            heightCompare = parseInt(removePx(heightCompare));

            //if true, swap the current bar with the one it is being compare to
            if (heightCurrent < heightCompare) {

                try {

                    swap(indexCompare, indexCurrent)
                    //Allows for visualization
                    await sleep(time);

                    //Update current index
                    indexCurrent = indexCompare;

                    //Change back the color of current bar
                    numbers[indexCurrent].style.backgroundColor = tempColorWhite;


                } catch (err) {
                    //Ignore error
                }

                continue;
            }
            //Change back the color of current bar
            numbers[indexCurrent].style.backgroundColor = tempColorWhite;
            //Break because nothing will be bigger once this point is reached
            break;
        }
        //Change back the color of current bar
        if ((forward + 1) < numbers.length) {
            numbers[forward + 1].style.backgroundColor = tempColorGreen;
        }
        //If at any point, the user decides to reshuffle, stop visualisation immediately
        if (isShuffle) {
            isShuffle = false;
            break;
        }
    }

    //Done sorting, allow for a new sort
    inProgress = false;
}

//This function sorts according to radix sort the vertical boxes from lowest to heighest
//Radix sort uses counting sort. The sort is divided into sub-sorts where each sub-sort sorts
//a different decimal place, starting from the smallest to the largest position.
//This function is async to visualize the process
async function radix() {

    //The maximum height has the most digits
    let maxHeight = getMaxHeight();

    //Radix sort using Counting sort 
    for (let exp = 1;
        (maxHeight / exp) >= 1; exp *= 10) {

        //Declare a sortedDigits with slots that equals the number of bars used for the radix portion
        let sortedDigits = new Array(numbers.length);
        //Declare an array for hashing base 10 used for counting sort portion and fill it will zeros
        let countedArray = new Array(10);
        countedArray.fill(0);

        //Count how many many instances of each digits at current decimal place
        for (let i = 0; i < numbers.length; i++) {
            //If at any point, the user decides to reshuffle, stop visualisation immediately
            if (isShuffle) {
                break;
            }
            //Follows current Location and tracks it with a green bar for user to follow easily
            let tempColorGreen = numbers[i].style.backgroundColor;
            numbers[i].style.backgroundColor = "rgb(0,255,0)";

            try {
                //Allows for visualization
                await sleep(time / 3);
            } catch (err) {
                //Ignore error
            }
            //Change back the color of current bar
            numbers[i].style.backgroundColor = tempColorGreen;

            //Increment hashing index respective to the current decimal place digit
            let index = (Math.floor(parseInt(removePx(numbers[i].style.height)) / exp)) % 10;
            countedArray[index]++;
        }

        //If at any point, the user decides to reshuffle, stop visualisation immediately
        if (isShuffle) {
            isShuffle = false;

            //Done sorting, allow for a new sort
            inProgress = false;
            return;
        }

        //Sum up at each index the sum of itself and all previous
        for (let i = 1; i < countedArray.length; i++) {
            //If at any point, the user decides to reshuffle, stop visualisation immediately
            if (isShuffle) {
                break;
            }
            countedArray[i] += countedArray[i - 1];
        }

        //If at any point, the user decides to reshuffle, stop visualisation immediately
        if (isShuffle) {
            isShuffle = false;

            //Done sorting, allow for a new sort
            inProgress = false;
            return;
        }

        //Start sorting the sortedDigits array usnig the countedArray
        for (let i = numbers.length - 1; i >= 0; i--) {
            //If at any point, the user decides to reshuffle, stop visualisation immediately
            if (isShuffle) {
                break;
            }
            let index = (Math.floor(parseInt(removePx(numbers[i].style.height)) / exp)) % 10;
            sortedDigits[countedArray[index] - 1] = numbers[i];
            countedArray[index]--;
        }

        //If at any point, the user decides to reshuffle, stop visualisation immediately
        if (isShuffle) {
            isShuffle = false;

            //Done sorting, allow for a new sort
            inProgress = false;
            return;
        }

        //Create a variable to hold the container
        let parentDiv = document.getElementsByClassName("container")[0];
        //Copy sortedDigits to vertical bars array
        for (let i = 0; i < numbers.length; i++) {
            //If at any point, the user decides to reshuffle, stop visualisation immediately
            if (isShuffle) {
                break;
            }
            //Copy to actual array
            numbers[i] = sortedDigits[i];
            try {
                //Allows for visualization
                await sleep(time);
            } catch (err) {
                //Ignore error
            }
            //Changes bar location
            parentDiv.insertBefore(numbers[i], parentDiv.children[i])
        }
    }
    //Done sorting, allow for a new sort
    inProgress = false;
}

//This function sorts according to Counting sort the vertical boxes from lowest to heighest
//Counting sort does not compare anything, but sorts using arithmetic. First get the max value 
//and create an array of that size. (This is a specific range) Using a hashing/arithmetic, sort the digits.
//Using three loops. 1: Map height to an array. 2: Sum current indices with all previous indices. 3. Sort.
//This function is async to visualize the process
async function counting() {
    //Consider the data range, record the max height
    //Range: 0-maxHeight
    let upperRange = getMaxHeight();

    //Set size to upper range and fill array with zeros
    let countArray = new Array(upperRange);
    countArray.fill(0);

    //Count how many many instances of each height in countArray
    for (let i = 0; i < numbers.length; i++) {

        //If at any point, the user decides to reshuffle, stop visualisation immediately
        if (isShuffle) {
            break;
        }
        //Follows current Location and tracks it with a green bar for user to follow easily
        let tempColorGreen = numbers[i].style.backgroundColor;
        numbers[i].style.backgroundColor = "rgb(0,255,0)";
        try {
            //Allows from visualization
            await sleep(time / 3);
        } catch (err) {
            //Ignore error
        }

        //increment hashing index
        let currentHeight = parseInt(removePx(numbers[i].style.height));
        countArray[currentHeight]++;

        //Change back the color of current bar
        numbers[i].style.backgroundColor = tempColorGreen;
    }

    //If at any point, the user decides to reshuffle, stop visualisation immediately
    if (isShuffle) {
        isShuffle = false;

        //Done sorting, allow for a new sort
        inProgress = false;
        return;
    }

    //Sum up at each index the sum of itself and all previous
    for (let i = 1; i < countArray.length; i++) {

        //If at any point, the user decides to reshuffle, stop visualisation immediately
        if (isShuffle) {
            break;
        }

        try {
            //Follows current Location and tracks it with a green bar for user to follow easily
            if ((i - 1) < numbers.length) {
                var tempColorGreen = numbers[i - 1].style.backgroundColor;
                numbers[i - 1].style.backgroundColor = "rgb(0,255,0)";
                //Alows for visualization
                await sleep(time / 3);
            }
            //Change back the color of current bar
            if ((i - 1) < numbers.length) {
                numbers[i - 1].style.backgroundColor = tempColorGreen;
            }

        } catch (err) {
            //Ignore error
        }
        //Sum of current plus sum of previous
        countArray[i] += countArray[i - 1];

    }

    //If at any point, the user decides to reshuffle, stop visualisation immediately
    if (isShuffle) {
        isShuffle = false;

        //Done sorting, allow for a new sort
        inProgress = false;
        return;
    }
    //Declare sorted array
    let sortedArray = new Array();

    for (let i = 0; i < numbers.length; i++) {

        //If at any point, the user decides to reshuffle, stop visualisation immediately
        if (isShuffle) {
            break;
        }

        let ogBar = numbers[i];
        let ogBarHeight = parseInt(removePx(numbers[i].style.height));

        sortedArray[countArray[ogBarHeight] - 1] = ogBar;
        countArray[ogBarHeight]--;

    }

    //If at any point, the user decides to reshuffle, stop visualisation immediately
    if (isShuffle) {
        isShuffle = false;

        //Done sorting, allow for a new sort
        inProgress = false;
        return;
    }

    //Vertical bars array is now sorted
    numbers = sortedArray;

    //Create a variable to hold the container
    let parentDiv = document.getElementsByClassName("container")[0];

    //Sort vertical bars in container
    for (let i = 0; i < numbers.length; i++) {

        //If at any point, the user decides to reshuffle, stop visualisation immediately
        if (isShuffle) {
            break;
        }

        try {
            //Allow for visualization
            await sleep(time);
        } catch (err) {
            //Ignore error
        }
        //Changes bar location
        parentDiv.insertBefore(numbers[i], parentDiv.children[i])
    }

    //Done sorting, allow for a new sort
    inProgress = false;
}




//Swap height, marginTop, color between two element at passed array indices
async function swap(index1, index2) {
    //If at any point, the user decides to reshuffle, stop visualisation immediately
    if (isShuffle) {
        return;
    }

    //Swap heights of bars
    let tempH = numbers[index1].style.height;
    numbers[index1].style.height = numbers[index2].style.height;
    numbers[index2].style.height = tempH;

    //Swap MarginTop difference of bars
    //Note MarginTop difference to is make sure that the bars are aligned with the bottom of the container
    let tempM = numbers[index1].style.marginTop;
    numbers[index1].style.marginTop = numbers[index2].style.marginTop;
    numbers[index2].style.marginTop = tempM;

    //Swap colors of bars
    let tempC = numbers[index1].style.backgroundColor;
    numbers[index1].style.backgroundColor = numbers[index2].style.backgroundColor;
    numbers[index2].style.backgroundColor = tempC;

}

//This function retrieves the heighest bar among all bars and return its height as a number
function getMaxHeight() {
    let maxIndex = 0;

    for (let i = 1; i < numbers.length; i++) {
        let maxHeight = parseInt(removePx(numbers[maxIndex].style.height));
        let currentHeight = parseInt(removePx(numbers[i].style.height));
        if (maxHeight < currentHeight) {
            maxIndex = i;
        }
    }
    return parseInt(removePx(numbers[maxIndex].style.height));
}
//end