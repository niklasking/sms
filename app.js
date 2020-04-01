var express = require('express');
var request = require('request');
// var https = require('https');
// var axios = require('axios');
var fs = require('fs');

var app = express();
app.set("view engine", "ejs");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.use('/static', express.static('static'));
app.use(express.static(__dirname));

var http = require('http').Server(app);
var io = require('socket.io')(http);
io.on('connection', function(socket){
    // console.log('a user connected');
});

app.get("/", function(req, res) {
    res.render("home");
});
app.post("/sms_receive", function(req, res) {
    var message = req.body.receiveCompleted + ": " + 
                    "\"" + req.body.message + "\"" +
                    " from " + req.body.deviceUuid +
                    " (" + req.body.type + ")";
    io.emit('sms-message', message);
    res.sendStatus(200);
});
http.listen(81, function() {
    console.log("The app has started on port 81");
});