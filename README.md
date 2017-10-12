# semver-lite The lightweight semantic versioner compare library

About Semantic Versioning 2.0.0 http://semver.org

Based on the [node-semver](https://github.com/npm/node-semver) project

1. only support semantic version compare
2. support front end

## Installation

`npm install semver-lite --save`

`bower install semver-lite --save`

## Usage

As a node module:

```
const semver = require('semver-lite')

semver.valid('1.2.3') // '1.2.3'
semver.valid('a.b.c') // null
semver.clean(' v1.2.3   ') // '1.2.3'
semver.satisfies('1.2.3', '1.x || >=2.5.0 || 5.0.0 - 7.2.3') // true
semver.gt('1.2.3', '9.8.7') // false
semver.lt('1.2.3', '9.8.7') // true
```

As a bower module:

<script></script>

## Links

http://semver.org

https://github.com/npm/node-semver

## License

[Apache License](https://github.com/worktile/semver-lite/blob/master/LICENSE)
