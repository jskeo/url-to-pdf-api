const err = new Error('Invalid Request.');
            err.status = 403;
            return next(err);

module.exports = postRequestDenied;