const createRequireHttps = () => function RequireHttps(req, res, next) {
  if (req.secure) {
    // Allow requests only over https
    console.log(req.url);
    console.log(req.url.split(":")[0]);
    var request_url_splitted = req.url.split("?")[1];

    var request_url_splitted_step_a = request_url_splitted.split("=")[1];

    var request_url_splitted_step_b = request_url_splitted_step_a.split(":")[0];
	
    if (request_url_splitted_step_a.split(":")[0] !== "https") {

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
