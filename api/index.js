const express = require('express')
const app = express();

app.get('/test', (req, res) => {
  res.json('test pl')
})

app.listen(4000)