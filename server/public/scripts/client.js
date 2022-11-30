$(readyNow);

// array that stores type of operator clicked on
let calculationArray = []

function readyNow() {
    $('#plus-btn').on('click', storeOperation);
    $('#minus-btn').on('click', storeOperation);
    $('#multiply-btn').on('click', storeOperation);
    $('#divide-btn').on('click', storeOperation);
    //$('#equal-btn').on('click', calculateNumber);
    $('#equal-btn').on('click', sendCalculation);
} // end readyNow

// store operator being used in an array to determine which conditional is executed
// alert saying user cannot use multiple operators at once
function storeOperation() {
    calculationArray.push(this.innerText);
    if (calculationArray.length > 1) {
        alert('Cannot do multiple operations at once');
    }
} // end storeOperation

// get user input
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
    objectToSend = {value: result}
    
} // end calculateNumber

// send object to server
function sendCalculation() {
    calculateNumber();
    $.ajax({
        method: 'POST',
        url: '/calculations',
        data: objectToSend,
    }).then(function(response) {
        console.log('back from POST', response);
    }).catch(function(error) {
        console.log(error);
        alert('error posting message')
    }) // end ajax
}

