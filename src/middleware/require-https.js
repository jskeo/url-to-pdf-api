const createRequireHttps = () => function RequireHttps(req, res, next) {
  if (req.secure) {
    // Allow requests only over https
    console.log(req.url);
    if (req.url.split(":")[0] !== "https") {

		const err = new Error('Only HTTPS allowed.');
		err.status = 403;
		next(err);
	}

	else
    
    return next();
  }

  const err = new Error('Only HTTPS allowed.');
  err.status = 403;
  next(err);
};

module.exports = createRequireHttps;
