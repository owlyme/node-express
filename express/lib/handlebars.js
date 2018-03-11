/*jshint esversion: 6 */
import express from 'express';
import handler from 'express3-handlebars';

const handlebars = handler.create({
	extname: '.hbs',
	defaultLayout:'main',
	helpers: {
		section: function(name, options){
			if(!this._sections) this._sections = {};
			this._sections[name] = options.fn(this);
			return null;
		}
	}
});

export default handlebars