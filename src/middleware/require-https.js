const createRequireHttps = () => function RequireHttps(req, res, next) {
  if (req.x-forwarded-proto ='https') {
    // Allow requests only over https
    return next();
  }

  const err = new Error('Only HTTPS allowed.');
  err.status = 403;
  next(err);
};

module.exports = createRequireHttps;
