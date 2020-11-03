const express = require('express');
const cookieParser = require('cookie-parser');

const router = express.Router();
router.use(cookieParser());

const LEVEL_1_PROMO_CODE = "`2MH}\?TV<@4M;T{&CD?3'YH";

router.get('/admin/promo', (req, res) => {
  const cookie = req.cookies['session'];

  if (!cookie) {
    res.status(401).send("Not authorized");
  }

  const buff = Buffer.from(cookie, 'base64');
  console.log(buff.toString('ascii'));
  const token = JSON.parse(buff.toString('ascii'));

  if (token.isAdmin) {
    res.status(200).send(LEVEL_1_PROMO_CODE);
  } else {
    res.status(401).send("Not authorized!");
  }
});

module.exports = router;