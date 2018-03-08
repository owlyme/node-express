import express from 'express'
import handler from 'express3-handlebars'

const l = console.log;

const app = express();

const handlebars = handler.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);


app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.render('home');
});

var fortunes = [
"Conquer your fears or they will conquer you.",
"Rivers need springs.",
"Do not fear what you don't know.",
"You will have a pleasant surprise.",
"Whenever possible, keep it simple.",
];
app.get('/about', function(req, res){
	var randomFortune =fortunes[Math.floor(Math.random() * fortunes.length)];
	res.render('about', { fortune: randomFortune });
});
// 定制404 页面
app.use(function(req, res){
	res.type('text/plain');
	res.status(404);
	res.render('404');
});
// 定制500 页面
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.type('text/plain');
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log( 'Express started on http://localhost:' +
	app.get('port') + '; press Ctrl-C to terminate.' );
})

