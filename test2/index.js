var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('static'));
app.use(bodyParser.urlencoded({extended: true}));
app.post('/', function(req, res){
    res.write('<html><body>Параметры запроса:<br><pre>');
    res.write(JSON.stringify(req.body,null,4));
    res.write('</pre></html></body>');
    res.end();
});
app.listen(8080, function(){
    
    console.log('Сервер запущен на порте 8080');
});
