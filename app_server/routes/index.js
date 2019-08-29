const express = require('express');
const router = express.Router();
const ctrlMain = require('../controllers/main');    1
/* GET homepage. */
router.get('/', ctrlMain.index);                    2
module.exports = router;
