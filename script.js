// Accessing screen!
let display = document.getElementById('screen-side');
display.textContent = "0";
let currentInput = "";

// Accessing buttons!
let reset = document.getElementById('reset-btn');
let backspace = document.getElementById('back-btn');
let equals = document.getElementById('eq-btn');

let nums = document.querySelectorAll('.num-btn');
let point = document.getElementById('numPoint');
let operators = document.querySelectorAll('.op-btn');

// Numericals!
function getCurrentNumber(input) {
    let operators = ['%', '*', '+', '-', '/'];
    let lastOpIndex = -1;

    operators.forEach(op => {
        let index = input.lastIndexOf(op);
        if(index > lastOpIndex) lastOpIndex = index;
    })

    return input.slice(lastOpIndex + 1);
}

nums.forEach(button => {
    button.addEventListener('click', () => {
        value = button.textContent;
        let lastChar = currentInput[currentInput.length - 1];

        if(value == '.') {
            let currentNum = getCurrentNumber(currentInput);

            if((display.textContent == "0" && currentInput == "") || (["%", "/", "*", "+", "-"].includes(lastChar))) {
                currentInput += "0.";
            }
            else if(!currentNum.includes('.')) {
                currentInput += value;
            }
            display.textContent = currentInput;
        }
        else {
            currentInput += value;
            display.textContent = currentInput;
        }
    });
});

// Operations!
operators.forEach(button => {
    button.addEventListener('click', () => {
        let newOp = button.textContent;
        let lastChar = currentInput[currentInput.length - 1];
        if (["%", "/", "*", "+", "-"].includes(lastChar)) {
            currentInput = currentInput.slice(0, -1) + newOp;
            display.textContent = currentInput;
        }
        else if(currentInput == "" || display.textContent == 0) {
            display.textContent = 0;
        }
        else {
            currentInput += newOp;
            display.textContent = currentInput;
        }
    });
});

// Reset!
reset.addEventListener('click', () => {
    currentInput = "";
    display.textContent = "0";
})

// Backspace!
backspace.addEventListener('click', () => {
    if(currentInput.length > 0) {
        currentInput = currentInput.slice(0,-1);
        display.textContent = currentInput || "0";
    }
    else {
        display.textContent = "0";
        currentInput = "";
    }
})

// Equals!
function evaluate(input) {
    let nums = [];
    let ops = [];

    let i = 0;
    while(i < input.length) {
        let numStr = "";

        while((input[i] >= 0 && input[i] <= 9) || input[i] == '.') {
            numStr += input[i];
            i++;
        }

        if(numStr !== "") {
            nums.push(Number(numStr));
        }

        if(i < input.length && ["%", "/", "*", "+", "-"].includes(input[i])) {
            ops.push(input[i]);
            i++;
        }
    }
    
    
}

equals.addEventListener('click', () => evaluate(currentInput));