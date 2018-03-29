/* eslint-disable no-process-env */

// Env vars should be casted to correct types
const config = {
  // PORT: 6379,
  PORT: Number(process.env.PORT) || 9000,
  NODE_ENV: process.env.NODE_ENV,
  LOG_LEVEL: process.env.LOG_LEVEL,
  ALLOW_HTTP: process.env.ALLOW_HTTP === 'false',
  DEBUG_MODE: process.env.DEBUG_MODE === 'true',
  ALLOW_POST: process.env.ALLOW_POST === 'false',
  TARGET_DOMAIN: process.env.TARGET_DOMAIN,
  REQUEST_URL_LENGTH: process.env.REQUEST_URL_LENGTH,
  REQUEST_URL_LENGTH_WITHOUT_FLAG: process.env.REQUEST_URL_LENGTH_WITHOUT_FLAG,
  TARGET_DOMAIN_TESTING: process.env.TARGET_DOMAIN_TESTING,
  REQUEST_URL_LENGTH_TESTING: process.env.REQUEST_URL_LENGTH_TESTING,
  REQUEST_URL_LENGTH_WITHOUT_FLAG_TESTING: process.env.REQUEST_URL_LENGTH_WITHOUT_FLAG_TESTING,
  REQUEST_ID_LENGTH: process.env.REQUEST_ID_LENGTH,
  FILE_NAME: process.env.FILE_NAME,
  API_TOKENS: [],
};

if (process.env.API_TOKENS) {
  config.API_TOKENS = process.env.API_TOKENS.split(',');
}

module.exports = config;
