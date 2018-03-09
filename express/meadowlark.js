import express from 'express'
import handler from 'express3-handlebars'
import randomFortune from './lib/fortune'
const l = console.log;

const app = express();

const handlebars = handler.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
	res.render('home');
});
app.get('/about', function(req, res){
	res.render('about', { fortune: randomFortune });
});

app.use(express.static(__dirname + '/public'));
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

