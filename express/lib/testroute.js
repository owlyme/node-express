/*jshint esversion: 6 */
import formidable from 'formidable';
import jqupload from 'jquery-file-upload-middleware';
import fs from 'fs';
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

	app.post('/process', (req, res)=>{
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

	app.get('/contest/vacation-photo',(req,res)=>{
		const now = new Date();
		res.render('contest/vacation-photo',{
			year: now.getFullYear(),month: now.getMonth()
		});
	});


	app.post('/contest/vacation-photo/:year/:month',(req, res)=>{
		const form = new formidable.IncomingForm();
		console.log( app.locals )

 		form.uploadDir = app.locals.uploads;
	    form.parse(req, function(err, fields, files) {
	    	if(err) throw err;
	    	console.log( files );
	    	fs.renameSync(files.photo.path, app.locals.uploads+ "/test.jpg");
	    });		
		res.send("/uploads/test.jpg");
	});

	
	// app.use('/upload', function(req, res, next){
	// 	var now = Date.now();
	// 	console.log(req.body)
	// 	jqupload.fileHandler({
	// 		uploadDir: function(){
	// 		return './public/uploads/' + now;
	// 		},
	// 		uploadUrl: function(){
	// 		return '/uploads/' + now;
	// 		},
	// 	})(req, res, next);
	// });


	// app.post('/upload', function(req, res){
	//     //接收前台POST过来的base64
	//     var imgData = req.body.data;
	//     var fileName = req.body.name
	//     //过滤data:URL

	//     var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
	//     var dataBuffer = new Buffer(base64Data, 'base64');

	//     fs.writeFile('./public/uploads/'+ fileName, dataBuffer,function(err) {
	//         if(err){
	//           res.send(err);
	//         }else{
	//         	console.log('sucess');
	//           res.send({path: "/uploads/image.png"});
	//         }
	//     });
	// });


}

