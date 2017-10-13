# semver-lite [![Build Status](https://api.travis-ci.org/worktile/semver-lite.svg?branch=master)](https://travis-ci.org/worktile/semver-lite)


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
semver.compareMainVersion('2.0.0-beta', '2.0.0-rc'); // 0
semver.compareMainVersion('2.0.1-beta', '2.0.0-rc'); // 1

semver.gt('2.0.1', '1.0.10'); // true
semver.gt('2.0.1', '3.0.10'); // false
semver.gte('2.0.1', '1.0.10'); // true
semver.gte('2.0.1', '2.0.1'); // true
semver.lt('2.0.1', '1.0.10'); // false
semver.lt('2.0.1', '3.0.10'); // true
semver.lte('2.0.1', '1.0.10'); // false
semver.lte('2.0.1', '2.0.1'); // true

semver.mainVersionToNumeric('1.10.12, 4); // 100100012 , 1 0010 0012
semver.mainVersionToNumeric('1.10.12', 6); // 1000010000012 , 1 000010 000012

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
## Notes

compare,gt,gte,lt,lte has thirdly third optional parameter `needCompareBuildVersion` what mark wheather compare build version, default is `false`.

```
// default false don't compare build version `20171014`
semver.compare('2.0.0+20171013', '2.0.0+20171014'); // 0
// compare build version `20171014`
semver.compare('2.0.0+20171013', '2.0.0+20171014', true); // -1
```

## Links

http://semver.org

https://github.com/npm/node-semver

## License

[Apache License](https://github.com/worktile/semver-lite/blob/master/LICENSE)
