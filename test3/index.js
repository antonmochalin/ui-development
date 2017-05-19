var express = require('express');
var app = express();

app.use(express.static('static'));
app.use('/angular', express.static('node_modules/angular'));
app.post('/', function(req, res){
    res.write('');
    res.end();
});
app.listen(8080, function(){
    
    console.log('Сервер запущен на порте 8080');
});
