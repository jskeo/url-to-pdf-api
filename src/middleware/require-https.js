const createRequireHttps = () => function RequireHttps(req, res, next) {
    //rawHeaders Array
    console.log('rawHeaders: 	', req.rawHeaders);
    //Accept
    console.log('Accept:   ', req.rawHeaders[9]);
    //AWS Load Balancer
    console.log('X-Forwarded-Proto:   ', req.rawHeaders[23]);
    //AWS Load Balancer
    console.log('X-Forwarded-Port:  ', req.rawHeaders[25]);
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
    
        
  if (req.rawHeaders[23] == 'https') {
    // Allow requests only over https
    return next();
  }

  const err = new Error('Only HTTPS allowed.');
  err.status = 403;
  next(err);
};

module.exports = createRequireHttps;
