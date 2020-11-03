const express = require('express');
const { Client } = require('pg');

// const pg = new Client();
// pg.connect();

const app = express();
const port = 3000;

const authBypassRouter = require('./src/api/auth');

app.use(authBypassRouter);

app.get('*', (req, res) => {
  res.status(404).send("Not found!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});