var express = require('express');
var app = express();
app.get('/', function(req, res, next){
    res.send('Привет!');
});
app.post('/post', function(req, res){
    res.send("OK!");
});
app.use(express.static('static'));
app.listen(8080, function(){
    console.log('Сервер запущен на порте 8080');
});
