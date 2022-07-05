const arrSizer = document.getElementById("arr-size");
const sort_container = document.getElementById("sorting-area");
const element_container = document.getElementById('elements');
const bubbleBtn = document.getElementById("bubble");
const selectBtn = document.getElementById("selection");
const insertionBtn = document.getElementById("insertion");
const gen_array = document.getElementById("gen-array");
const sorting_speed = document.getElementById("speed");
const quick_btn = document.getElementById("quick");
let raw_data = createArrayElements(50);
let elements = create_divs(50, element_container, raw_data);
let quicksortAnimations = [];
let quicksortPivots = [];


/* Event Listeners*/

gen_array.addEventListener('click', ()=>{
    removeElements(element_container);
    raw_data = createArrayElements(arrSizer.value);
    elements = create_divs(arrSizer.value, element_container, raw_data);
});

bubbleBtn.addEventListener('click', ()=>{
    disable();
    const animations = bubbleSort(raw_data);
    console.log(animations)
    bubbleAnimation(animations,elements,speed.value)
    //bubbleAnimation(animations, elements,speed.value)
    //enable();
});
insertionBtn.addEventListener('click', ()=>{
    disable();
    const animations = insertionSort(raw_data);
    insertionSortAnimation(animations, elements, speed.value);
    //enable();
});

selectBtn.addEventListener('click', ()=>{
    disable();
    const animations = selectionSort(raw_data);
    selectionAnimation(animations, elements, speed.value);
   // enable();
});

quick_btn.addEventListener('click', ()=>{
    disable();
    const sorted = quicksort(raw_data, elements, speed.value);
    finish_quicksort_animations(sorted);
    quicksortAnimation2(quicksortAnimations, elements, speed.value);
    quicksortAnimations = [];
    quicksortPivots = [];
    //enable();
});


arrSizer.addEventListener('change', ()=>{
   // console.log(`The new value is ${arrSizer.value}`);
    removeElements(element_container);
    raw_data = createArrayElements(arrSizer.value);
    elements = create_divs(arrSizer.value, element_container, raw_data);
    //checkSort([20,25,19,27,55,32,39,45]);
});


 /* Helper functions*/

function create_divs(quantity, container, values){
    let viewportHeight = window.innerHeight;
    let viewportWidth = window.innerWidth;
    let width = 400;
    let div_elements = new Array();
    for(let i=0; i<values.length; i++){
        let new_div = document.createElement('div');
        new_div.setAttribute("id", values[i]);
        new_div.setAttribute("textContent", values[i]);
        new_div.setAttribute("class", "arr_el");
        new_div.style.width=`${width / quantity }px`;
        new_div.style.height=`${Math.round(values[i]/3)}px`;
        container.appendChild(new_div);
        div_elements.push(new_div);
    }
    return div_elements;
}
function disable(){
    buttons = document.getElementsByTagName('button');
    console.log(buttons)
    for(let i=0; i< buttons.length; i++){
        if(!(buttons[i].id === `gen-array`)){
            buttons[i].disabled = true;
        }
    }
}

function enable(){
    buttons = document.getElementsByTagName('button');
    for(let i=0; i< buttons.length; i++){
        buttons[i].disabled = false;
    }
}

//creates and returns an array of unique integers between 100 and 1000
 function createArrayElements(quantity){
    let array_elements = new Array();
    let unique_Set = new Set();
    while(unique_Set.size < quantity){unique_Set.add(Math.floor((Math.random()*1000)+300))}
    unique_Set.forEach(element => array_elements.push(element));
   // array_elements.forEach(element => console.log(element));

    return array_elements;
 }

 function removeElements(node){
    while(node.firstChild){
        node.removeChild(node.lastChild);
    }
 }
/* Sorting Algorithms*/


function bubbleSort(array){
    let modArray = array;
    let sorted = false;
    let count = 0;
    let animations = [];
    while(!sorted){
        sorted =true;
        for(let i=0; i< modArray.length-1-count; i++){
            const animation = {};
            animation.compare = [i,i+1];
            if(modArray[i] > modArray[i+1]){
                animation.swap = 1;
                let temp = modArray[i];
                modArray[i] = modArray[i+1];
                modArray[i+1] = temp;
                sorted = false;
            } else {
                animation.swap = -1;
            }
            animations.push(animation);
        }
        let final_animation = {};
        final_animation.finalPos = animations[animations.length - 1].compare[1];
        animations.push(final_animation);
        count++;
    }

    const final_1_animation = {};
    final_1_animation.finalPos = "0";
    animations.push(final_1_animation);

    for(let i=0; i < array.length; i++){
        const animation = {};
        animation.finalPos = i;
        animations.push(animation);
    }
    console.log(`animations size: ${animations.length}`);
    return animations
}

const selectionSort = function(array){
    let animations = [];
    let purples = [];
    console.log(array);
    for(let i=0; i<array.length;i++){
        const highlightSmallestred = {}
        highlightSmallestred.highlightRed = i;
        animations.push(highlightSmallestred);
        let smallest =i;
        for(let j=i+1; j<array.length;j++){
            const highlightcomparisonRed = {};
            highlightcomparisonRed.highlightRed = j;
            animations.push(highlightcomparisonRed);
            if(array[j] < array[smallest]){
                const unhighlightSmallest = {};
                unhighlightSmallest.highlightGreen = smallest;
                animations.push(unhighlightSmallest);
                smallest = j;
            } else {
                const unhighlightComparison = {};
                unhighlightComparison.highlightGreen = j;
                animations.push(unhighlightComparison);
            }
        }
        if(i!==smallest){
            const swapAnimation = {};
            const highlightEl = {};
            highlightEl.highlightRed = i;
            swapAnimation.swap = [i, smallest];
            animations.push(swapAnimation);
            let temp = array[i];
            array[i] = array[smallest];
            array[smallest] = temp;
        }
        
        const colorFinal = {};
        const unhighlightlastComaprison ={};
        colorFinal.highlightPurple = i;
        unhighlightlastComaprison.highlightGreen =smallest;
        animations.push(unhighlightlastComaprison);
        animations.push(colorFinal);
        purples.push(i)
        
        for(let i=0; i<array.length; i++){
            const purpeCheck = {};
            purpeCheck.highlightPurple = purples[i];
            animations.push(purpeCheck);
        }
        
    }
    console.log(animations);
    for(let i=0; i<array.length; i++){
        const finalChange = {};
        finalChange.highlightPurple = i;
        animations.push(finalChange);
    }
    return animations;
}

function insertionSort(array){
    let animations = [];

    for(let i=1; i <array.length; i++){
        j = i-1;
        let temp = array[i];
        let turn1Red = {};
        turn1Red.turnRed = i;
        animations.push(turn1Red);
        while(j >= 0 && array[j] > temp){
            let turn2Blue ={};
            turn2Blue.turnBlue = j;
            animations.push(turn2Blue);
            let swap = {};
            swap.swap = [j, j+1];
            animations.push(swap);
            array[j+1] = array[j];
            j--;
        }
        let turn1Purple = {};
        turn1Purple.turnPurple = j+1;
        animations.push(turn1Purple);
        array[j+1] = temp;
    }
    return animations;
}

 
//#####################################################################################################################
// Quick sort

function quicksort(raw_data, domElements, speed, start=0,end=raw_data.length-1){
    if(start <end){
        let pivotIdx = partition(raw_data, domElements, speed, start,end);
        quicksort(raw_data, domElements, speed, start, pivotIdx-1);
        quicksort(raw_data, domElements, speed, pivotIdx +1, end);
    }
    return raw_data;
}

//swaps elements (in raw data)
function swapQuick(raw_data,x,y){
    let temp = raw_data[x];
    raw_data[x] = raw_data[y];
    raw_data[y] = temp;
    
}

function swapElements(domElements,x,y){
    let domEl1 = domElements[x];
    let domEl2 = domElements[y];
    let temp = domEl1.style.height;
    
    domEl1.style.height = domEl2.style.height;
    domEl2.style.height = temp;
   
}

function partition(raw_data, domElementsPartition, speed, start=0, end=raw_data.length-1){
    let middle = Math.floor((start+end)/2);
   // let animations = [];

    let swapPivot = {}
    swapPivot.swap = [start, middle];
    quicksortAnimations.push(swapPivot);
    swapQuick(raw_data,start,middle);

    let turnPivotYellow = {};
    turnPivotYellow.turnYellow = start;
    quicksortAnimations.push(turnPivotYellow);
   
    let pivot = raw_data[start];
    let i= start +1;
    let j =end; 

    while(i<=j){
        while(raw_data[i] <=pivot){
            let turnComparisonBlue = {};
            turnComparisonBlue.turnBlue = i;
            quicksortAnimations.push(turnComparisonBlue);

            let turnElementibackgreen = {};
            turnElementibackgreen.turnGreen = i;
            quicksortAnimations.push(turnElementibackgreen);
            i++;
        }

        let turnComparisoniRed = {}
        turnComparisoniRed.turnRed = i;
        quicksortAnimations.push(turnComparisoniRed);

        while(raw_data[j] > pivot){
            let turnComparisonjBlue = {};
            turnComparisonjBlue.turnBlue = j;
            quicksortAnimations.push(turnComparisonjBlue);
            
            let turnElementjbackgreen = {};
            turnElementjbackgreen.turnGreen = j;
            quicksortAnimations.push(turnElementjbackgreen);
            j--;
        }

        let turnComparisonjRed = {}
        turnComparisonjRed.turnRed = j;
        quicksortAnimations.push(turnComparisonjRed);

        if(i<j){
            
            let swapElementHeights = {};
            swapElementHeights.swap = [i, j];
            quicksortAnimations.push(swapElementHeights);
            
            swapQuick(raw_data,i,j);
        }

        let turnSwappediGreen = {};
        turnSwappediGreen.turnGreen = i;
        quicksortAnimations.push(turnSwappediGreen);

        let turnSwappedjGreen = {};
        turnSwappedjGreen.turnGreen = j;
        quicksortAnimations.push(turnSwappedjGreen);
    }
        
        let swapStartBack = {}
        swapStartBack.swap = [start, j];
        quicksortAnimations.push(swapStartBack);

        let turnSortedPivotPurple = {};
        turnSortedPivotPurple.turnPurple = j;
        quicksortAnimations.push(turnSortedPivotPurple);

        let turnSwappedPivotGreen = {};
        turnSwappedPivotGreen.turnGreen = start;
        quicksortAnimations.push(turnSwappedPivotGreen);

        
        if(quicksortPivots.length  > 0){
            let sequence = [];
            if(quicksortPivots[quicksortPivots.length - 1] > j ){
                console.log(`direction is --->`);
                console.log(`checking from ${j} to ${quicksortPivots[quicksortPivots.length - 1]}`)
                for(let i= 0; i <= j; i++){
                    console.log(`doing stuff`);
                    if(raw_data[i] <= raw_data[i+1]){
                        sequence.push(1);
                    }else {
                        sequence.push(0);
                    }
                }
            } else {
                console.log(`direction is <---`);
                for(let i= 0; i <= quicksortPivots[quicksortPivots.length - 1]; i++){
                    console.log(`doing stuff`);
                    if(raw_data[i] <= raw_data[i+1]){
                        sequence.push(1);
                    }else {
                        sequence.push(0);
                    }
                }
            }

            if(!sequence.includes(0)){
                for(let i=0; i <=  quicksortPivots[quicksortPivots.length - 1]; i++){
                    let turnSortedPurple = {};
                    turnSortedPurple.turnPurple = i;
                    quicksortAnimations.push(turnSortedPurple);
                }
            } 
            console.log(sequence);
        } else {
            console.log(`direction is <---`)
        }

        /*

        */
        
        
        let count = 0;
        let purples = [];
        for(key in quicksortAnimations){
            if(quicksortAnimations[key].turnPurple){
                count++;
                purples.push(quicksortAnimations[key].turnPurple);
            }
        }
        console.log(count)
        console.log(purples)

        quicksortPivots.push(j);
        swapQuick(raw_data,start,j);
    //quicksortAnimation2(animations, domElementsPartition, speed)

    return j;
}



function quicksortAnimation2(animations, domElements, speed){
    console.log(animations);
    let milliseconds =0;
    for(let i=0; i < animations.length; i++){
        

        if(animations[i].hasOwnProperty('turnYellow')){
            const highlightYellowElement = domElements[animations[i].turnYellow];
            setTimeout(()=>{
                try{
                console.log(speed);
                //1.)highlight an element Yellow
                highlightYellowElement.style.backgroundColor = "#FFEA00";
                }catch(e){}
            }, (i+1) * (200/speed));
       
        } else if(animations[i].hasOwnProperty('turnBlue')){
            const highlightBlueElement = domElements[animations[i].turnBlue];
            setTimeout(()=>{
                try{
                //1.)highlight an element Blue
                highlightBlueElement.style.backgroundColor = "#0000D1";
                }catch(e){}
            }, (i+2) * (200/speed));
       
        } else if(animations[i].hasOwnProperty('turnGreen')){
            const highlightGreenElement = domElements[animations[i].turnGreen];
            setTimeout(()=>{
                try{
                //1.)highlight an element Green
                highlightGreenElement.style.backgroundColor = "#00ff2b";
                }catch(e){}
            }, (i+3) * (200/speed));
           /*
        } else if(animations[i].hasOwnProperty('turnRed')){
            const highlightRedElement = domElements[animations[i].turnRed];
            setTimeout(()=>{
                try{
                //1.)highlight an element Red
                highlightRedElement.style.backgroundColor = "red";
                }catch(e){}
            }, (i+3) * (100/speed));
           */
        } else if(animations[i].hasOwnProperty('turnPurple')){
            setTimeout(()=>{
                try{
                const pivot = domElements[animations[i].turnPurple];
                pivot.style.backgroundColor = "purple";
                }catch(e){}
            },(i+4) *(200/speed)); 
        }
       
        if(animations[i].hasOwnProperty('swap')){   
            //swap
            const domEl1 = domElements[animations[i].swap[0]];
            const domEl2 = domElements[animations[i].swap[1]];           
            setTimeout(()=>{
                try{
                    const temp = domEl1.style.height;
                    domEl1.style.height = domEl2.style.height;
                    domEl2.style.height = temp;
                }catch(e){}
            }, (i+5) * (200/speed));
        }
    }
}

function finish_quicksort_animations(sorted){
    for(let i= 0; i <= sorted.length; i++){
        let turnSortedPurple = {};
        turnSortedPurple.turnPurple = i;
        quicksortAnimations.push(turnSortedPurple);
    }
}




//#####################################################################################################################


function checkSort(array){
    let bubble = quicksort(array);
    let jsSort = array.sort(function(a, b){return a - b});
    if(bubble === jsSort) console.log("true");
    console.log(`my bubble: ${bubble}`);
}

 function bubbleAnimation(animations, elements, speed){

    for(let i=0; i<animations.length; i++){  

        setTimeout(()=>{
            try{
                elements[animations[i].compare[0]].style.backgroundColor = "red";
                elements[animations[i].compare[1]].style.backgroundColor = "red";
             } catch(e){}  
        }, i * (50/speed));

        setTimeout(()=>{
            if(animations[i].swap===1){
                temp = elements[animations[i].compare[0]].style.height;
                elements[animations[i].compare[0]].style.height = elements[animations[i].compare[1]].style.height;
                elements[animations[i].compare[1]].style.height = temp;
            }
        }, (i+1) * (50/speed));
        
        setTimeout(()=>{
            try{
                elements[animations[i].compare[0]].style.backgroundColor = "#00ff2b";
                elements[animations[i].compare[1]].style.backgroundColor = "#00ff2b";
            } catch(e){}
        }, (i+2) * (50/speed));

        if(animations[i].finalPos){
            setTimeout(()=>{
                try{
                   // console.log(animations[i].finalPos)
                    elements[animations[i].finalPos].style.backgroundColor = "#702963";
                }catch(e){}
            }, (i+3) * (50/speed));
        }
    }
}

function finish_purples(){
    for(let i=0; i<elements.length; i++){
        console.log(i)
        console.log(elements[i]);
        elements[i].style.backgroundColor = "purple";
    }
}

 function selectionAnimation(animations, elements, speed){
    for(let i=0; i<animations.length; i++){
        //compare
        if(animations[i].hasOwnProperty('highlightRed')){
            const highlightredElement = elements[animations[i].highlightRed];
            setTimeout(()=>{
                try{
                //1.)highlight an element red
                    highlightredElement.style.backgroundColor = "red";
                }catch{}
            }, (i+2) * (50/speed));

        } else if(animations[i].hasOwnProperty('highlightGreen')){
            const highlightgreenElement = elements[animations[i].highlightGreen];
            setTimeout(()=>{
                //2.)highlight an element green
                try{
                    highlightgreenElement.style.backgroundColor = "#00ff2b";
                }catch{}
            }, (i+3) * (50/speed));

        }else if(animations[i].hasOwnProperty('swap')){   
        //swap
            try{
                const domEl1 = elements[animations[i].swap[0]];
                const domEl2 = elements[animations[i].swap[1]];           
                setTimeout(()=>{
                        const temp = domEl1.style.height;
                        domEl1.style.height = domEl2.style.height;
                        domEl2.style.height = temp;
                
                }, (i+4)* (50/speed));
        }catch{}
        } else if (animations[i].hasOwnProperty('highlightPurple')){
            setTimeout(()=>{
                try{
                    const highlightPurple = elements[animations[i].highlightPurple];
                    highlightPurple.style.backgroundColor = "purple";
                }catch{}
            }, i * (50/speed));
        }
    }
    console.log(`Animations length: ${animations.length}`);
 }

 function insertionSortAnimation(animations, elements, speed){
     
    // turnRed, turnBlue, turnPurple
    
    for(i=0;i<animations.length; i++){
        if(animations[i].hasOwnProperty('turnRed')){
            let domEl = elements[animations[i].turnRed];
            setTimeout(()=>{
                domEl.style.backgroundColor = 'red';
                console.log("Turning red")
        }, (i+2)* (40/speed));
         } else if(animations[i].hasOwnProperty('turnBlue')){
            let domEl = elements[animations[i].turnBlue];
            setTimeout(()=>{
                domEl.style.backgroundColor = 'blue';
        }, (i+2)* (40/speed));
         } else if(animations[i].hasOwnProperty('swap')){
            const domEl1 = elements[animations[i].swap[0]];
            const domEl2 = elements[animations[i].swap[1]];           
            setTimeout(()=>{
                    const tempHeight = domEl1.style.height;
                    const tempCol = domEl1.backgroundColor;
                    domEl1.style.height = domEl2.style.height;
                    domEl1.style.backgroundColor= domEl2.style.backgroundColor;
                    domEl2.style.height = tempHeight;
                    domEl2.style.backgroundColor = 'purple';
            }, (i+3)* (40/speed));
         } else if(animations[i].hasOwnProperty('turnPurple')){
            let domEl = elements[animations[i].turnPurple];
            setTimeout(()=>{
                domEl.style.backgroundColor = 'purple';
        }, (i+4)* (40/speed));
         }
     }
    console.log(`The animations are:`);
    console.log(animations)
 }
 