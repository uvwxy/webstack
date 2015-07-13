#!/bin/bash

# This is a simple makefile to generate the service file

GEN_JS=app/js/thrift/gen-js
GEN_NODE_JS=app_server/gen-nodejs

thrift -gen js:angular=mysimpleapp --out $GEN_JS        service.thrift
thrift -gen js:node                --out $GEN_NODE_JS   service.thrift