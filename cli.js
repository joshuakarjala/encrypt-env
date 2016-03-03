#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));

// Generate a 256bit AES key
if (argv._ !== undefined && argv._[0] === 'generate') {
  var randomstring = require('randomstring');
  console.log(randomstring.generate(33));
  process.exit(0);
}

var key = argv.env;
var write = argv.write !== undefined;

var encryptEnv = require('./index')(key);

if (argv.decrypt === true) {
  var d = encryptEnv.decryptEnv(write);
  if(!write) console.log(d);
}
else {
  var e = encryptEnv.encryptEnv(write);
  if(!write) console.log(e);
}

process.exit(0);
