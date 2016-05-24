var express = require('express');
var http = require("http");
var aimlHigh = require('aimlinterpreter');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 5000;

app.use(express.static(__dirname + "/"))
app.use(bodyParser.json());

var server = http.createServer(app);
server.listen(port);

var interperter = new aimlHigh({name:'bot', age:'42'}, 'Goodbye');
interperter.loadAIMLFilesIntoArray(['test.aiml.xml']);

app.post('/aiml', function(req, res){
    
    var callback = function(answer, wildCardArray, input){
        res.send(answer);
        console.log("answeer: " + answer);
    }
    
    if(req.body.msg.length >= 2){
        
        interperter.findAnswerInLoadedAIMLFiles(req.body.msg, callback);
    }  
});



