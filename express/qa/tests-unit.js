/*jshint esversion: 6 */
import randmeFortune from '../lib/fortune';
import { expect } from 'chai';

suite('Fortune cookie tests', function(){
	test('getFortune() should return a fortune', function(){
		expect(typeof randmeFortune === 'string');
	});
});
