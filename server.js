const express = require('express');
const { Pool } = require('pg');

const pool = new Pool();
pool.query('SELECT 1;', (err, res) => {
    console.log(err, res);
    pool.end();
});

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send("Hello world!")
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});