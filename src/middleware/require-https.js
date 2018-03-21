
const config = require('../config');

const createRequireHttps = () => function RequireHttps(req, res, next) {
    //rawHeaders Array
    console.log('rawHeaders: 	', req.rawHeaders);
    //Accept
    console.log('Accept:   ', req.rawHeaders[9]);
    //AWS Load Balancer
    console.log('X-Forwarded-Proto:   ', req.rawHeaders[21]);
    //AWS Load Balancer
    console.log('X-Forwarded-Port:  ', req.rawHeaders[23]);
    //request_url
    console.log('request_url: 		', req.url);
    //request_url_length
    console.log('request_url_length: 	', req.url.length);
    //request_method should be GET
    console.log('request_method: 	', req.method);
    //original_url
    console.log('originalUrl: 	', req.originalUrl);
    //parsed_url
    console.log('_parsedUrl: 	', req._parsedUrl);
    //params
    console.log('params' 	,req.params);
 	//query
    console.log('query 		', req.query);
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
    console.log('first_questionmark:    ',req.url.split("?")[1]);

    //target_uri
    console.log('target_uri:        ', req.url.split("?")[1].split("=")[1]);

    //protocol_type
    console.log('protocol_type:         ', req.url.split("?")[1].split("=")[1].split(":")[0]);

    //protocol_type_length
    console.log('protocol_type_length:  ', req.url.split("?")[1].split("=")[1].split(":")[0].length);

    //req.url
    console.log('req.url:       ', req.url);

    //req.url_length
    console.log('req.url_length:    ', req.url.length);
    
    //additionals
    console.log('additionals:       ', req.url.split("?")[2]);

    //additionals_length    
    console.log('additionals_length:    ', req.url.split("?")[2].length);

    // Allow requests only over https
  if (req.url.split("?")[1].split("=")[1].split(":")[0] === 'https') {
    if (config.ALLOW_POSTS === 'false') {
        if (req.method !== GET) {
            const err = new Error('Invalid Request.');
            err.status = 403;
            return next(err);
            }   
            if (req.url.split("?")[1].split("=")[1].split(":")[1].split("/")[2] !== config.TARGET_DOMAIN) {
                        const err = new Error('Invalid Request.');
                        err.status = 403;
                        return next(err);
                        } 
                        if (req.url.length !== config.REQUEST_URL_LENGTH) {
                            const err = new Error('Invalid Request.');
                            err.status = 403;
                            return next(err); 
                            }
                            
                            return next();
  
    }
} else { 

  const err = new Error('Only HTTPS allowed.');
  err.status = 403;
  next(err);

}
};

module.exports = createRequireHttps;
