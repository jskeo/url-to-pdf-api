const Ddos = require('ddos');
const express = require('express');
const config = require('../config');
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const logger = require('../util/logger')(__filename);
const isHex = require('is-hex');

const createCheckRoutes = () => function checkRoutes(req, res, next) {

	console.log('CHECK ROUTES ACTIVE');
	     
	
	router.get('/api/render', function (req, res) {
	  res.send('CHECK ROUTES ACTIVE I');
	});


	logger.info(`X-Forwarded-For: ${req.get('X-Forwarded-For')} .. `);
    logger.info(`Status Code: ${res.statusCode} | Status Message ${res.statusMessage} | Response time ${res.get('X-Response-Time')} ..`);
 

	//return next();

};

module.exports = createCheckRoutes;