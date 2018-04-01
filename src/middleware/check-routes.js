const Ddos = require('ddos');
const ex = require('../util/express');
const config = require('../config');
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const logger = require('../util/logger')(__filename);
const isHex = require('is-hex');
const responseTime = require('response-time');

const createCheckRoutes = () => function checkRoutes(req, res, next) {

	

	console.log('CHECK ROUTES ACTIVE');



	//delete req.headers['request-id'];
	req.removeHeader['request-id'];
	//res.removeHeader['request-id'];

    res.status(200).send('CHECK ROUTES ACTIVE I');

    logger.info(`X-Forwarded-For: ${req.get('X-Forwarded-For')} .. `);
    logger.info(`Status Code: ${res.statusCode} | Status Message ${res.statusMessage} | Response time ${res.get('X-Response-Time')} ..`);
	console.log('res: ', res._header);
	

    // const err = new Error('CHECK ROUTES ACTIVE I');
    // err.status = 200;
    // return next(err);


	//return next();

};


	// const staticRoute = ex.createRoute((req, res) => {

 // 	res.status(200).send('CHECK ROUTES ACTIVE I');
 // 	logger.info(`X-Forwarded-For: ${req.get('X-Forwarded-For')} .. `);
 //    logger.info(`Status Code: ${res.statusCode} | Status Message ${res.statusMessage} | Response time ${res.get('X-Response-Time')} ..`);

	// });


module.exports = createCheckRoutes;