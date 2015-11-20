var fs = require('fs')
var ursa = require('ursa')
var path = require('path');

require('dotenv').config({path: path.join(__dirname, '.env_key')});

module.exports = function () {
  var that = {};
  var HOME = process.env.HOME || process.env.USERPROFILE;

  that.decryptEnv = function () {
    var encryptedEnv = fs.readFileSync(path.join(__dirname, '.env'));

    var privateKeyFile = fs.readFileSync(path.join(HOME, process.env.ENV_PRIVATE_KEY));
    var privateKey = ursa.createPrivateKey(privateKeyFile);

    var encryptedLines = encryptedEnv.toString().split('\n');

    var lines = encryptedLines.map(function (line) {
      return privateKey.decrypt(line, 'base64', 'utf8');
    });

    fs.writeFileSync(path.join(__dirname, '.decrypted_env'), lines.join('\n'));
    require('dotenv').config({path: path.join(__dirname, '.decrypted_env')});
  };

  that.encryptEnv = function () {
    var decryptedEnv = fs.readFileSync(path.join(__dirname, '.decrypted_env'));

    var lines = decryptedEnv.toString().split('\n');

    var publicKeyFile = fs.readFileSync(path.join(HOME, process.env.ENV_PUBLIC_KEY));
    var publicKey = ursa.openSshPublicKey(publicKeyFile.toString());

    var encryptedLines = lines.map(function (line) {
      return publicKey.encrypt(line, 'utf8', 'base64');
    });

    fs.writeFileSync(path.join(__dirname, '.env'), encryptedLines.join('\n'));
  };

  return that;
};
