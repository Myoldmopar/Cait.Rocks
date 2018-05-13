#!/usr/bin/env bash

if [ -z ${TRAVIS+x} ]; then
  # Travis is not set, npm install should already have been done on this development machine, just run tests
  :
else
  # Travis is set, need to set up the headless stuff, make sure we install npm dependencies, and then run tests
  :

fi

npm install
export DISPLAY=:99.0
sh -e /etc/init.d/xvfb start
npm test
exit $?
