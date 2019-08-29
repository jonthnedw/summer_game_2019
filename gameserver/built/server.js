"use strict";
/*
Run the main game server.

Requires the Express module (npm install express --save)

*/
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const server = express();
console.log("server type is: " + server);
console.log('process.env.PORT is: ' + process.env.PORT);
// I don't completely understand this...
server.set("port", process.env.PORT || 3000);
//Basic routes
server.get('/', (request, response) => {
    response.sendFile(path.join("index.html"));
});
//Express error handling middleware
server.use((request, response) => {
    response.type('text/plain');
    response.status(505);
    response.send('Error page');
});
//Binding to a port
server.listen(3000, () => {
    console.log('Express server started at port 3000');
});
//# sourceMappingURL=server.js.map