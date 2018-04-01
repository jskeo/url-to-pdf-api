const Ddos = require('ddos');
const ex = require('../util/express');
const config = require('../config');
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const logger = require('../util/logger')(__filename);
const isHex = require('is-hex');
const responseTime = require('response-time');
const fs = require('fs');
const mkdirp = require('mkdirp');

function doesDirectoryExist(directoryPath) {
	try{	
		fs.statSync(directoryPath).isDirectory();
		} catch (e) {
			if(e.code == 'ENOENT'){
			return false;
			} else {
			const err = new Error('Internal Error III');
			err.status = 500;
			return next(err);
			}
		}
};

function createDirectory(directoryPath) {    
	mkdirp(directoryPath, function (err) {
	    if (err) console.error(err)
	    else console.log('pow! directory created:', directoryPath)
	});
};

const createCheckRoutes = () => function checkRoutes(req, res, next) {

	

	console.log('CHECK ROUTES ACTIVE');

	const requestId = req.url.split("?")[1].split("=")[1].split(":")[1].split("//")[2].split("/")[3];

	console.log('requestId: ', requestId);
	//const objectPath = '../saves/'+requestId;
	const objectPath = process.cwd()+config.SAVES_PATH+"/"+requestId+"/"+config.FILE_NAME;
	console.log('CWD: ', process.cwd());

	if (fs.existsSync(objectPath)) {
		console.log(objectPath);
    	console.log('file does exist');
	} else {
		console.log(objectPath);
		console.log('file does not exist');
		console.log('Checking if directory exists');
		//
		//
		console.log(doesDirectoryExist(objectPath));
		//fs.statSync(process.cwd()+config.SAVES_PATH+"/"+requestId).isDirectory();
		if (!doesDirectoryExist(objectPath)) {
			console.log('Creating directory..');
			createDirectory(objectPath);
			console.log('Checking again if directory exists..');
			console.log(doesDirectoryExist(objectPath));
		}
		//
		console.log('Checking if dummy directory exists');
		console.log(fs.statSync(process.cwd()+config.SAVES_PATH).isDirectory());
	}

	//


	//

	//console.log('res: ', res._header);

	//delete req.headers['request-id'];
	//req.removeHeader['request-id'];
	//res.removeHeader['request-id'];

	//res.set('content-type', 'application/pdf');
    //cache-control headers
    //res.set('Cache-Control', 'public, max-age=10800000'); // 34560 30 seconds, 345600 4 days, 10800000 3h
    //res.set('Expires', new Date(Date.now() + 10800000).toUTCString());

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