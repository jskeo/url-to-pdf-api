const createRequireHttps = () => function RequireHttps(req, res, next) {
  if (req.secure) {
    // Allow requests only over https
    console.log(req.url);
 
    var request_url_splitted = req.url.split("?")[1];

    var request_url_splitted_step_a = request_url_splitted.split("=")[1];

    var request_url_splitted_step_b = request_url_splitted_step_a.split(":")[0];
	  
    console.log(request_url_splitted_step_a.split(":")[0]);
	  
    console.log(request_url_splitted_step_a);
	
    if (request_url_splitted_step_a.split(":")[0] !== "https") {

		const err = new Error('Only HTTPS allowed.');
		err.status = 403;
		next(err);
	}

	else {

		var request_url_splitted_step_c = request_url_splitted_step_a.split(":")[1].split("/")[2];
		
		var request_url_splitted_step_d = request_url_splitted_step_a.split(":")[1].split("//")[2].split("/")[0];

		console.log(request_url_splitted_step_c);

		if (request_url_splitted_step_c !== "admin.bottimmo.de") {

		const err = new Error('Access Denied.');
		err.status = 403;
		return err;

	}
    
    return next();
  }

  const err = new Error('Only HTTPS allowed.');
  err.status = 403;
  next(err);
};

module.exports = createRequireHttps;
