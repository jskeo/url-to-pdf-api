const config = require('../config');

const createRequireHttps = () => function RequireHttps(req, res, next) {
    //rawHeaders Array
    try {
    console.log('rawHeaders:    ', req.rawHeaders);
    } catch(error) {
        const err = new Error('Invalid Request.');
                err.status = 403;
                return next(err);
    }
    //Accept
    try {
    console.log('Accept:   ', req.rawHeaders[9]);
    } catch(error) {
        const err = new Error('Invalid Request.');
                err.status = 403;
                return next(err);
    }

    //AWS Load Balancer
    try {
    console.log('X-Forwarded-Proto:   ', req.rawHeaders[21]);
    } catch(error) {
        const err = new Error('Invalid Request.');
                err.status = 403;
                return next(err);
    }
    //AWS Load Balancer
    try {
    console.log('X-Forwarded-Port:  ', req.rawHeaders[23]);
    } catch(error) {
        const err = new Error('Invalid Request.');
                err.status = 403;
                return next(err);
    }
    //request_url
    try {
    console.log('request_url:       ', req.url);
    } catch(error) {
        const err = new Error('Invalid Request.');
                err.status = 403;
                return next(err);
    }
    //request_url_length
    try {
    console.log('request_url_length:    ', req.url.length);
    } catch(error) {
        const err = new Error('Invalid Request.');
                err.status = 403;
                return next(err);
    }
    //Check if method is GET, request_method should be GET
    try {
    console.log('request_method:    ', req.method);
    if (req.method != "GET") {
            console.log('Note: Request Method Invalid. Return Status 403', req.method);
            return res.sendStatus(403)
            req.end();
                
        };
    } catch(error) {
        const err = new Error('Invalid Request.');
                err.status = 403;
                return next(err);
    }
    //original_url
    try {
    console.log('originalUrl:   ', req.originalUrl);
    } catch(error) {
        const err = new Error('Invalid Request.');
                err.status = 403;
                return next(err);
    }
    //parsed_url
    try {
    console.log('_parsedUrl:    ', req._parsedUrl);
    } catch(error) {
        const err = new Error('Invalid Request.');
                err.status = 403;
                return next(err);
    }
    //params
    try {
    console.log('params', req.params);
    } catch(error) {
        const err = new Error('Invalid Request Params.');
                err.status = 403;
                return next(err);
    }
    //query
    try {
    console.log('query      ', req.query);
    } catch(error) {
        const err = new Error('Invalid Request Query.');
                err.status = 403;
                return next(err);
    }
    //requestId
    try {
    console.log('requestId:         ', req.url.split("?")[1].split("=")[1].split(":")[1].split("//")[2].split("/")[3]);
    } catch(error) {
        const err = new Error('Invalid Request. 1');
                err.status = 403;
                return next(err);
    }

   

    
    
    // Allow requests only over https
    if (req.url.split("?")[1].split("=")[1].split(":")[0] === 'https') {
    // Cut request into pieces
    try {
        var target = req.url.split("?")[1].split("=")[1].split(":")[1].split("/")[2];
        var requestUrl = req.url;
        var requestUrlLength = requestUrl.length;
        var requestId = req.url.split("?")[1].split("=")[1].split(":")[1].split("//")[2].split("/")[3];
        var requestIdLength = requestId.length;
        } catch(error) {
        const err = new Error('Invalid Request. 6');
                err.status = 403;
                return next(err);
    }

    // Logging my last resot
        console.log('ENV TARGET_DOMAIN :    ', config.TARGET_DOMAIN);
        console.log(target);
        console.log('ENV REQUEST_URL_LENGTH :       ', config.REQUEST_URL_LENGTH);
        console.log('requestUrl:        ', requestUrl);
        console.log(requestUrlLength);
        console.log(requestId);
        console.log(requestIdLength);
    // Check TARGET_DOMAIN ENV Var matches target domain, check length of ID and target route 
            if (config.TARGET_DOMAIN !== target) {
                const err = new Error('Invalid Request. 2');
                err.status = 403;
                return next(err);
            } else if (config.REQUEST_URL_LENGTH != requestUrlLength) {
                const err = new Error('Invalid Request. 3');
                err.status = 403;
                return next(err);
            } else if (config.REQUEST_ID_LENGTH != requestIdLength) {
                const err = new Error('Invalid Request. 4');
                err.status = 403;
                return next(err); 
            }

            else {
    // When all is fine go on
           return next();

       }
      
    } else {
    // When protocol is not HTTPS
    const err = new Error('Only HTTPS allowed.');
    err.status = 403;
    next(err);
    }
};

module.exports = createRequireHttps;