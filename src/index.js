const SemverVersion = require('./semver');

const semver = {
    version: '1.0.0',
    SemverVersion: SemverVersion,
    compare(a, b, needCompareBuildVersion) {
        return new SemverVersion(a).compare(new SemverVersion(b), needCompareBuildVersion);
    },
    gt(a, b, needCompareBuildVersion) {
        const result = this.compare(a, b, needCompareBuildVersion);
        return result === 1;
    },
    lt(a, b, needCompareBuildVersion) {
        const result = this.compare(a, b, needCompareBuildVersion);
        return result === -1;
    },
    // 主版本转成数字类型方便比较
    mainVersionToNumeric(version, digit = 4) {
        const semverVersion = new SemverVersion(version);
        return semverVersion.mainVersionToNumeric(digit);
    }
};

module.exports = semver;