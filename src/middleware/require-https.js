const createRequireHttps = () => function RequireHttps(req, res, next) {
  console.log(req.protocol);
  console.log(req);
  console.log(req.params[0]);
  console.log(req.params[1]);
  console.log(req.params[2]);
        
  if (req.protocol == 'https') {
    // Allow requests only over https
    return next();
  }

  const err = new Error('Only HTTPS allowed.');
  err.status = 403;
  next(err);
};

module.exports = createRequireHttps;
