const _ = require('lodash');
const ex = require('../util/express');
const config = require('../config');
const pdfCore = require('../core/pdf-core');
const pageTitle = config.FILE_NAME;
const logger = require('../util/logger')(__filename);

const getRender = ex.createRoute((req, res) => {
  const opts = getOptsFromQuery(req.query);

  return pdfCore.render(opts)
    .then((data) => {
      if (opts.attachmentName) {
        res.attachment(opts.attachmentName);
      }
      res.set('content-type', 'application/pdf');
      //cache-control headers
      res.set('Cache-Control', 'public, max-age=10800000'); // 34560 30 seconds, 345600 4 days, 10800000 3h
      res.set('Expires', new Date(Date.now() + 10800000).toUTCString());
      //
      res.send(data);
      //console.log('res.headers: ', res.req.headers);
      logger.info(`X-Forwarded-For: ${req.get('X-Forwarded-For')} .. `);
      logger.info(`Status Code: ${res.statusCode} | Status Message ${res.statusMessage} | Response time ${res.get('X-Response-Time')} ..`);
      console.log('req.headers: ', req.headers);
      console.log('res: ', res._headers);
      //console.log('res.get(): ');
      //console.log(req.get('X-Forwarded-For'));
      //console.log('res.statusCode: ', res.statusCode);
      //console.log('res.statusMessage: ', res.statusMessage);
    });
});

const postRender = ex.createRoute((req, res) => {
  const isBodyJson = req.headers['content-type'] === 'application/json';
  if (isBodyJson) {
    const hasContent = _.isString(_.get(req.body, 'url')) || _.isString(_.get(req.body, 'html'));
    if (!hasContent) {
      ex.throwStatus(400, 'Body must contain url or html');
    }
  } else if (_.isString(req.query.url)) {
    ex.throwStatus(400, 'url query parameter is not allowed when body is HTML');
  }

  let opts;
  if (isBodyJson) {
    opts = _.cloneDeep(req.body);
  } else {
    opts = getOptsFromQuery(req.query);
    opts.html = req.body;
  }

  return pdfCore.render(opts)
    .then((data) => {
      if (opts.attachmentName) {
        res.attachment(opts.attachmentName);
      }
      res.set('content-type', 'application/pdf');
      res.send(data);
    });
});

function getOptsFromQuery(query) {
  const opts = {
    url: query.url,
    attachmentName: config.FILE_NAME,
    scrollPage: query.scrollPage,
    emulateScreenMedia: query.emulateScreenMedia,
    ignoreHttpsErrors: query.ignoreHttpsErrors,
    waitFor: query.waitFor,
    viewport: {
      width: query['viewport.width'],
      height: query['viewport.height'],
      deviceScaleFactor: query['viewport.deviceScaleFactor'],
      isMobile: query['viewport.isMobile'],
      hasTouch: query['viewport.hasTouch'],
      isLandscape: query['viewport.isLandscape'],
    },
    goto: {
      timeout: query['goto.timeout'],
      waitUntil: query['goto.waitUntil'],
      networkIdleInflight: query['goto.networkIdleInflight'],
      networkIdleTimeout: query['goto.networkIdleTimeout'],
    },
    pdf: {
      path: query['pdf.path'],
      scale: query['pdf.scale'],
      displayHeaderFooter: query['pdf.displayHeaderFooter'],
      landscape: query['pdf.landscape'],
      pageRanges: query['pdf.pageRanges'],
      format: query['pdf.format'],
      width: query['pdf.width'],
      height: query['pdf.height'],
      margin: {
        top: query['pdf.margin.top'],
        right: query['pdf.margin.right'],
        bottom: query['pdf.margin.bottom'],
        left: query['pdf.margin.left'],
      },
      printBackground: query['pdf.printBackground'],
    },
  };
  return opts;
}

module.exports = {
  getRender,
  postRender,
};
