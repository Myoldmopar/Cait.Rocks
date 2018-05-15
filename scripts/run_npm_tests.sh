#!/usr/bin/env bash

if [ -z ${TRAVIS+x} ]; then
    # Travis is not set, yarn install should already have been done on this development machine, just run tests
    export DISPLAY=:0
    yarn test -- --browsers Chrome  # Firefox was really slow and always had the same results as Chrome
    exit $?
else
    # Travis is set, need to set up the headless stuff, make sure we install npm dependencies, and then run tests
    yarn install
    export DISPLAY=:99.0
    sh -e /etc/init.d/xvfb start
    yarn test -- --browsers Firefox  # Travis doesn't have Chrome
    exit $?
fi
