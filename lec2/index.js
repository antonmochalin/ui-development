var express = require('express');
var app = express();
app.get('/', function(req, res, next){
    var html = '<!DOCTYPE html>';
    html = html + '<html><head><title>Генерация таблицы на сервере</title></head>';
    html += "<body><table border='1'><tr><td>x</td><td>x*2</td>"
    for (var i=1;i<11;i++) {
        // добавьте здесь выражение, которое добавит к переменной html
        // строку таблицы, используя переменную i
    }
    html += '</table></body></html>';
    res.send(html);
});

app.use(express.static('static'));
app.listen(8080, function(){
    console.log('Сервер запущен на порте 8080');
});
