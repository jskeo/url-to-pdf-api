const _ = require('lodash');
const validate = require('express-validation');
const express = require('express');
const pdf = require('./http/pdf-http');
const config = require('./config');
const logger = require('./util/logger')(__filename);
const { renderQuerySchema, renderBodySchema, sharedQuerySchema } = require('./util/validation');

function postRequestDenied() {
    const err = new Error('Invalid Request.');
    err.status = 403;
    return err;
};

function createRouter() {
    const router = express.Router();

    if (!_.isEmpty(config.API_TOKENS)) {
        logger.info('x-api-key authentication required');

        router.use('/*', (req, res, next) => {
            const userToken = req.headers['x-api-key'];
            if (!_.includes(config.API_TOKENS, userToken)) {
                const err = new Error('Invalid API token in x-api-key header.');
                err.status = 401;
                return next(err);
            }

            return next();
        });
    } else {
        logger.info('Security Enhanced URL-TO-PDF-API modded by Jrm. Info: X-API-KEY option is switched off');
    }


    const getRenderSchema = {
        query: renderQuerySchema,
        options: {
            allowUnknownBody: false,
            allowUnknownQuery: false,
        },
    };

    router.get('/api/render', validate(getRenderSchema), pdf.getRender);

    // const postRenderSchema = {
    //   body: renderBodySchema,
    //   query: sharedQuerySchema,
    //   options: {
    //     allowUnknownBody: false,
    //     allowUnknownQuery: false,

    //     // Without this option, text body causes an error
    //     // https://github.com/AndrewKeig/express-validation/issues/36
    //     contextRequest: true,
    //   },
    // };

    //original route
    //router.post('/api/render', validate(postRenderSchema), pdf.postRender);

    const postRenderSchema = {
        body: renderBodySchema,
        query: sharedQuerySchema,
        options: {
            allowUnknownBody: false,
            allowUnknownQuery: false,

            // Without this option, text body causes an error
            // https://github.com/AndrewKeig/express-validation/issues/36
            contextRequest: true,
        },
    };

    if (config.ALLOW_POSTS === 'true') {
        logger.warn('POST Requests allowed. Set this vaule to false to disable.');

        router.post('/api/render', validate(postRenderSchema), pdf.postRender);

    } else {

        logger.info('Security Enhanced URL-TO-PDF-API modded by Jrm. Info: POST Requests option is switched off by default.');

        router.post('/api/render', validate(postRenderSchema), pdf.postRequestDenied())

    };


    return router;
}

module.exports = createRouter;