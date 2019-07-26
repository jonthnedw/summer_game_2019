
class TestClass
{

    private fs = require('fs');

    constructor() {}


    createFile() {

        this.fs.writeFile('file.txt', 'I am cool!',  function(err) {
            if (err) {
                return console.error(err);
            }
            console.log("File created!");
        });
    }

    showFile() {

        this.fs.readFile('file.txt', function (err, data) {
            if (err) {
                return console.error(err);
            }
            console.log("Asynchronous read: " + data.toString());
        });
    }

}