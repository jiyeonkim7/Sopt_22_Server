var express = require('express');
var router = express.Router();


const board = require('./board/board.js');
router.use('/board', board);

const comment = require('./comment/comment.js');
router.use('/comment', comment);


module.exports = router;
