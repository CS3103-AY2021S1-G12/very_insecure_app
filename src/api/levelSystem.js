const crypto = require('crypto');
const express = require('express');
const cookieParser = require('cookie-parser');

const router = express.Router();
router.use(cookieParser());

let levels = ['xss-1', 'xss-2', 'xss-3']
    .reduce((dict, level) => {
        dict[level] = crypto.randomBytes(12);
        return dict;
    }, {});

let prevLevel;
for (const [path, secret] of Object.entries(levels)) {
    console.log({ path });
    if (prevLevel) {
        router.get(`/${path}`, ((prev) => (req, res, next) => {
            const winCookie = req.cookies[prev];
            if (!winCookie) {
                res.status(401).send('Clear the previous level first!');
                return;
            }
            next();
        })(prevLevel));
    }

    router.get(`/${path}/wincondition`, (req, res) => {
        const expires = new Date();
        expires.setFullYear(expires.getFullYear() + 1);

        res.cookie(path, secret.toString('hex'), {
            expires: expires,
            httpOnly: true
        });
        res.sendStatus(200);
    })

    prevLevel = path;
}

module.exports = router;