const Ddos = require('ddos');
const express = require('express');
const config = require('../config');
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const logger = require('../util/logger')(__filename);
const isHex = require('is-hex');

const createCheckRoutes = () => function checkRoutes(req, res, next) {

	console.log('CHECK ROUTES ACTIVE');
	return next();

};

module.exports = createCheckRoutes;