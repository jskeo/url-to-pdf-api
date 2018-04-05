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
//const rp = require('request-promise');

function doesDirectoryExist(directoryPath) {
	try{	
		if (fs.statSync(directoryPath).isDirectory()) {
		return true;
	}
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
	try {
	mkdirp(directoryPath);
	console.log('pow! directory created:', directoryPath);
	} catch (e) {
		const err = new Error('Internal Error IV');
		err.status = 500;
		return next(err);
	}
};

function getRequestObjectPath(req) {
	try {
	  const requestId = req.url.split("?")[1].split("=")[1].split(":")[1].split("//")[2].split("/")[3];
	  const objectPath = config.WORKING_DIRECTORY+config.SAVES_PATH+"/"+requestId+config.SAVES_SUB+"/"+config.FILE_NAME;
	  return objectPath;
	  } catch (e) {
		const err = new Error('Internal Error V');
		err.status = 500;
		return next(err);
	}
};

function getRequestId(req) {
	try {
	  const requestId = req.url.split("?")[1].split("=")[1].split(":")[1].split("//")[2].split("/")[3];
	  return requestId;
	  } catch (e) {
		const err = new Error('Internal Error VIII');
		err.status = 500;
		return next(err);
	}
};

// function checkIfTargetExists (targetUrl) {
// 	const options = {  
//     url: targetUrl,
//     method: 'HEAD',
//     json: true
// 	};
// 	const responsePromise = await rp(options)
//     .then(function (response) {
//         console.log(response.statusCode);
//     })
//     .catch(function (e) {
//         console.log('error');
//     });
// };






const createCheckRoutes = () => function checkRoutes(req, res, next) {

	const req_url = req.url.split("?url=")[1];
	console.log(req_url);
	// console.log('Check if target exists');
	// const targetExists = checkIfTargetExists(req_url);
 // 	console.log(targetExists);
	

	console.log('CHECK ROUTES ACTIVE');

	const requestId = getRequestId(req);

	console.log('requestId: ', requestId);
	//const objectPath = '../saves/'+requestId;
	const objectPath = getRequestObjectPath(req);
	const objectDir = config.WORKING_DIRECTORY+config.SAVES_PATH+"/"+requestId+config.SAVES_SUB;
	console.log('CWD: ', config.WORKING_DIRECTORY);

	if (fs.existsSync(objectPath)) {
		console.log(objectPath);
    	console.log('file does exist');
    	//res.send('CHECK ROUTES ACTIVE I');
    	const sendfileOpts = {
		    dotfiles: 'deny',
		    headers: {
		        'x-timestamp': Date.now(),
		        'x-sent': true
		    }
		  };

		res.setHeader('Content-Disposition', 'inline; filename="' + config.FILE_NAME + '"');
    	res.sendFile(objectPath, sendfileOpts, function (err) {
		    if (err) {
		      	const err = new Error('Internal Error VII');
				err.status = 500;
				return next(err);
		    } else {
		      console.log('Sent:', objectPath);
		      logger.info(`X-Forwarded-For: ${req.get('X-Forwarded-For')} .. `);
	    	  logger.info(`Status Code: ${res.statusCode} | Status Message ${res.statusMessage} | Response time ${res.get('X-Response-Time')} ..`);
			  console.log('res: ', res._header);
		    }
		  });

	} else {
		console.log(objectPath);
		console.log('file does not exist');
		console.log('Checking if directory exists');
		//
		//
		console.log(doesDirectoryExist(objectDir));

		//fs.statSync(config.WORKING_DIRECTORY+config.SAVES_PATH+"/"+requestId).isDirectory();
		if (!doesDirectoryExist(objectDir)) {
			console.log('Creating directory..');
			createDirectory(objectDir);
			console.log('Checking again if directory exists..');
			console.log(doesDirectoryExist(objectDir));
			return next();
			//res.send('CHECK ROUTES ACTIVE II');
			//res.end();

		    //logger.info(`X-Forwarded-For: ${req.get('X-Forwarded-For')} .. `);
		    //logger.info(`Status Code: ${res.statusCode} | Status Message ${res.statusMessage} | Response time ${res.get('X-Response-Time')} ..`);
			//console.log('res: ', res._header);
			
		} else {

		console.log('getRequestObjectPath function check:', getRequestObjectPath(req));

		res.send('CHECK ROUTES ACTIVE III');

		logger.info(`X-Forwarded-For: ${req.get('X-Forwarded-For')} .. `);
		logger.info(`Status Code: ${res.statusCode} | Status Message ${res.statusMessage} | Response time ${res.get('X-Response-Time')} ..`);
		console.log('res: ', res._header);
		}
		//
		//console.log('Checking if dummy directory exists');
		//console.log(fs.statSync(config.WORKING_DIRECTORY+config.SAVES_PATH).isDirectory());
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