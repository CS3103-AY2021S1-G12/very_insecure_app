const express = require('express');
const serveStatic = require('serve-static');
const cookieParser = require('cookie-parser');

const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');

const pool = new Pool();
pool.query('SELECT 1;', (err, _) => {
    if (err) {
        console.log({ err })
    } else {
        console.log('db connection ok');
    }
    pool.end();
});

const app = express();
const port = 3000;
const staticDir = path.resolve(__dirname, 'dist');
const index = path.resolve(staticDir, 'index.html');
app.use(cors());
app.use(cookieParser())

// const levelsRouter = require('./src/api/levelSystem');
// app.use('/levels', levelsRouter);
const cookie = "eyJ1c2VybmFtZSI6Ikd1ZXN0IiwiaXNBZG1pbiI6ZmFsc2UsImlzQXV0aGVudGljYXRlZCI6dHJ1ZSwidG9rZW4iOiJqSmxFcHokV0c0M2sifQ==";
app.get('*', (req, res, next) => {
    res.cookie('session', cookie, { httpOnly: true });
    next();
})

const staticRouter = serveStatic(staticDir);
app.use('/', staticRouter);

const authBypassRouter = require('./src/api/auth');
app.use(authBypassRouter);


// app.use('/assets', express.static(path.join(__dirname, 'src/assets')));
// app.use('/auth-1', express.static(path.join(__dirname, 'src/static/auth-1')));
// app.use('/auth-2', express.static(path.join(__dirname, 'src/static/auth-2')));
// app.use('/auth-3', express.static(path.join(__dirname, 'src/static/auth-3')));

app.get('*', (req, res) => {
    res.sendFile(index);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
