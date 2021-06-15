var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(_req, res, _next) {
  res.sendFile(path.join(__dirname, '/client/public/index.html'));
});

module.exports = router;
