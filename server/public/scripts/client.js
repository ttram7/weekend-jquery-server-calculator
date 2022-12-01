$(readyNow);

// array that stores type of operator clicked on
let operatorArray = [];

// functions will execute when its respective button is clicked on
function readyNow() {
    $('#plus-btn').on('click', storeOperation);
    $('#minus-btn').on('click', storeOperation);
    $('#multiply-btn').on('click', storeOperation);
    $('#divide-btn').on('click', storeOperation);
    $('#equal-btn').on('click', sendCalculation);
    $('#clear-btn').on('click', clearInputs);
} // end readyNow

// store operator that was clicked on in an array to be used for calculation on server-side
// alert appears when user does not clear inputs to avoid using multiple operators at once
function storeOperation() {
    if (operatorArray.length === 1) {
        alert('Cannot do multiple operations at once. Please hit "C" before entering a new calculation.');
    } else {
        operatorArray.push(this.innerText);
    }
} // end storeOperation

// input fields will clear when user clicks "C" button
// operator in operatorArray is removed to reset for the next calculation
function clearInputs() {
    $('#first-input').val('');
    $('#second-input').val('');
    operatorArray.pop();
}

// send inputs bundled in an object to server
function sendCalculation() {
    // NOTE: firstNum and secondNum are still strings here;
    $.ajax({
        method: 'POST',
        url: '/calculations',
        data: {
            firstNum: Number($('#first-input').val()),
            secondNum: Number($('#second-input').val()),
            operator: operatorArray[0]
        }
    }).then(function(response) {
        console.log('back from POST - success message:', response);
        console.log('Operator being used:', operatorArray);
        getCalculation();
    }).catch(function(error) {
        console.log(error);
        alert('error posting message');
    }) // end ajax
} // end sendCalculation

// gets calculationArray
function getCalculation() {
    $.ajax({
        method: 'GET',
        url: '/calculations'
    }).then(function(response){
        console.log('back from GET - calculationArray', response);
        appendToDom(response);
    }) // end ajax
} // end getCalculation

// append result and list of calculations to DOM
function appendToDom(array) {
    $('#result').empty();
    $('#history-list').empty();
    for (object of array) {
        $('#result').text(object.result);
        $('#history-list').append(`
        <li>${object.firstNum} ${object.operator} ${object.secondNum} = ${object.result}</li>
        `)
    }
} // end appendToDom

