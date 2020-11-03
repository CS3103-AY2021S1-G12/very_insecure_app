const express = require('express');
const { Pool } = require('pg');

const pool = new Pool();
pool.query('SELECT 1;', (err, res) => {
    console.log(err, res);
    pool.end();
});

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