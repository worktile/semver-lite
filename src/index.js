const SemverVersion = require('./semver');

const semver = {
    version: '0.0.5',
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
    gte(a, b, needCompareBuildVersion) {
        const result = this.compare(a, b, needCompareBuildVersion);
        return result === 1 || result === 0;
    },
    lt(a, b, needCompareBuildVersion) {
        const result = this.compare(a, b, needCompareBuildVersion);
        return result === -1;
    },
    lte(a, b, needCompareBuildVersion) {
        const result = this.compare(a, b, needCompareBuildVersion);
        return result === -1 || result === 0;
    },
    equal(a, b, needCompareBuildVersion) {
        const result = this.compare(a, b, needCompareBuildVersion);
        return result === 0;
    },
    equalMain(a, b) {
        return (new SemverVersion(a)).mainVersion === (new SemverVersion(b)).mainVersion;
    },
    // 主版本转成数字类型方便比较
    mainVersionToNumeric(version, digit = 6) {
        const semverVersion = new SemverVersion(version);
        return semverVersion.mainVersionToNumeric(digit);
    }
};

module.exports = semver;