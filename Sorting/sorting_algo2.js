/*
 * Author: Mounceph Morssaoui
 * Github: Mounceph99
 * Created on: May 28, 2020
 * Last Modified: June 2, 2020
 * 
 * Description:
 *   Second half of sorting algorithms and its helper functions
 *   This file takes care of: Heap, Quick and Merge Sort.
 *   Helper functions: heapify(), quick(), partition(low,high), merge(),getHeight()
 */


//*Max heap*
//This function sorts according to Heap sort the vertical boxes from lowest to heighest
//Heap sort is similar to selection sort, where we first find the maximum and place it 
//at the end. But first the input data is made into a heap, (using heapify()). Once
//done, at the top of the heap will be the largest element, therefore we place it at the end
//by swapping it with the last item of the heap. Heapify() the root and repeat the previous steps.
//Continously does so until all is sorted.
//This function is async to visualize the process
async function heap() {

    //Store length of array
    let arrLength = numbers.length;

    //Only need to heapify the first of the input data
    for (let i = (arrLength / 2) - 1; i >= 0; i--) {
        //If at any point, the user decides to reshuffle, stop visualisation immediately
        if (isShuffle) {
            break;
        }

        try {
            //Follows next swapping bar and tracks it with a white bar for user to follow easily
            let tempColorWhite = numbers[i].style.backgroundColor;
            numbers[i].style.backgroundColor = "rgb(255,255,255)";
            //Allows for visualization
            await sleep(time);
            //Change back the color of current bar
            numbers[i].style.backgroundColor = tempColorWhite;
        } catch (e) {
            //Ignore error
        }
        //Make the input data or vertical bar into a heap
        heapify(arrLength, i);
        
    }

    //If at any point, the user decides to reshuffle, stop visualisation immediately
    if (isShuffle) {
        isShuffle = false;

        //Done sorting, allow for a new sort
        inProgress = false;
        return;
    }

    //Start heap sort
    for (let i = (arrLength - 1); i > 0; i--) {
        //If at any point, the user decides to reshuffle, stop visualisation immediately
        if (isShuffle) {
            break;
        }
        //Follows next swapping bar and tracks it with a green bar for user to follow easily
        let tempColorGreen = numbers[0].style.backgroundColor;
        numbers[0].style.backgroundColor = "rgb(0,255,0)";

        //Put current heap's largest value at the end.
        //Note the largest is at 0, and the size of heap is from 0-i
        swap(i, 0);
        
        try {
            //Allows for visualization
            await sleep(time);
        } catch (e) {

        }
        //Change back the color of current bar
        numbers[i].style.backgroundColor = tempColorGreen;

        //Make sure the heap still follows heap conditions
        heapify(i, 0)
    }
    
    //Done sorting, allow for a new sort
    inProgress = false;
}


//This helper function for the heap sort. Heapify will take an index from input data
//and place it accordingly according to heap rule.
function heapify(sizeHeap, i) {

    //If at any point, the user decides to reshuffle, stop visualisation immediately
    if (isShuffle) {
        return;
    }

    //Store variable for left, right and largest index
     //Note the array is somewhat converted into a binary structure
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    let largest = i;

    //Left child is bigger, change largest index to left index
    if ((left < sizeHeap) && parseInt(removePx(numbers[left].style.height)) > parseInt(removePx(numbers[largest].style.height))) {
        largest = left;
    }

    //Right child is bigger, change largest index to right index
    if ((right < sizeHeap) && parseInt(removePx(numbers[right].style.height)) > parseInt(removePx(numbers[largest].style.height))) {
        largest = right;
    }

    //If the initial largest index has change to one if its child, heapify again
    //from new largest index and swap the parent with the larger child
    if (largest != i) {
        swap(i, largest);
        heapify(sizeHeap, largest);
    }
    
}

//This function sorts according to Quick sort the vertical boxes from lowest to heighest
//Quick sort is a divide and conquer algorithm. It picks a pivot, in this implemention
//it will always the last element of the sub-array, and partitions the passed array relative 
//to pivot. The target of partitions is given an array and a pivot, put the pivot to its corrected
//position in the sorted array. Put all smaller elements before pivot, all bigger elements 
//after pivot. Continously does so until all is sorted.
//This function is async to visualize the process
async function quick() {

    //Start quickSort with both extremeties of array
    await quickSort(0, numbers.length-1);

    //Done sorting, allow for a new sort
    inProgress = false;
}

//Explain by function quick()
//Note function is recursive, it will divide the array until it can no longer
async function quickSort(low, high) {
    if (low < high) { 
        //Choose pivot
        pivot = await partition(low, high);  

        //Quicksort on both side of the pivot
        await quickSort(low, pivot - 1);
        await quickSort(pivot + 1, high);          
    }
}

//This function does the partioning for the quicksort. It takes the lower bound
//upper bound. This function does the sorting with a partition. his function takes
//last element as pivot, places the pivot element at its correct position in sorted
//array, and places all smaller(smaller than pivot) to left of pivot and all greater
//elements to right of pivot
async function partition(low, high) {

    let index = low - 1;
    //Store the height of pivot
    let pivotValue = parseInt(removePx(numbers[high].style.height));
    
    //Follows next swapping bar and tracks it with a green bar for user to follow easily
    let tempColorGreen = numbers[high].style.backgroundColor;
    numbers[high].style.backgroundColor = "rgb(0,255,0)";

    for (let i = low; i < high; i++) {
        //If at any point, the user decides to reshuffle, stop visualisation immediately
        if (isShuffle) {
            //Change back the color of current bar
            numbers[high].style.backgroundColor = tempColorGreen;
            //Done sorting, allow for a new sort
            inProgress = false;
            return;
        }
        //If current index height is smaller then pivot's height, then swap the
        //current value with the lower bound
        if (parseInt(removePx(numbers[i].style.height)) < pivotValue) {
            //Increment index of smaller element
            index++;
            //Follows next swapping bar and tracks it with a black bar for user to follow easily
            let tempColorBlack = numbers[index].style.backgroundColor;
            numbers[index].style.backgroundColor = "rgb(0,0,0)";
            //Allows for visualization
            await sleep(time);
            
            await swap(index, i)
            //Change back the color of current bar;
            numbers[i].style.backgroundColor = tempColorBlack;
        }
    }
    //Change back the color of current bar
    numbers[high].style.backgroundColor = tempColorGreen;

    //If at any point, the user decides to reshuffle, stop visualisation immediately
    if (isShuffle) {    
        //Done sorting, allow for a new sort
        inProgress = false;
        return;
    }
    
    //Follows next swapping bar and tracks it with a white bar for user to follow easily
    let tempColorWhite = numbers[index+1].style.backgroundColor;
    numbers[index + 1].style.backgroundColor = "rgb(255,255,255)";
    await sleep(time);
    await swap(index + 1, high);
    //Change back the color of current bar
    numbers[high].style.backgroundColor = tempColorWhite;
    return (index + 1);

}

//This function sorts according to Merge sort the vertical boxes from lowest to heighest
//Merge sort is a divide and conquer algorithm. It divides the input array and calls itseld into 
//two more halves. This repeats until the sub-array is of size 1. From there, it goes back
//merging the halves while sorting themselves.
//This function is async to visualize the process
async function merge() {
    //Create a shallow copy of vertical bars array
    var tempM = numbers;
    //Start merge sort
    await mergeSort(tempM);
    //Done sorting, allow for a new sort
    inProgress = false;
}

//This function does the actual merge sort.
async function mergeSort(arr) {
    //Makes sure that the array is greater than 1, because an array of size one cannot be divide
    if (arr.length > 1) {
        //Declare middle index
        let middle = Math.floor(arr.length / 2);
        //Declare left and right side of array
        let left = new Array();
        let right = new Array();

        //Fill up the left array with the values on the left of the  amin array
        for (let i = 0; i < middle;i++) {
            left[i] = arr[i];
            //If at any point, the user decides to reshuffle, stop visualisation immediately
            if (isShuffle) {
                return;
            }
        }
        //Fill up the right array with the values on the right of the main array
        for (let i = middle; i < arr.length; i++) {
            right.push(arr[i]);
            //If at any point, the user decides to reshuffle, stop visualisation immediately
            if (isShuffle) {
                return;
            }
        }

        //Recurse of the left and right arrays
        await mergeSort(left);
        await mergeSort(right);

        //Declare indices that will keep track of the left, right, and main array
        //respectively
        let leftTracker = 0, rightTracker = 0, mainTracker = 0;

        //If either left or right tracker exceed, the array length, leave loop
        //Else if store the lowest value between left and right array in main array
        while (leftTracker < left.length && rightTracker < right.length) {
            if (await getHeight(left[leftTracker]) < await getHeight(right[rightTracker])) {
                arr[mainTracker] = left[leftTracker];
                //Update tracker
                leftTracker++;
            } else {
                arr[mainTracker] = right[rightTracker];
                //Update tracker
                rightTracker++;
            }
            //Update tracker
            mainTracker++;
            //If at any point, the user decides to reshuffle, stop visualisation immediately
            if (isShuffle) {
                return;
            }
        }

        //If in the first while loop, the right exceeded
        //Finish with the left, and transfer the rest to main array
        while (leftTracker<left.length) {
            arr[mainTracker] = left[leftTracker];
            //Update trackers
            leftTracker++;
            mainTracker++;
            //If at any point, the user decides to reshuffle, stop visualisation immediately
            if (isShuffle) {
                return;
            }
        }

        //If in the first while loop, the left exceeded
        //Finish with the right, and transfer the rest to main array
        while (rightTracker < right.length) {
            arr[mainTracker] = right[rightTracker];
            //Update trackers
            rightTracker++;
            mainTracker++;
            //If at any point, the user decides to reshuffle, stop visualisation immediately
            if (isShuffle) {
                return;
            }
        }
        //Create a variable to hold the container
        let parentDiv = document.getElementsByClassName("container")[0];

        //Sort the left side and update the bars display
        for (let r = 0; r < left.length; r++) {
            //If at any point, the user decides to reshuffle, stop visualisation immediately
            if (isShuffle) {
                return;
            }    
            parentDiv.insertBefore(arr[r], parentDiv.children[r])
        }
        //Sort the right side and update the bars display
        for (let r = middle; r < arr.length; r++) {
            //If at any point, the user decides to reshuffle, stop visualisation immediately
            if (isShuffle) {
                return;
            }    
            parentDiv.insertBefore(arr[r], parentDiv.children[r])  
        }
        //Allows for visualisation
        try {
            await sleep(time);
        } catch (err) {
            //Ignore error
        }
        
    }
}

//This function returns the height of a div element as a number
async function getHeight(divElement) {
    return parseInt(removePx(divElement.style.height));
}