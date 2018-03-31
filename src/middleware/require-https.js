const Ddos = require('ddos');
const express = require('express');
const config = require('../config');
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const logger = require('../util/logger')(__filename);
const isHex = require('is-hex');

const createRequireHttps = () => function RequireHttps(req, res, next) {

        try {
            logger.info(`rawHeaders: ${req.rawHeaders} .. `);
            //console.log('Req: ', req);
        } catch (error) {
            const err = new Error('Invalid Request.');
            err.status = 403;
            return next(err);
        }
        //Accept
        try {
            logger.info(`Accept: ${req.get('Accept')} .. `);
        } catch (error) {
            const err = new Error('Invalid Request.');
            err.status = 403;
            return next(err);
        }

        //AWS Load Balancer
        try {
            logger.info(`X-Forwarded-For: ${req.get('X-Forwarded-For')} .. `);
        } catch (error) {
            const err = new Error('Invalid Request.');
            err.status = 403;
            return next(err);
        }
        //Target Protocol
        try {
            logger.info(`Target Proto: ${req.url.split("?")[1].split("=")[1].split(":")[0]} .. `);
        } catch (error) {
            const err = new Error('Invalid Request.');
            err.status = 403;
            return next(err);
        }
        //request_url
        try {
            logger.info(`request_url: ${req.url} .. `);
        } catch (error) {
            const err = new Error('Invalid Request.');
            err.status = 403;
            return next(err);
        }
        //request_url_length
        try {
            logger.info(`request_url_length: ${req.url.length} .. `);
        } catch (error) {
            const err = new Error('Invalid Request.');
            err.status = 403;
            return next(err);
        }
        //Check if method is GET, request_method should be GET
        try {
            logger.info(`request_method: ${req.method} .. `);
            if (req.method != "GET") {
                const err = new Error('Invalid Request. I');
                err.status = 403;
                return next(err);
            }
        } catch (error) {
            const err = new Error('Invalid Request. II');
            err.status = 403;
            return next(err);
        }
        //original_url
        try {
            logger.info(`originalUrl: ${req.originalUrl} .. `);
        } catch (error) {
            const err = new Error('Invalid Request.');
            err.status = 403;
            return next(err);
        }
        //parsed_url
        try {
            console.log('_parsedUrl:    ', req._parsedUrl);
        } catch (error) {
            const err = new Error('Invalid Request.');
            err.status = 403;
            return next(err);
        }
        //params
        try {
            console.log('params', req.params);
        } catch (error) {
            const err = new Error('Invalid Request Params.');
            err.status = 403;
            return next(err);
        }
        //query
        try {
            console.log('query      ', req.query);
        } catch (error) {
            const err = new Error('Invalid Request Query.');
            err.status = 403;
            return next(err);
        }

        //path to api
        try {
            logger.info(`requestPathApi: ${req.url.split("?")[0]} .. `);
            var requestApiPath = req.url.split("?")[0];
            logger.info(`requestPathApi: ${requestApiPath} .. `);
            logger.info(`requestPathApi Length: ${requestApiPath.length} .. `);
            var check_path = '/api/render';
            logger.info(`check_path: ${check_path} .. `);
            if (requestApiPath == check_path) {
                logger.info(`requestPathToApi OK .. `);
            } else {
                const err = new Error('Invalid Request Path.');
                err.status = 403;
                return next(err);
            }

        } catch (error) {
            const err = new Error('Invalid Request Path.');
            err.status = 403;
            return next(err);
        }



        try {
            var requestStruc_a = req.url.split("?")[1].split("=")[1].split(":")[1].split("//")[2].split("/")[0];
            var requestStruc_b = req.url.split("?")[1].split("=")[1].split(":")[1].split("//")[2].split("/")[1];
            var requestStruc_c = req.url.split("?")[1].split("=")[1].split(":")[1].split("//")[2].split("/")[2];
            if (
                requestStruc_a == 'api' &&
                requestStruc_b == 'v1' &&
                requestStruc_c == 'pdfs'
            ) {
                logger.info(`Request API path structure OK .. `);
            } else {
                const err = new Error('Invalid Request Query. 1');
                err.status = 403;
                return next(err);
            }
        } catch (error) {
            const err = new Error('Invalid Request Query. 2');
            err.status = 403;
            return next(err);
        };


            try {
                var target = req.url.split("?")[1].split("=")[1].split(":")[1].split("/")[2];
                var requestUrl = req.url;
                var requestUrlLength = requestUrl.length;
                var requestId = req.url.split("?")[1].split("=")[1].split(":")[1].split("//")[2].split("/")[3];
                var requestIdLength = requestId.length;
                var requestPathToApi = req.url.split("?")[0];
                var requestPathToApiLength = requestPathToApi.length;
                console.log(requestPathToApiLength);
                // Logging my last resot
                console.log('ENV TARGET_DOMAIN :    ', config.TARGET_DOMAIN);
                console.log('ENV REQUEST_URL_LENGTH :       ', config.REQUEST_URL_LENGTH);
                console.log('ENV REQUEST_URL_LENGTH_WITHOUT_FLAG :       ', config.REQUEST_URL_LENGTH_WITHOUT_FLAG);
                console.log('ENV TARGET_DOMAIN_TESTING :    ', config.TARGET_DOMAIN_TESTING);
                console.log('ENV REQUEST_URL_LENGTH_TESTING :       ', config.REQUEST_URL_LENGTH_TESTING);
                console.log('ENV REQUEST_URL_LENGTH_WITHOUT_FLAG_TESTING :       ', config.REQUEST_URL_LENGTH_WITHOUT_FLAG_TESTING);
                console.log(target);
                console.log('requestUrl:        ', requestUrl);
                console.log(requestUrlLength);
                console.log(requestId);
                console.log('is Hex?', isHex(requestId));
                console.log(requestIdLength);
                if (requestIdLength == 20) {
                    console.log('requestIdLength check pass', requestIdLength);
                }
                else if (requestIdLength == 28) {
                    var requestUrl = req.url.replace("&", "?");
                    var requestId = requestUrl.split("?")[1].split("=")[1].split(":")[1].split("//")[2].split("/")[3];
                    var requestIdLength = requestId.length;
                    var sendgridFlag = requestUrl.split("?")[2];
                    var sendgridFlagLength = sendgridFlag.length;
                    console.log('Flag:', sendgridFlag);
                    //must be length 12
                    console.log(sendgridFlagLength);
                    console.log('prepared requestID', requestId)
                } else {
                    const err = new Error('Invalid Request. ID 6');
                    err.status = 403;
                    return next(err);

                }
                

            } catch (error) {
                const err = new Error('Invalid Request. 6');
                err.status = 403;
                return next(err);
            }


        // Allow requests only over https
        if (req.url.split("?")[1].split("=")[1].split(":")[0] === 'https') {
            // Cut request into pieces
            // Check TARGET_DOMAIN ENV Var matches target domain, check length of ID and target route 
            if (requestUrlLength == config.REQUEST_URL_LENGTH || requestUrlLength == config.REQUEST_URL_LENGTH_TESTING) {
                if (config.TARGET_DOMAIN == target || config.TARGET_DOMAIN_TESTING == target) {
                    if (requestPathToApiLength == 11) {
                        if (requestIdLength == config.REQUEST_ID_LENGTH) {

                            if (requestUrlLength == config.REQUEST_URL_LENGTH || requestUrlLength == config.REQUEST_URL_LENGTH_TESTING) {
                            // When all is fine go on
                            console.log('requestUrlLength from inside: ', requestUrlLength);
                            console.log('REQUEST_URL_LENGTH from inside: ', config.REQUEST_URL_LENGTH);
                            console.log('REQUEST_URL_LENGTH_TESTING from inside: ', config.REQUEST_URL_LENGTH_TESTING);
                            console.log('with Flag');
                            var sendgridFlag = requestUrl.split("?")[2];
                            var sendgridFlagLength = sendgridFlag.length;
                            console.log('Flag:', sendgridFlag);
                            //must be length 12
                            console.log(sendgridFlagLength);
                            if (sendgridFlagLength == 12 && sendgridFlag == 'utm_swu=4551') {
                                req.url = requestUrl;
                                req.originalUrl = req.url;
                                req.query = { url: req.url.split("?url=")[1] };
                                console.log(req.url);
                                console.log(req.query);
                                console.log('Inside with Flag, req:');
                                console.log(req.path);
                                console.log(req.originalUrl);
                                console.log(req._parsedUrl);
                                //console.log(req);

                                return next();
                            } else {
                                const err = new Error('Invalid Request. 4 IV');
                                err.status = 403;
                                return next(err);

                            }
                            
                            }   else {
                                // Request ID Length error
                                const err = new Error('Invalid Request. 4 III');
                                err.status = 403;
                                return next(err);
                            }

                        } else {
                            // Request ID Length error
                            const err = new Error('Invalid Request. 4');
                            err.status = 403;
                            return next(err);
                        }
                    } else {
                        //RequestPathToApiLength error
                        const err = new Error('Invalid Request. 10');
                        err.status = 403;
                        return next(err);
                    }

                } else {
                    //Target Domain mismatch
                    const err = new Error('Invalid Request. 2');
                    err.status = 403;
                    return next(err);
                }
            } else if (requestUrlLength == config.REQUEST_URL_LENGTH_WITHOUT_FLAG || requestUrlLength == config.REQUEST_URL_LENGTH_WITHOUT_FLAG_TESTING) {

                if (config.TARGET_DOMAIN == target || config.TARGET_DOMAIN_TESTING == target) {
                    if (requestPathToApiLength == 11) {
                        if (requestIdLength == config.REQUEST_ID_LENGTH) {
                            if (requestUrlLength == config.REQUEST_URL_LENGTH_WITHOUT_FLAG || requestUrlLength == config.REQUEST_URL_LENGTH_WITHOUT_FLAG_TESTING) {
                            console.log('requestUrlLength from inside II: ', requestUrlLength);
                            console.log('REQUEST_URL_LENGTH_WITHOUT_FLAG from inside: ', config.REQUEST_URL_LENGTH_WITHOUT_FLAG);
                            console.log('REQUEST_URL_LENGTH_WITHOUT_FLAG_TESTING from inside: ', config.REQUEST_URL_LENGTH_WITHOUT_FLAG_TESTING);
                            console.log('without Flag');
                            console.log('Inside without Flag, req.url, req.query:')
                            //console.log(req);
                            console.log(req.url);
                            console.log(req.query);
                            console.log('Inside without Flag, req.path, req.originalUrl, req_parsedUrl:');
                            console.log(req.path);
                            console.log(req.originalUrl);
                            console.log(req._parsedUrl);
                            req_url = req.url.split("?url=")[1];
                            console.log('req_url', req_url);
                            
                            return next();

                





                            }   else {
                                // Request ID Length error
                                const err = new Error('Invalid Request. 4 IV');
                                err.status = 403;
                                return next(err);
                            }


                        } else {
                            // Request ID Length error
                            const err = new Error('Invalid Request. 41');
                            err.status = 403;
                            return next(err);
                        }
                    } else {
                        //RequestPathToApiLength error
                        const err = new Error('Invalid Request. 10 II');
                        err.status = 403;
                        return next(err);
                    }

                } else {
                    //Target Domain mismatch
                    const err = new Error('Invalid Request. 2 II');
                    err.status = 403;
                    return next(err);
                }
            } else {
                    // Request Length mismatch
                    const err = new Error('Invalid Request. 3');
                    err.status = 403;
                    return next(err);
                }
            } else {
                // When protocol is not HTTPS
                const err = new Error('Only HTTPS allowed.');
                err.status = 403;
                return next(err);
            }
        };

        module.exports = createRequireHttps;