#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));

if (argv._ !== undefined && argv._[0] === 'generate') {
  var randomstring = require('randomstring');
  console.log(randomstring.generate(33));
  process.exit(0);
}

var key = argv.env;

var encryptEnv = require('./index')(key);

if (argv.decrypt === true) encryptEnv.decryptEnv(argv.write);
else encryptEnv.encryptEnv(argv.write);
