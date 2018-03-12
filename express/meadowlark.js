/*jshint esversion: 6 */
import express from 'express';
import bodyParser from 'body-parser';
// import multer from 'multer';
import handlebars from './lib/handlebars';
import randomFortune from './lib/fortune';
import getWeatherData from './lib/getWeatherData';
import testroute from './lib/testroute'

const l = console.log;


const app = express();

app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
app.set('port', process.env.PORT || 3000);

app.disable('x-powered-by');
app.set('view cache', true);
app.use( bodyParser.urlencoded({ extended: false }) );

//test
app.use(function(req, res, next){
	res.locals.showTests = app.get('env') !== 'production' &&
	req.query.test === '1';
	next();
});
app.use(function(req, res, next){
	if(!res.locals.partials) res.locals.partials = {};
	res.locals.partials.weather = getWeatherData;
	res.locals.partials.smile  = 'haha';
	next();
});
app.get('/', function(req, res){
	res.render('home');
});
app.get('/about', function(req, res){
	res.render('about', {
					fortune: randomFortune,
					pageTestScript: '/qa/tests-about.js' });
});

app.get('/tours/hood-river', function(req, res){
	res.render('tours/hood-river');
});
app.get('/tours/request-group-rate', function(req, res){
	res.render('tours/request-group-rate');
});

app.get('/headers', function(req,res){
	res.sendFile(__dirname+'/public','hood-river.hbs')
});


testroute(app);


app.use(express.static(__dirname + '/public'));
// 定制404 页面
app.use(function(req, res){
	res.status(404);
	res.render('404');
});
// 定制500 页面
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log( 'Express started on http://localhost:' +
	app.get('port') + '; press Ctrl-C to terminate.' );
});

