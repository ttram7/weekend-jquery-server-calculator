$(readyNow);
console.log('test', {testNum: 4});
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
    if (operatorArray.length === 1) {
        alert('Cannot do multiple operations at once. Please hit "C" before entering a new calculation.');
    } else {
        operatorArray.push(this.innerText);
    }
} // end storeOperation

function clearInputs() {
    $('#first-input').val('');
    $('#second-input').val('');
    operatorArray.pop();
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
    //firstNum and secondNum are still strings here;
    $.ajax({
        method: 'POST',
        url: '/calculations',
        data: {
            firstNum: Number($('#first-input').val()),
            secondNum: Number($('#second-input').val()),
            testNum: 4,
            operator: operatorArray[0]
        }
    }).then(function(response) {
        console.log('back from POST - console log', response);
        console.log(operatorArray);
        getCalculation();
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
        console.log('back from GET - console log', response);
        appendToDom(response);
    })
}

// append list of calculations to DOM
function appendToDom(array) {
    $('#history-list').empty();
    for (object of array) {
        $('#history-list').append(`
        <li>${object.firstNum} ${object.operator} ${object.secondNum} = ${object.result}</li>
    
        `)
    }
}

