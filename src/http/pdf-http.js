const _ = require('lodash');
const ex = require('../util/express');
const pdfCore = require('../core/pdf-core');

const getRender = ex.createRoute((req, res) => {
  if (req.method !== 'GET') {
    ex.throwStatus(400, 'Access denied');
  }
  const opts = getOptsFromQuery(req.query);
  return pdfCore.render(opts)
    .then((data) => {
      if (opts.attachmentName) {
        res.attachment(opts.attachmentName);
      }
      res.set('content-type', 'application/pdf');
      res.send(data);
    });
});

const postRender = ex.createRoute((req, res) => {
  const isBodyJson = req.headers['content-type'] === 'application/json';
  if (isBodyJson) {
    ex.throwStatus(400, 'JSON denied');
  
    if (!hasContent) {
      ex.throwStatus(400, 'Body must contain url or html');
    }
  } else if (_.isString(req.query.url)) {
    ex.throwStatus(400, 'url query parameter is not allowed when body is HTML');
  }

  let opts;
  if (isBodyJson) {
    ex.throwStatus(400, 'JSON denied');
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
    attachmentName: query.attachmentName,
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
