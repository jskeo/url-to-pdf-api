const Ddos = require('ddos');
const express = require('express');
const config = require('../config');
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const logger = require('../util/logger')(__filename);
const isHex = require('is-hex');

const createCheckRoutes = () => function checkRoutes(req, res, next) {

	

	console.log('CHECK ROUTES ACTIVE');

	const staticRouter = express.Router();
	
	staticRouter.get('/api/render', function (req, res) {
		return res.send('CHECK ROUTES ACTIVE I');
	});

	logger.info(`X-Forwarded-For: ${req.get('X-Forwarded-For')} .. `);
    logger.info(`Status Code: ${res.statusCode} | Status Message ${res.statusMessage} | Response time ${res.get('X-Response-Time')} ..`);
	}

	return staticRouter;


//	return next();

};

module.exports = createCheckRoutes;