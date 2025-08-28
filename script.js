// Accessing screen!
let display = document.querySelector('.calculations');
display.textContent = "0";
let currentInput = "";

// Accessing buttons!
let reset = document.getElementById('reset-btn'); // "document.getElementById('reset-btn');" this part of code has returned a matched the HTML element.
let backspace = document.getElementById('back-btn'); // "document.getElementById('back-btn');" this part of code has returned a matched part HTML element.
let equals = document.getElementById('eq-btn'); // "document.getElementById('eq-btn');" this part of code has returned a matched part HTML element.

let nums = document.querySelectorAll('.num-btn'); // "document.querySelectorAll('.num-btn');" this part of code has returned an array of matched HTML elements.
let point = document.getElementById('numPoint'); // "document.getElementById('numPoint');" this part of code has returned a matched HTML element.
let operators = document.querySelectorAll('.op-btn'); // "document.querySelectorAll('.num-btn');" this part of code has returned an array of matched HTML elements.

// Scrolling towards the right edge
function scrollToRightEdge() {
    display.scrollLeft = display.scrollWidth;
}

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
            scrollToRightEdge();
        }
        else {
            currentInput += value;
            display.textContent = currentInput;
            scrollToRightEdge();
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
            scrollToRightEdge();
        }
        else if(lastChar == '.') {
            currentInput += '0' + newOp;
            display.textContent = currentInput;
            scrollToRightEdge();
        }
        else if(currentInput == "" || display.textContent == 0) {
            display.textContent = 0;
            scrollToRightEdge();
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
    scrollToRightEdge();
})

// Backspace!
backspace.addEventListener('click', () => {
    if(currentInput.length > 0) {
        currentInput = currentInput.slice(0,-1);
        display.textContent = currentInput || "0";
        scrollToRightEdge();
    }
    else {
        display.textContent = "0";
        scrollToRightEdge();
        currentInput = "";
    }
})

// Equals!
function tokenize(input) {
    let tokens = [];
    let numBuffer = "";

    for(let char of input) {
        if("1234567890.".includes(char)) {
            numBuffer += char;
        }
        else {
            if(numBuffer) {
                tokens.push(numBuffer);
                numBuffer = "";
            }
            tokens.push(char);
        }
    }
    if(numBuffer) tokens.push(numBuffer);
    return tokens;
}

function infixToPostfix(tokens) {
    const precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        '%': 2
    };

    const output = [];
    const operators = [];

    tokens.forEach(token => {
        if (!isNaN(token)) {
            output.push(token);
        } else if ("+-*/%".includes(token)) {
            while (operators.length && precedence[operators[operators.length - 1]] >= precedence[token]) {
                output.push(operators.pop());
            }
            operators.push(token);
        }
    });

    while (operators.length) {
        output.push(operators.pop());
    }

    return output;
}

function evaluatePostfix(postfixTokens) {
    const stack = [];

    postfixTokens.forEach(token => {
        if (!isNaN(token)) {
            stack.push(parseFloat(token));
        } else {
            let b = stack.pop();
            let a = stack.pop();
            switch (token) {
                case '+': stack.push(a + b); break;
                case '-': stack.push(a - b); break;
                case '*': stack.push(a * b); break;
                case '/': stack.push(a / b); break;
                case '%': stack.push(a % b); break;
            }
        }
    });

    return stack[0];
}

function evaluation(currentInput) {
    try {
        const tokens = tokenize(currentInput);
        const postfix = infixToPostfix(tokens);
        const result = evaluatePostfix(postfix);
        display.textContent = result;
        scrollToRightEdge();
        currentInput = result.toString(); // allow chaining like 5 + 2 = 7 + 3
    } catch (error) {
        display.textContent = "Error";
        scrollToRightEdge();
        currentInput = "";
    }
}

equals.addEventListener('click', () => evaluation(currentInput));