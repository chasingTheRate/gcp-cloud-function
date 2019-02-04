require('dotenv').config();
const express = require('express')
const helloWorld = require('./index');
const app = express()
const port = 3000

app.get('/helloWorld', helloWorld.helloWorld);
app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))