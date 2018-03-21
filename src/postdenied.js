function postRequestDenied() {
    const err = new Error('Invalid Request. 7');
    err.status = 403;
    return next(err);
};

module.exports = postdenied;