// Calculator functionality
let display = document.getElementById('result');

// Append value to display
function append(value) {
    display.value += value;
}

// Clear display
function clearDisplay() {
    display.value = '';
}

// Delete last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Calculate result
function calculate() {
    try {
        // Replace × with * for calculation
        let expression = display.value.replace(/×/g, '*');
        
        // Handle percentage
        expression = expression.replace(/(\d+(\.\d+)?)%/g, (match, p1) => p1 / 100);
        
        // Evaluate safely
        if (expression.trim() === '') return;
        
        // Use Function constructor for safe evaluation
        const result = new Function('return ' + expression)();
        
        // Check if result is valid
        if (isNaN(result) || !isFinite(result)) {
            display.value = 'Error';
            setTimeout(() => clearDisplay(), 1500);
        } else {
            display.value = result.toString().slice(0, 12); // Limit decimal places
        }
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => clearDisplay(), 1500);
    }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Numbers and operators
    if (/[\d\+\-\*\/\.\%]/.test(key)) {
        event.preventDefault();
        append(key === '*' ? '×' : key);
    }
    
    // Enter key for equals
    else if (key === 'Enter') {
        event.preventDefault();
        calculate();
    }
    
    // Escape key for clear
    else if (key === 'Escape') {
        event.preventDefault();
        clearDisplay();
    }
    
    // Backspace for delete
    else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }
});

// Prevent default behavior for calculator buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            e.preventDefault();
        }
    });
});

// Initialize
clearDisplay();