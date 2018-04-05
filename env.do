#!/bin/bash

export NODE_ENV=production
export PORT=9000
export ALLOW_HTTP=false
export ALLOW_POST=false
export DEBUG_MODE=false
export FILE_NAME=Online-Marktwert-Analyse.pdf
export REQUEST_ID_LENGTH=20
export REQUEST_URL_LENGTH=88
export REQUEST_URL_LENGTH_TESTING=92
export REQUEST_URL_LENGTH_WITHOUT_FLAG=75
export REQUEST_URL_LENGTH_WITHOUT_FLAG_TESTING=79
export TARGET_DOMAIN=admin.bottimmo.de
export TARGET_DOMAIN_TESTING=bottimo.herokuapp.com
export SAVES_PATH=/src/saves
export SAVES_SUB_PATH=/Marktwert-Analyse
export WORKING_DIRECTORY=/var/www/url-to-pdf-api


echo "Environment variables set!"