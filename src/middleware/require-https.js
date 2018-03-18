const createRequireHttps = () => function RequireHttps(req, res, next) {
  if (req.secure) {
    // Allow requests only over https
    logger.info(req);
    return next();
  }

  const err = new Error('Only HTTPS allowed.');
  err.status = 403;
  next(err);
};

module.exports = createRequireHttps;
