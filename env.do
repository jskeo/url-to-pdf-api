#!/bin/bash

# Guide:
#
# 1. Copy this file to .env
#
#    cp .env-sample .env
#
# 2. Fill the blanks

export NODE_ENV=production
export PORT=9000
export ALLOW_HTTP=false
export ALLOW_POST=false
export DEBUG_MODE=false
export FILE_NAME=Online-Wohnmarkt-Analyse.pdf
export REQUEST_ID_LENGTH=20
export REQUEST_URL_LENGTH=88
export REQUEST_URL_LENGTH_TESTING=92
export REQUEST_URL_LENGTH_WITHOUT_FLAG=75
export REQUEST_URL_LENGTH_WITHOUT_FLAG_TESTING=79
export TARGET_DOMAIN=admin.bottimmo.de
export TARGET_DOMAIN_TESTING=bottimo.herokuapp.com
export SAVES_PATH=/src/saves
export WORKING_DIRECTORY=/var/www/url-to-pdf-api

# Warning: PDF rendering does not work in Chrome when it is in headed mode.
#export DEBUG_MODE=false

echo "Environment variables set!"