#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var key = argv.env;

var encryptEnv = require('./index')(key);

if (argv.decrypt === true) encryptEnv.decryptEnv(argv.write);
else encryptEnv.encryptEnv(key);
