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

	app.get('/newsletter', function(req, res){
	// 我们会在后面学到 CSRF……目前，只提供一个虚拟值
		res.render('newsletter', { csrf: 'CSRF token goes here' });
	});

	// app.post('/process', function(req, res){
	// 	console.log('Form (from querystring): ' + req.query.form);
	// 	console.log('CSRF token (from hidden form field): ' + req.body._csrf);
	// 	console.log('Name (from visible form field): ' + req.body.name);
	// 	console.log('Email (from visible form field): ' + req.body.email);
	// 	res.redirect(303, '/thank-you');
	// });


	app.post('/process', function(req, res){
		console.log('CSRF token (from hidden form field): ' + req.body._csrf);
		console.log('Name (from visible form field): ' + req.body.name);
		console.log('Email (from visible form field): ' + req.body.email);

		if(req.xhr || req.accepts('json,html')==='json'){
		// 如果发生错误，应该发送 { error: 'error description' }
			res.send({ success: true });
		} else {
		// 如果发生错误，应该重定向到错误页面
			res.redirect(303, '/thank-you');
		}
	});
}

