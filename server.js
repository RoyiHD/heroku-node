var express = require('express');
var aimlHigh = require('AIMLInterpreter');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname+ "/"))
app.use(bodyParser.json());

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

app.listen(8080);

