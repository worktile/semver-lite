const SemverVersion = require('./semver');

const semver = {
    version: '0.0.3',
    SemverVersion: SemverVersion,
    validate(version) {
        return SemverVersion.validate(version);
    },
    compare(a, b, needCompareBuildVersion) {
        return new SemverVersion(a).compare(new SemverVersion(b), needCompareBuildVersion);
    },
    format(version) {
        return new SemverVersion(version).format();
    },
    instance(version) {
        return new SemverVersion(version);
    },
    compareMainVersion(a, b) {
        return new SemverVersion(a).compareMainVersion(new SemverVersion(b));
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