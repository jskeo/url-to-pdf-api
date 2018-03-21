
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
    //request_protocol
    console.log('request_protocol:       ', req.url.split("?")[1]);
    //request_protocol_length
    console.log('request_protocol_length:       ', req.url.split("?")[1].length);
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
    //target_domain
    console.log('target_domain:         ', req.url.split("?")[1].split("=")[1].split(":")[1].split("/")[2]);

    console.log('what       ', req.url.split("?")[1].split("=")[1]);

  
    //undefinded

    console.log('request_url_undef:     ', req.url.split("=")[1].split(":")[1].split("//")[2].split("/")[0].split(":")[1].split("//")[2].split("/")[4]);    


    //id

    console.log('request_url_id:    ', req.url.split("=")[1].split(":")[1].split("//")[2].split("/")[0].split(":")[1].split("//")[2].split("/")[3]);    

    //request_url_id_legnth

    console.log('request_url_length:    ', req.url.split("=")[1].split(":")[1].split("//")[2].split("/")[0].split(":")[1].split("//")[2].split("/")[3].length); 

    //request_url_pdfs

    console.log('request_url_pdfs:  ', req.url.split("=")[1].split(":")[1].split("//")[2].split("/")[0].split(":")[1].split("//")[2].split("/")[2]);    

    //request_url_pdfs_length

    console.log('request_url_pdfs_length:', req.url.split("=")[1].split(":")[1].split("//")[2].split("/")[0].split(":")[1].split("//")[2].split("/")[2].length);    

    //request_url_v1

    console.log('request_url_v1:    ', req.url.split("=")[1].split(":")[1].split("//")[2].split("/")[0].split(":")[1].split("//")[2].split("/")[1]);    

    //request_url_v1_length

    console.log('request_url_v1_length:     ', req.url.split("=")[1].split(":")[1].split("//")[2].split("/")[0].split(":")[1].split("//")[2].split("/")[1].length); 

    //request_url_api

    console.log('request_url_api:   ', req.url.split("=")[1].split(":")[1].split("//")[2].split("/")[0]);

    //request_url_api

    console.log('request_url_api_length:   ', req.url.split("=")[1].split(":")[1].split("//")[2].split("/")[0].length);

        
  if (req.url.split("?")[1] == 'https') {
    // Allow requests only over https
    return next();
  }

  const err = new Error('Only HTTPS allowed.');
  err.status = 403;
  next(err);
};

module.exports = createRequireHttps;
