const createRequireHttps = () => function RequireHttps(req, res, next) {
    //rawHeaders Array
    console.log('rawHeaders: 	', req.rawHeaders);
    //Accept
    console.log('Accept:   ', req.rawHeaders[9]);
    
        
  if (req.rawHeaders[21] == 'https') {
    // Allow requests only over https
    return next();
  }

  const err = new Error('Only HTTPS allowed.');
  err.status = 403;
  next(err);
};

module.exports = createRequireHttps;
