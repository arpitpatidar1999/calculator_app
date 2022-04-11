let runningTotal=0;
let buffer= "0";
let previousOperator;
const screen = document.querySelector(".screen");

function buttonClick(value){               // buttonclick is an inbuilt function which takes in value of the button
    if(isNaN(parseInt(value))){           // converting a string to a number using parseInt and checkin if it is NaN(not a number)
        handelSymbol(value);
    }
    else{
         handelNumber(value);
    }
    rerender();
}

function handelNumber(value){
    if(buffer==="0"){
        buffer=value;                  //giving buffer a value to change output on the display on button click
    }
    else{
        buffer+=value;
    }
}

function handleMath(value){
    if(buffer==="0"){
       return;                             //do nothing
    }

    const intBuffer = parseInt(buffer);  //defined new variable to store the buffer value to make calculations
    if(runningTotal===0){
        runningTotal=intBuffer;
    }
    else{
        flushOperation(intBuffer);
    }

    previousOperator= value;

    buffer="0";
}

function flushOperation(intBuffer){
    if(previousOperator==="+"){
        runningTotal+=intBuffer;
    }
    else if(previousOperator==="-"){
        runningTotal-=intBuffer;
    }
    else if(previousOperator==="×"){
        runningTotal*=intBuffer;
    }
    else{
        runningTotal/=intBuffer;
    }
}

function handelSymbol(value){
    switch(value){
        case "AC":
            buffer="0"
            runningTotal=0;
            break;
        case "=":
            if(previousOperator===null){
                return;                                          //need two numbers to do the mathematical calculations
            }
            flushOperation(parseInt(buffer));
            previousOperator=null;
            buffer=+runningTotal;
            runningTotal=0;
            break;
        case "DEL":
            if(buffer.length===1){
                buffer="0";
            }
            else{
                buffer=buffer.substring(0,buffer.length-1);
            }
        case "+":
        case "-":
        case "×":
        case "÷":
            handleMath(value);
            break;
    }
}

function rerender(){
    screen.innerText =buffer;
}

function init(){
    document.querySelector(".allButtons").addEventListener("click",function(event){
        buttonClick(event.target.innerText);
    });   
}

init();