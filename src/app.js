const Ddos = require('ddos');
var favicon = require('serve-favicon');
var path = require('path');
const getExpeditiousCache = require('express-expeditious');
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
var queue = require('express-queue');
var nodeFip = require('node-fip');
 


function createApp() {

  const cache = getExpeditiousCache({
  // Namespace used to prevent cache conflicts, must be alphanumeric
  namespace: 'expresscache',

  // Store cache entries for 1 minute (can also pass milliseconds e.g 60000)
  defaultTtl: '1 minute'
  });

  const app = express();
  // App is served behind Heroku's router.
  // This is needed to be able to use req.ip or req.secure
  app.enable('trust proxy', 1);
  app.disable('x-powered-by');

  console.log('BLACKLIST_ARRAY:', config.BLACKLIST_ARRAY);

  app.use(nodeFip({
    mode: 'blacklist',
    proxy: false,
    ips: config.BLACKLIST_ARRAY
  }));


  app.use(ddos.express);

  //console.log('DDOS_DefaultParams: ', ddos.defaultParams.errormessage.express);

  // if (config.NODE_ENV !== 'production') {
  //   app.use(morgan('dev'));
  // }
  
  
  app.use(favicon(path.join(__dirname, 'images', 'favicon.ico')));

  app.use(queue({ activeLimit: 1, queuedLimit: -1 }));

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

  //

  // the initial call to this will take 2 seconds, but any subsequent calls
  // will receive a response instantly from cache for the next hour
  app.get('/', cache.withTtl('1 hour'), (req, res) => {
    app.use('/', router);
  });

  // Cache everything below this line for 1 minute (defaultTtl)
  app.use(cache);

  //

  app.use('/', router);

  app.use(errorLogger());
  app.use(errorResponder());

  return app;
}

module.exports = createApp;
