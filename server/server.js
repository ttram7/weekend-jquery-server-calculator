const express = require('express');

const app = express();
const port = 5050;

app.use(express.static('server/public'));

// POST request - allows us to parse data from front-end
app.use(express.urlencoded());

// stores all calculations
let calculationArray = [];

app.post('/calculations', (req, res) => {
    const calculation = req.body;

    //do calculation here, number conversion works here
    if (calculation.operator === '+') {
        calculation.result = Number(calculation.firstNum) + Number(calculation.secondNum);
    }
    if (calculation.operator === '-') {
        calculation.result = Number(calculation.firstNum) - Number(calculation.secondNum);
    }
    if (calculation.operator === '*') {
        calculation.result = Number(calculation.firstNum) * Number(calculation.secondNum);
    }
    if (calculation.operator === '/') {
        calculation.result = Number(calculation.firstNum) / Number(calculation.secondNum);
    }
    
    console.log('in /calculations POST on server', calculation);
    calculationArray.push(calculation);
    // send back success
    res.sendStatus(201);
}) // end /calculations POST

//GET request after the POST to get the actual calculation
app.get('/calculations', (req, res) => {
    res.send(calculationArray);
}) // end /calculations GET

app.listen(port, () => {
    console.log('listening on port', port);
});

