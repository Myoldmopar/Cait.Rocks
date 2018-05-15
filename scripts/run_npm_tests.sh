#!/usr/bin/env bash

# Chrome was really slow and always had the same results as Firefox, and Travis doesn't have Chrome by default,
# so we're just going to always use only Firefox

if [ -z ${TRAVIS+x} ]; then
    # Travis is not set, yarn install should already have been done on this development machine, just run tests
    export DISPLAY=:0
    yarn test -- --browsers Firefox
    exit $?
else
    # Travis is set, need to set up the headless stuff, make sure we install npm dependencies, and then run tests
    yarn install
    export DISPLAY=:99.0
    sh -e /etc/init.d/xvfb start
    yarn test -- --browsers Firefox
    exit $?
fi
