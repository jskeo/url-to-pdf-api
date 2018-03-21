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
    console.log('req.url_undef:         ', req.url.split("?")[1].split("=")[1].split(":")[1].split("//")[2].split("/")[4]);

    //id
    console.log('req.url_id:        ', req.url.split("?")[1].split("=")[1].split(":")[1].split("//")[2].split("/")[3]);

    //req.url_id_legnth
    console.log('req.url_length:    ', req.url.split("?")[1].split("=")[1].split(":")[1].split("//")[2].split("/")[3].length);

    //req.url_pdfs
    console.log('req.url_pdfs:      ', req.url.split("?")[1].split("=")[1].split(":")[1].split("//")[2].split("/")[2]);

    //req.url_pdfs_length
    console.log('req.url_pdfs_length:', req.url.split("?")[1].split("=")[1].split(":")[1].split("//")[2].split("/")[2].length);

    //req.url_v1
    console.log('req.url_v1:        ', req.url.split("?")[1].split("=")[1].split(":")[1].split("//")[2].split("/")[1]);

    //req.url_v1_length
    console.log('req.url_v1_length:     ', req.url.split("?")[1].split("=")[1].split(":")[1].split("//")[2].split("/")[1].length);

    //req.url_api
    console.log('req.url_api:       ', req.url.split("?")[1].split("=")[1].split(":")[1].split("//")[2].split("/")[0]);

    //req.url_api_length
    console.log('req.url_api_length:    ', req.url.split("?")[1].split("=")[1].split(":")[1].split("//")[2].split("/")[0].length);

    //target_domain
    console.log('target_domain:         ', req.url.split("?")[1].split("=")[1].split(":")[1].split("/")[2]);

    //target_domain_length
    console.log('target_domain_length:  ', req.url.split("?")[1].split("=")[1].split(":")[1].split("/")[2].length);

    //url_equal_input_param_and_url
    console.log('first_questionmark:    ', req.url.split("?")[1]);

    //target_uri
    console.log('target_uri:        ', req.url.split("?")[1].split("=")[1]);

    //protocol_type
    console.log('protocol_type:         ', req.url.split("?")[1].split("=")[1].split(":")[0]);

    //protocol_type_length
    console.log('protocol_type_length:  ', req.url.split("?")[1].split("=")[1].split(":")[0].length);

    //req.url
    console.log('req.url:       ', req.url);

    //req.url_length
    console.log('requestUrlLength:    ', req.url.length);

    //additionals
    console.log('additionals:       ', req.url.split("?")[2]);

    //additionals_length    
    console.log('additionals_length:    ', req.url.split("?")[2].length);

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
            } else if (config.REQUEST_URL_LENGTH != requestUrlLength) {
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