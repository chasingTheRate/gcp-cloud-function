require('dotenv').config();
const express = require('express')
const { updateSorts } = require('./index');
const app = express()
const port = 3000

app.get('/updateSorts', updateSorts);
app.get('/', (req, res) => res.send('Welcome to the Team Shelby Autobahn-Analytics Integration'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});