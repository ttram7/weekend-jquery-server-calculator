$(readyNow);

// array that stores type of operator clicked on
let operatorArray = []

function readyNow() {
    $('#plus-btn').on('click', storeOperation);
    $('#minus-btn').on('click', storeOperation);
    $('#multiply-btn').on('click', storeOperation);
    $('#divide-btn').on('click', storeOperation);
    $('#equal-btn').on('click', sendCalculation);
    $('#clear-btn').on('click', clearInputs);
    //$('#equal-btn').on('click', calculateNumber);
} // end readyNow

// store operator being used in an array to determine which conditional is executed
// alert saying user cannot use multiple operators at once
function storeOperation() {
    operatorArray.push(this.innerText);
    // if (operatorArray.length > 1) {
    //     alert('Cannot do multiple operations at once');
    // }
} // end storeOperation

function clearInputs() {
    $('#first-input').val('');
    $('#second-input').val('');
}

// get user input
/*function calculateNumber() {
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
*/
// send object to server
function sendCalculation() {
    //calculateNumber();
    $.ajax({
        method: 'POST',
        url: '/calculations',
        data: {
            firstNum: $('#first-input').val(),
            secondNum: $('#second-input').val(),
            operator: operatorArray[0]
        }
    }).then(function(response) {
        console.log('back from POST - console log', response);
        //getCalculation();
    }).catch(function(error) {
        console.log(error);
        alert('error posting message')
    }) // end ajax
}

function getCalculation() {
    $.ajax({
        method: 'GET',
        url: '/calculations'
    }).then(function(response){
        appendToDom();
    })
}

// append list of calculations to DOM
function appendToDom() {

}

