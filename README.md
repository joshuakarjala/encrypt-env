# encrypt-env
Share encrypted environment files through Git

- [Basic usage as CLI tool](https://github.com/joshuakarjala/encrypt-env#basic-usage-as-cli-tool)
- [In code usage](https://github.com/joshuakarjala/encrypt-env#in-code-usage)

# Basic usage as CLI tool
`encrypt-env` looks for a file named `.encrypt-env.json` which is a map of your different environments and their encryption.

```json
{
	"PRODUCTION": {
		"aesKey": "~/.ssh/foo.prod.aes",
		"envFile": ".prod.env"
	},
	"DEVELOPMENT": {
		"aesKey": "~/.ssh/foo.dev.aes",
		"envFile": ".dev.env"
	},
	"STAGING": {
		"aesKey": "~/.ssh/foo.dev.aes",
		"envFile": ".staging.env"
	}
}
```

You can now use the `encrypt-env` CLI to encrypt and decrypt you environment files:

```shell
# decrypt .dev.env.enc and write result to .dev.env
encrypt-env --decrypt --env DEVELOPMENT --write

# decrypt .dev.env.enc and print to console (don't write)
encrypt-env --decrypt --env DEVELOPMENT

# encrypt .dev.env and write result to .dev.env.enc
encrypt-env --env DEVELOPMENT --write

# encrypt .dev.env and print to console (don't write)
encrypt-env --env DEVELOPMENT
```

Add these commands to your `package.json` or CLI build tool to automatically decrypt your environment at teste / deploy time


# In code usage
You can also use `encrypt-env` directly in code without having your AES keys on the filesystem.

```javascript
var encryptEnv = require('encrypt-env')('DEVELOPMENT', {
  "DEVELOPMENT": '6MTPfGGW3GbiW1JG5F1lP9T723MMleRJU'
});

// where encryptedEnv is an encrypted string
var decryptedEnv = encryptEnv.decryptEnv(false, encryptedEnv);
```
