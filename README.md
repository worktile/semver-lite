# semver-lite 

**The lightweight semantic versioner compare library**

About Semantic Versioning 2.0.0 http://semver.org

Based on the [node-semver](https://github.com/npm/node-semver) project

1. only support semantic version compare;
2. support browsers;
3. don't support semantic version range compare, if you need please use `node-semver`.

## Installation

`npm install semver-lite --save`

`bower install semver-lite --save`

## Usage

Integral semver version as `1.0.0-beta+20191012` `{main-version}-{pre-release}+{build-version}`

As a node module:
 
```
const semver = require('semver-lite')

semver.validate('2.0.1-beta+20171213'); //true
semver.validate('v2.0.1-beta+20171213'); //true
semver.validate('2.0.1.1'); //false

semver.compare('2.0.1', '1.0.10'); // 1
semver.compare('2.0.1', '2.0.1'); // 0
semver.compare('2.0.1', '3.0.10'); // -1
semver.compare('2.0.0-beta', '2.0.0'); // -1
semver.compare('2.0.0-beta', '2.0.0-1'); // 1
semver.compare('2.0.0-beta', '2.0.0-rc'); // -1
semver.compare('2.0.0-beta+20171013', '2.0.0-beta+20171014'); // 0
semver.compare('2.0.0-beta+20171013', '2.0.0-beta+20171014', true); // -1

semver.gt('2.0.1', '1.0.10'); // true
semver.gt('2.0.1', '3.0.10'); // false
semver.lt('2.0.1', '1.0.10'); // false
semver.lt('2.0.1', '3.0.10'); // true

semver.instance('v1.2.0-2+20171013').mainVersion; // '1.2.0'
semver.instance('v1.2.0-2+20171013').version; // '1.2.0-2+20171013'
semver.instance('v1.2.0-2+20171013').prerelease; // 2
```

As a browser:

`<script src='./dist/semver.js'></script>`

```
semverLite.compare('2.0.1', '1.0.10'); // 1
semverLite.compare('2.0.1', '2.0.1'); // 0
semverLite.compare('2.0.1', '3.0.10'); // -1
semverLite.gt('2.0.1', '1.0.10') // true
semverLite.gt('2.0.1', '3.0.10') // false
semverLite.lt('2.0.1', '1.0.10') // false
semverLite.lt('2.0.1', '3.0.10') // true
```

## Links

http://semver.org

https://github.com/npm/node-semver

## License

[Apache License](https://github.com/worktile/semver-lite/blob/master/LICENSE)
