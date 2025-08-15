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
nums.forEach(button => {
    button.addEventListener('click', () => {
        value = button.textContent;
        let lastChar = currentInput[currentInput.length - 1];

        // Case 1 : If last character entered is a point, then consecutively there should not be a point again.
        if(lastChar == '.' && value == '.') {
            // Do nothing
        }
        // Case 2 : If the cal is at a default state or is just after an operator, then on entering point, it should print 0. with it, not just point.
        else if(((display.textContent == "0" && currentInput == "") && value == '.') || ["%", "/", "*", "+", "-"].includes(lastChar)) {
            currentInput += "0.";
            display.textContent = currentInput;
        }
        // Case 3 : Between 2 operators, there should not be 2 points anywhere, only single point is allowed.
        // else if() {
        //     currentInput += value;
        //     display.textContent = currentInput;
        // }
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
equals.addEventListener('click', () => {
    
});