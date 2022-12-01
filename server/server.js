const express = require('express');

const app = express();
const port = 5050;

app.use(express.static('server/public'));

// POST request - allows us to parse data from front-end
app.use(express.urlencoded());

// to store operator used in calculation
//let operatorArray = []
let calculationArray = [];

app.post('/calculations', (req, res) => {
    const calculation = req.body;

    //do calculation here
    if (calculation.operator === '+') {
        calculation.result = Number(calculation.firstNum) + Number(calculation.secondNum);
    }
    console.log('in /calculations POST on server', calculation);
    calculationArray.push(calculation);
    //send back success
    res.sendStatus(201);
}) // end /calculations POST

//GET request after the POST to get the actual calculation

app.get('/calculations', (req, res) => {
    //req is an incoming message object?
    // do calculations here
    res.send(calculationArray)
    // if (calculationArray[0]=== '+') {
    //     let result = firstNumber + secondNumber;
    //     console.log(result);
    // }
    // if (calculationArray[0]=== '-') {
    //     let result = firstNumber - secondNumber;
    //     console.log(result);
    // }
    // if (calculationArray[0]=== '*') {
    //     let result = firstNumber * secondNumber;
    //     console.log(result);
    // }
    // if (calculationArray[0]=== '/') {
    //     let result = firstNumber / secondNumber;
    //     console.log(result);
    // }
    //res.send(result);
    //res.send(calculationArray);
})

app.listen(port, () => {
    console.log('listening on port', port);
});

