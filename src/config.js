/* eslint-disable no-process-env */

// Env vars should be casted to correct types
const config = {
  PORT: Number(process.env.PORT) || 9000,
  NODE_ENV: process.env.NODE_ENV,
  LOG_LEVEL: process.env.LOG_LEVEL,
  ALLOW_HTTP: process.env.ALLOW_HTTP === 'false',
  DEBUG_MODE: process.env.DEBUG_MODE === 'true',
  ALLOW_POST: process.env.ALLOW_POST === 'false',
  ALLOW_DOMAIN: process.env.ALLOW_DOMAIN,
  TARGET_DOMAIN: process.env.TARGET_DOMAIN,
  REQUEST_URL_LENGTH: process.env.REQUEST_URL_LENGTH,
  REQUEST_URL_LENGTH_WITHOUT_FLAG: process.env.REQUEST_URL_LENGTH_WITHOUT_FLAG,
  ADDITIONAL_FLAG: process.env.ADDITIONAL_FLAG,
  API_TOKENS: [],
};

if (process.env.API_TOKENS) {
  config.API_TOKENS = process.env.API_TOKENS.split(',');
}

module.exports = config;
