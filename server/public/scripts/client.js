$(readyNow);

// array that stores type of operator clicked on
let calculationArray = []

function readyNow() {
    $('#plus-btn').on('click', storeOperation);
    $('#minus-btn').on('click', storeOperation);
    $('#multiply-btn').on('click', storeOperation);
    $('#divide-btn').on('click', storeOperation);
    $('#equal-btn').on('click', calculateNumber);
}

function storeOperation() {
    calculationArray.push(this.innerText);
    if (calculationArray.length > 1) {
        alert('Cannot do multiple operations at once');
    }
}

function calculateNumber() {
    let firstNumber = Number($('#first-input').val());
    let secondNumber = Number($('#second-input').val());
    if (calculationArray[0]=== '+') {
        let result = firstNumber + secondNumber;
        console.log(result);
    }
    if (calculationArray[0]=== '-') {
        let result = firstNumber - secondNumber;
        console.log(result);
    }
    if (calculationArray[0]=== '*') {
        let result = firstNumber * secondNumber;
        console.log(result);
    }
    if (calculationArray[0]=== '/') {
        let result = firstNumber / secondNumber;
        console.log(result);
    }
    
}

