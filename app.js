var express = require('express');
var bodyParser = require('body-parser');
var fs = require ('fs');

var urlencodedParser = bodyParser.urlencoded({extended: false});

var app = express();

app.use(bodyParser.json());

app.post("/questions", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
  
    var data = `${request.body.author} - ${request.body.text}`;
    response.type('json');
    response.send(data);
    console.log(data);
});

app.get("/questions", function(request, response) {
    var obj;
    fs.readFile('questions.json', 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        response.send(obj);
    });
});

app.listen(3000);