/*jshint esversion: 6 */
import { tours } from '../dbjson/tours';

export 	default (app)=>{
	app.post('/process-contact', function(req, res){
		
		// console.log('Received contact from ' + req.body.name +
		// ' <' + req.body.email + '>');
		// 保存到数据库……
		// res.redirect(303, '/thank-you');
		res.send('thank-you')
	});

	app.get('/jquerytest', function(req, res){
		res.render('jquerytest')
	});

	app.get('/api/tours/:id', function(req, res){
		let val = tours[req.params.id];
		res.json(val);
	});

	app.get('/foo', function(req, res){
		res.render('foo',{layout : 'microsite'});
	});

	app.get('/nursery-rhyme', function(req, res){
		res.render('nursery-rhyme');
	});

	app.get('/data/nursery-rhyme', function(req, res){
		res.json({
			animal: 'squirrel',
			bodyPart: 'tail',
			adjective: 'bushy',
			noun: 'heck',
		});
	});

	app.post('/process', function(req, res){
		console.log(req.query.color)
		res.send('ok')
	});

}

