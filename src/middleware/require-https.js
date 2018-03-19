const config = require('../config');
const createRequireHttps = () => function RequireHttps(req, res, next) {
    if (req.secure) {
        // Allow requests only over https
        // Logging if env is correct
        console.log(config.ALLOW_DOMAIN);
        // Logging request url
        console.log(req.url);
        
        console.log(req.method);
        
        if (req.method !== "GET") {

            const err = new Error('Access denied.');
            err.status = 403;
            err;
        };


        // Cut request url into pieces
        var request_url_splitted = req.url.split("?")[1];

        var request_url_splitted_step_a = request_url_splitted.split("=")[1];

        var request_url_splitted_step_b = request_url_splitted_step_a.split(":")[0];

        // Logging my last resort
        console.log(request_url_splitted_step_a);
        console.log(request_url_splitted_step_a.split(":")[0]);

        // Even more splitting the request url. step_b is protocol type, step_c is target-domain

        var request_url_splitted_step_c = request_url_splitted_step_a.split(":")[1].split("/")[2];

        // var request_url_splitted_step_d = request_url_splitted_step_a.split(":")[1].split("//")[2].split("/")[0];

        // Logging target domain

        console.log(request_url_splitted_step_c);

        // Actual gnarly condition allowing of https

        if (request_url_splitted_step_a.split(":")[0] !== "https") {

            const err = new Error('Only HTTPS allowed.');
            err.status = 403;
            next(err);
        }

        // Actual gnarly condition allowing of only one target domain
        else if (request_url_splitted_step_c !== config.ALLOW_DOMAIN) {

            const err = new Error('Access Denied.');
            err.status = 403;
            next(err);

        } else {
            
        // When all is good, go on

            return next();
        }
    }
    
    // Vanilla Function, should validate https when allow_http is false in env, but doesn't. Main contributors of url-to-pdf-api
    // seem to be working on a fix. In the meantime, I decided to handle this the gnarly way.

    const err = new Error('Only HTTPS allowed.');
    err.status = 403;
    next(err);
};

module.exports = createRequireHttps;
