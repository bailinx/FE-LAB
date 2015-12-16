var express = require ('express');
var fortune = require ('./lib/fortune.js');

var app = express();
// 引入handlebars
var handlebars = require('express3-handlebars')
    .create({ defaultLayout: 'main'});
// 设置引擎
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

/*var fortuneCookies = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
];*/

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/about', function(req, res) {
    // var randomFortune =
    //     fortuneCookies[Math.floor(Math.random() * fortuneCookies.length)];

    res.render('about', { fortune: fortune.getFortune() });
});

app.use(function(req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('Express started on localhost:' + app.get('port'));
});