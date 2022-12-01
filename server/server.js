const express = require('express');

const app = express();
const port = 5050;

app.use(express.static('server/public'));

// POST request - allows us to parse data from front-end
app.use(express.urlencoded());

// to store operator used in calculation
//let operatorArray = []
//let calculationArray = []

app.post('/calculations', (req, res) => {
    const calculation = req.body;
    console.log('in /calculations POST on server', req.body);
    //res.send(calculation);
    res.sendStatus(201);
}) // end /calculations POST

//GET request after the POST to get the actual calculation

app.get('/calculations', (req, res) => {
    // do calculations here?
    
    //res.send(calculationArray);
})

app.listen(port, () => {
    console.log('listening on port', port);
});

