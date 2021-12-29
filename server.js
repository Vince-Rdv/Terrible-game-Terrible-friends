console.clear();

// Random libraries
const chalk = require("chalk"); //Colored console output
function vLog(type, message) {

    var succes = true;

    //Create an error, so that line numbers etc can be found
    const e = new Error();
    const regex = /\((.*):(\d+):(\d+)\)$/
    const match = regex.exec(e.stack.split("\n")[2]);
    lineNumber = {
        filepath: match[1],
        line: match[2],
        column: match[3]
    };

    //Get current time formatted
    var currentTime = new Date();
    var h = currentTime.getHours().toString();
    var m = currentTime.getMinutes().toString();
    var s = currentTime.getSeconds().toString();
    var ms = currentTime.getMilliseconds().toString();

    //Add leading zero's
    if (s.length < 2) { s = "0" + s }
    if (m.length < 2) { m = "0" + m }
    if (h.length < 2) { h = "0" + h }

    if (ms.length < 2) { ms = "0" + ms }
    if (ms.length < 3) { ms = "0" + ms }

    var output = ""
    if (lineNumber.line < 1000) { output += chalk.gray("0") }
    if (lineNumber.line < 100) { output += chalk.gray("0") }
    if (lineNumber.line < 10) { output += chalk.gray("0") }
    output += chalk.gray(lineNumber.line + " ")

    output += h + ":" + m + ":" + s + ":" + ms + " ";

    // Add color to message type
    if (type == "log") { output += "[" + chalk.gray(type) + "]     " }
    else if (type == "info") { output += "[" + chalk.white(type) + "]    " }
    else if (type == "warning") { output += chalk.bgYellow(chalk.black("[" + type + "]")) + " " }
    else if (type == "error") { output += chalk.bgRed(chalk.white("[" + type + "]")) + "   " }
    else if (type == "debug") { output += "[" + chalk.blueBright(type) + "]   " }
    else {
        succes = false; //If non existent type is found, set succes to false
    }

    output += message

    if (succes) {
        console.log(output)
    } else {
        //Incorrect log type
        console.log(chalk.bgRed(chalk.white("Warning, incorrect type logged at " + lineNumber.line)))
        console.log(message)
        var temp = ""
        for (var x = 0; x < lineNumber.line.length; x++) {
            temp += "-"
        }
        console.log(chalk.bgRed(chalk.white("----------------------------------" + temp)))
    }

}
vLog("info", "TGTF server starting")

// Setup express for file serving
vLog("log", "Express server starting")
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
vLog("log", "Express server booted up")

// Setup socket networking for ingame communication
vLog("log", "Socket.io server starting")
const { Server } = require("socket.io");
const io = new Server(server);
vLog("log", "Socket.io server booted up")


// Variables
serverConfig = {
    port: 3000
}
// Better logging function


// Serve always relative from public folder
app.use(express.static('public'))

// On new Socket.io connection
io.on('connection', (socket) => {
    vLog("info", "A new user connected through socket");
});

// Listen to website requests on port 3000
server.listen(serverConfig.port, () => {
    vLog("info", "Server started. Port: " + serverConfig.port);
});
