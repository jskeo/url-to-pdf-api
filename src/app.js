const Ddos = require('ddos');
var favicon = require('serve-favicon');
var path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const compression = require('compression');
const cors = require('cors');
const logger = require('./util/logger')(__filename);
const errorResponder = require('./middleware/error-responder');
const errorLogger = require('./middleware/error-logger');
const requireHttps = require('./middleware/require-https');
const createRouter = require('./router');
const config = require('./config');
const sixtyDaysInSeconds = 5184000;
const ddos = new Ddos({burst:2, limit:3});
const queue = require('express-queue');
const nodeFip = require('node-fip');
const responseTime = require('response-time');
var time = require('time')(Date);
var d = new Date();
d.setTimezone('Europe/Amsterdam');


function createApp() {


  const app = express();
  // App is served behind Heroku's router.
  // This is needed to be able to use req.ip or req.secure
  app.enable('trust proxy', 1);
  app.disable('x-powered-by');

  //console.log('BLACKLIST_ARRAY:', config.BLACKLIST_ARRAY);

  app.use(nodeFip({
    mode: 'blacklist',
    proxy: false,
    ips: ['23.101.61.176', '54.85.176.102', '52.71.192.87', '52.91.127.96', '54.164.194.74', '52.91.66.162', '52.71.220.216']
  }));


  app.use(ddos.express);

  //console.log('DDOS_DefaultParams: ', ddos.defaultParams.errormessage.express);

  // if (config.NODE_ENV !== 'production') {
  //   app.use(morgan('dev'));
  // }
  
  
  app.use(favicon(path.join(__dirname, 'images', 'favicon.ico')));

  app.use(responseTime());

  app.use(queue({ activeLimit: 1, queuedLimit: -1 }));

  app.use(express.static('saves'));

  logger.info('All requests require HTTPS.');
  app.use(requireHttps());

  
  // if (!config.ALLOW_HTTP) {
  //   logger.info('All requests require HTTPS.');
  //   app.use(requireHttps());
  // } else {
  //   logger.info('ALLOW_HTTP=true, unsafe requests are allowed. Don\'t use this in production.');
  // }

  const corsOpts = {
  origin: config.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH'],
  };

  logger.info('Using CORS options:', corsOpts);
  app.use(cors(corsOpts));

  // Limit to 10mb if HTML has e.g. inline images
  app.use(bodyParser.text({ limit: '4mb', type: 'text/html' }));
  app.use(bodyParser.json({ limit: '4mb' }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(expressSanitizer()); 

  app.use(compression({
    // Compress everything over 10 bytes
    threshold: 10,
  }));




  // Initialize routes
  const router = createRouter();

  app.use('/', router);

  app.use(errorLogger());
  app.use(errorResponder());


  return app;
}

module.exports = createApp;
