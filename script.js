// Accessing screen!
let display = document.getElementById('screen-side');
display.textContent = 0;
let currentInput = "";

// Accessing buttons!
let reset = document.getElementById('reset-btn');
let backspace = document.getElementById('back-btn');
let equals = document.getElementById('eq-btn');

let nums = document.querySelectorAll('.num-btn');
let point = document.getElementById('numPoint');
let operators = document.querySelectorAll('.op-btn');

// Operations!
nums.forEach(button => {
    button.addEventListener('click', () => {
        if(button.textContent == point.textContent && currentInput == "") {
            currentInput += "0."
            display.textContent = currentInput;
        }
        currentInput += button.textContent;
        display.textContent = currentInput;
    });
});

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
    display.textContent = 0;
})

// Backspace!
backspace.addEventListener('click', () => {
    if(currentInput.length > 0) {
        currentInput = currentInput.slice(0,-1);
        display.textContent = currentInput || "0";
    }
    else {
        display.textContent = "0";
    }
})