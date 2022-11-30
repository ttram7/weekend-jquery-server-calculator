const express = require('express');

const app = express();
const port = 5050;

app.use(express.static('server/public'));

// POST request - allows us to parse data from front-end
app.use(express.urlencoded());

app.listen(port, () => {
    console.log('listening on port', port);
});

app.post('/calculations', (req, res) => {
    console.log('in /calculations POST', req.body);
    res.send('ribbet');
}) // end /calculations POST