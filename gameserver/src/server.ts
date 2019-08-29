/*
Run the main game server. 

Requires the Express module (npm install express --save)

Serving static files: https://www.tutorialspoint.com/expressjs/expressjs_static_files.htm

*/

import * as express from 'express';
import * as path from 'path';

const server = express();


// I don't completely understand why this was needed
//server.set("port", process.env.PORT || 3000);


//Basic routes
// server.get('/', (request, response) => {
//     response.sendFile(path.join(process.cwd() + "/index.html"));
// });

// Allow users access to 
server.use(express.static('./'));


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

