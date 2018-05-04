var express = require('express');
var bodyParser = require('body-parser');
var fs = require ('fs');

var urlencodedParser = bodyParser.urlencoded({extended: false});

var app = express();

app.use(bodyParser.json());

app.post("/questions", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
  
    var requestBody = request.body;

    var questionsObj;
    fs.readFile('questions.json', 'utf8', function (err, data) {
        if (err) response.sendStatus(500);
        questionsObj = JSON.parse(data);

        var questionAnswers = questionsObj.question.answers;

        var enrichedData = {
            id : (questionAnswers[questionAnswers.length - 1].id + 1),
            text : requestBody.text,
            author: requestBody.author,
            date: new Date(),
            rate: Math.floor(Math.random() * (6 - 1)) + 1
        };

        questionsObj.question.answers.push(enrichedData);
        
        fs.writeFile('questions.json', JSON.stringify(questionsObj, null, 4), function(error) {
            if (err) response.sendStatus(500);
            response.type('json');
            response.send(enrichedData);
        });
    });
});

app.get("/questions", function(request, response) {
    var questionsObj;
    fs.readFile('questions.json', 'utf8', function (err, data) {
        if (err) response.sendStatus(500);
        questionsObj = JSON.parse(data);
        response.send(questionsObj);
    });
});

app.listen(3000);