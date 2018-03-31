const Ddos = require('ddos');
const express = require('express');
const config = require('../config');
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const logger = require('../util/logger')(__filename);
const isHex = require('is-hex');

const createCheckRoutes = () => function checkRoutes(req, res, next) {

	

	console.log('CHECK ROUTES ACTIVE');


	logger.info(`X-Forwarded-For: ${req.get('X-Forwarded-For')} .. `);
    logger.info(`Status Code: ${res.statusCode} | Status Message ${res.statusMessage} | Response time ${res.get('X-Response-Time')} ..`);
	
    return next(res.status(200).send('CHECK ROUTES ACTIVE I'));

    // const err = new Error('CHECK ROUTES ACTIVE I');
    // err.status = 200;
    // return next(err);

	}


//	return next();



module.exports = createCheckRoutes;