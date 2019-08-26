"use strict";
exports.__esModule = true;
var fs = require("fs");
// var fs = require('fs');
try {
    var data = fs.readFileSync('../GameBoard1.txt', 'utf8');
    console.log(data);
}
catch (e) {
}
