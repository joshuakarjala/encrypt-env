#!/usr/bin/env node

var encryptEnv = require('./index')();

var op = process.argv[2];

if (op === '--decrypt') encryptEnv.decryptEnv();
else encryptEnv.encryptEnv();
