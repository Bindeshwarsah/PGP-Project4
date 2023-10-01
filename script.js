document.addEventListener('DOMContentLoaded', function() {
     // Set the default input value to '0'
     document.getElementById('result').value = '0';

    let displayValue = 0;
    const buttons = document.querySelectorAll("input[type='button']");
    
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            const buttonValue = this.value;
            if (buttonValue === 'RESET') {
                resetDisplay();
            } else if (buttonValue === 'DEL') {
                deleteDisplay();
            } else if (buttonValue === '=') {
                calculateResult();
            } else {
                valueDisplay(buttonValue);
            }
        });
    }
    
    function resetDisplay() {
        displayValue = 0;
        document.getElementById('result').value = displayValue;
    }
    
    function valueDisplay(val) {
        let currentVal = document.getElementById("result").value;

        // Check if the input is valid when a mathematical sign is entered
        if (currentVal === "0" || currentVal === "ERROR") {
            if (val === '-' || val === '.' ||val.match(/[1-9]/)) {
                document.getElementById("result").value = val;
            }
        } else {
            if (currentVal === '' && (val === 'x' || val === '/' || val === '+' || val === '%')) {
                return; // Do not add operation signs at the beginning
            }
            else if (currentVal.endsWith('=') && val.match(/[0-9.]/)) {
                // If the input doesn't contain an operator and the pressed value is a number or dot, clear and set the input to the pressed value
                document.getElementById("result").value = val;
            } 
            else if (currentVal.endsWith('=') && !val.match(/[0-9.]/)) {
                // If the input ends with '=' and the pressed value is not a number or dot, do nothing
                return;
            }  
            else if (val.match(/[-.]/) && currentVal.match(/[-.]$/)) {
                // If an operator is pressed and the current input ends with an operator, replace the existing operator with the new one
                document.getElementById("result").value = currentVal.slice(0, -1) + val;
            } 
            else if ((val === 'x' || val === '/' || val === '+' || val === '%') && currentVal.match(/[x/+-.]$/)) {
                // Prevent entering multiple operators consecutively
                return;
            }
    
             else {
                document.getElementById("result").value += val;
            }
        }
        
    }
    function deleteDisplay() {
        let currentVal = document.getElementById("result").value;
    
        if (currentVal === "ERROR") {
            // If the input is displaying an error, reset it to '0'
            document.getElementById("result").value = "0";
        } else {
            if (currentVal.length === 1) {
                // If the current value is a single digit, set it to '0'
                document.getElementById("result").value = "0";
            } else {
                // Remove the last character from the input
                document.getElementById("result").value = currentVal.slice(0, -1);
            }
        }
    }

    function calculateResult() {
        let x = document.getElementById("result").value;
        // Replace 'x' with '*' for evaluation
        x = x.replace(/x/g, '*');
        try {
            let y = eval(x);
            if (Number.isNaN(y)) {
                document.getElementById("result").value = "ERROR";
            } else {
                // Round the result to three decimal places
                const roundedResult = parseFloat(y.toFixed(3));
                document.getElementById("result").value = roundedResult.toString();
            }
        } catch (error) {
            document.getElementById("result").value = "ERROR";
        }
    } 

});
