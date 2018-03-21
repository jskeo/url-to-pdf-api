const config = require('../config');

const createRequireHttps = () => function RequireHttps(req, res, next) {
    //rawHeaders Array
    console.log('rawHeaders:    ', req.rawHeaders);
    //Accept
    console.log('Accept:   ', req.rawHeaders[9]);
    //AWS Load Balancer
    console.log('X-Forwarded-Proto:   ', req.rawHeaders[21]);
    //AWS Load Balancer
    console.log('X-Forwarded-Port:  ', req.rawHeaders[23]);
    //request_url
    console.log('request_url:       ', req.url);
    //request_url_length
    console.log('request_url_length:    ', req.url.length);
    //request_method should be GET
    console.log('request_method:    ', req.method);
    //original_url
    console.log('originalUrl:   ', req.originalUrl);
    //parsed_url
    console.log('_parsedUrl:    ', req._parsedUrl);
    //params
    console.log('params', req.params);
    //query
    console.log('query      ', req.query);
    //undefinded
    try {
    console.log('req.url_undef:         ', req.url.split("?")[1].split("=")[1].split(":")[1].split("//")[2].split("/")[4]);
    } catch(error) {
        const err = new Error('Invalid Request. 5');
                err.status = 403;
                return next(err);
    }

   

    console.log(config.REQUEST_URL_LENGTH);
    console.log(config.TARGET_DOMAIN);
    // Allow requests only over https
    if (req.url.split("?")[1].split("=")[1].split(":")[0] === 'https') {
    // Cut request into pieces
        var target = req.url.split("?")[1].split("=")[1].split(":")[1].split("/")[2];
        var requestUrl = req.url;
        var requestUrlLength = requestUrl.length;
        var requestId = req.url.split("?")[1].split("=")[1].split(":")[1].split("//")[2].split("/")[3];
        var requestIdLength = requestId.length;
    // Logging my last resot
        console.log(target);
        console.log(requestUrlLength);
        console.log(requestId);
        console.log(requestIdLength);
    // Check that method is GET, check TARGET_DOMAIN ENV Var matches target domain, check length of ID and target route 
            if (req.method !== "GET") {
                const err = new Error('Invalid Request. 1');
                err.status = 403;
                return next(err);
            } else if (config.TARGET_DOMAIN !== target){
                const err = new Error('Invalid Request. 2');
                err.status = 403;
                return next(err);
            } else if (config.REQUEST_URL_LENGTH != requestUrlLength || config.REQUEST_URL_LENGTH_WITHOUT_FLAG != requestUrlLength) {
                const err = new Error('Invalid Request.');
                err.status = 403;
                return next(err);
            } else if (config.REQUEST_ID_LENGTH != requestIdLength) {
                const err = new Error('Invalid Request.');
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