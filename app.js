var express = require("express");
var bodyParser = require("body-parser");

var urlencodedParser = bodyParser.urlencoded({extended: false});

var app = express();

app.use(bodyParser.json());

app.post("/input", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
  
    var data = `${request.body.author} - ${request.body.text}`;
    response.type('json');
    response.send(data);
    console.log(data);
});

app.listen(3000);