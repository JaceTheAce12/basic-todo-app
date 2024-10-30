const express = require('express');
const app = express();
const port = 3000;
const todos = require('./public/modules/todos');

app.use(express.json());
app.use(express.static('public'));

app.get('/todos', (req, res) => {
    res.send(todos);
});

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});