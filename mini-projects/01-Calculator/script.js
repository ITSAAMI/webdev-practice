// Display ke liye variable jo calculator ke screen ko represent karta hai
let display = document.getElementById('display');

// Abhi user nay jo number likha hai
let currentInput = '0';

// Pehlay wala number jo operation karne se pehlay store kiya gaya
let previousInput = '';

// Konsa operator (+ - * /) use ho raha hai
let operator = null;

// Yeh flag batata hai ke display ko reset karna hai ya nahi
let shouldResetDisplay = false;

// Display ko update karne ka function
function updateDisplay() {
    display.value = currentInput;
}

// Number ko display mein add karne ka function
function appendNumber(num) {
    // Agar display ko reset karna hai to naya number likhna shuru karo
    if (shouldResetDisplay) {
        currentInput = num;
        shouldResetDisplay = false;
    } else {
        // Agar pehlay se 0 hai to use replace karo, warna add karo
        currentInput = currentInput === '0' ? num : currentInput + num;
    }
    updateDisplay();
}

// Operator button click hone par ye function chalega
function appendOperator(op) {
    // Agar pehlay se operation pending hai aur display reset nahi hua to calculate karo
    if (operator !== null && !shouldResetDisplay) {
        calculate();
    }
    // Abhi ke number ko previous mein save karo
    previousInput = currentInput;
    // Konsa operator select huya ye save karo
    operator = op;
    // Next number ke liye display reset karne ke liye flag set karo
    shouldResetDisplay = true;
}

// Decimal point (.) ko add karne ka function
function appendDecimal() {
    if (shouldResetDisplay) {
        currentInput = '0.';
        shouldResetDisplay = false;
    } else if (!currentInput.includes('.')) {
        // Agar pehlay se decimal nahi hai to add karo
        currentInput += '.';
    }
    updateDisplay();
}

// Aakhri digit ko delete karne ka function
function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

// Calculation karne ka main function
function calculate() {
    // Agar operator nahi hai ya display reset hua hai to calculation nahi hogi
    if (operator === null || shouldResetDisplay) return;
    
    let result;
    // Previous number ko number mein convert karo
    const prev = parseFloat(previousInput);
    // Current number ko number mein convert karo
    const current = parseFloat(currentInput);
    
    // Konse operator ke alavas calculation karo
    switch(operator) {
        case '+':\n            result = prev + current;\n            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            // Agar zero se divide karne ki koshish karo to 0 show karo
            result = current !== 0 ? prev / current : 0;
            break;
        default:
            return;
    }
    
    // Result ko string mein convert kar ke display mein show karo
    currentInput = result.toString();
    // Ab ke liye operator aur previous input ko reset karo
    operator = null;
    // Next number ke liye display reset karne ke liye flag set karo
    shouldResetDisplay = true;\n    updateDisplay();\n}\n\n// Calculator ko reset karne ka function - sara kuch 0 par lao\nfunction clearDisplay() {\n    currentInput = '0';\n    previousInput = '';\n    operator = null;\n    shouldResetDisplay = false;\n    updateDisplay();\n}\n\n// Keyboard se input lene ke liye event listener\ndocument.addEventListener('keydown', (e) => {\n    // Agar 0-9 key press hui to number add karo\n    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);\n    // Agar dot press hui to decimal add karo\n    if (e.key === '.') appendDecimal();\n    // Agar + ya - press hui to operator add karo\n    if (e.key === '+' || e.key === '-') appendOperator(e.key);\n    // Agar * press hui to operator add karo (aur default action prevent karo)\n    if (e.key === '*') { e.preventDefault(); appendOperator('*'); }\n    // Agar / press hui to operator add karo (aur default action prevent karo)\n    if (e.key === '/') { e.preventDefault(); appendOperator('/'); }\n    // Agar Enter ya = press hui to calculate karo\n    if (e.key === 'Enter' || e.key === '=') { e.preventDefault(); calculate(); }\n    // Agar Backspace press hui to aakhri digit delete karo\n    if (e.key === 'Backspace') deleteLast();\n    // Agar Escape press hui to calculator reset karo\n    if (e.key === 'Escape') clearDisplay();\n});\n\n// Shuru mein display ko update karo\nupdateDisplay();"