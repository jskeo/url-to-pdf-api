const createRequireHttps = () => function RequireHttps(req, res, next) {
  console.log(req.protocol);
  console.log(req.rawHeaders);
  console.log(req.rawHeaders[22]);
  console.log(req.rawHeaders[23]);
        
  if (req.rawHeaders[22] == 'https') {
    // Allow requests only over https
    return next();
  }

  const err = new Error('Only HTTPS allowed.');
  err.status = 403;
  next(err);
};

module.exports = createRequireHttps;
