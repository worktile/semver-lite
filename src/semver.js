const MAX_LENGTH = 256;
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;

// 正则标识
// 数字，禁止纯数字补 0 
const NUMERIC_IDENTIFIER = '0|[1-9]\\d*';
// 数字，字母，横线
const NUMERIC_LETTERS_IDENTIFIER = '[0-9A-Za-z-]*';
const BUILD_IDENTIFIER = `[0-9A-Za-z-]+`;
// 数字和字母组合，达到禁止纯数字补0的目的
const NON_NUMERIC_IDENTIFIER = '\\d*[a-zA-Z-][a-zA-Z0-9-]*';
const MAIN_VERSION_IDENTIFIER = `(${NUMERIC_IDENTIFIER})\\.(${NUMERIC_IDENTIFIER})\\.(${NUMERIC_IDENTIFIER})`;
// 先行版本号，由 ASCII 码的英数字和连接号 [0-9A-Za-z-] 组成，
// 且“禁止 MUST NOT ”留白。数字型的标识符号“禁止 MUST NOT ”在前方补零
const PRERELEASE_IDENTIFIER = `(?:${NUMERIC_IDENTIFIER}|${NON_NUMERIC_IDENTIFIER})`;
const PRERELEASE = `(?:\\-(${PRERELEASE_IDENTIFIER}(?:\\.${PRERELEASE_IDENTIFIER})*))`;
// 编译版本号
const BUILD = `(?:\\+(${BUILD_IDENTIFIER}(?:\\.${BUILD_IDENTIFIER})*))`;
const FULL_VERSION_IDENTIFIER = `^v?${MAIN_VERSION_IDENTIFIER}${PRERELEASE}?${BUILD}?$`;

// 根据正则标识实例化正则
const REGEX_MAIN_VERSION = new RegExp(MAIN_VERSION_IDENTIFIER);
const REGEX_FULL_VERSION = new RegExp(FULL_VERSION_IDENTIFIER);
const REGEX_NUMERIC = /^[0-9]+$/;

class SemverVersion {
    constructor(version) {
        if (version instanceof SemverVersion) {
            return version;
        } else if (typeof version !== 'string') {
            throw new TypeError('Invalid Version: ' + version);
        }

        if (version.length > MAX_LENGTH) {
            throw new TypeError(`version is longer than ${MAX_LENGTH} characters`);
        }

        if (!(this instanceof SemverVersion)) {
            return new SemverVersion(version);
        }

        const matches = version.trim().match(REGEX_FULL_VERSION);

        this.rawVersion = version;

        this.major = +matches[1];
        this.minor = +matches[2];
        this.patch = +matches[3];

        this._isThrowVersionNumericError(this.major, 'major');
        this._isThrowVersionNumericError(this.minor, 'minor');
        this._isThrowVersionNumericError(this.patch, 'patch');

        if (matches[4]) {
            this.prerelease = matches[4].split('.').map(function (id) {
                if (/^[0-9]+$/.test(id)) {
                    var num = +id;
                    if (num >= 0 && num < MAX_SAFE_INTEGER) {
                        return num;
                    }
                }
                return id;
            });
        } else {
            this.prerelease = [];
        }

        this.buildVersion = matches[5];
        this.build = matches[5] ? matches[5].split('.') : [];

    }

    _isThrowVersionNumericError(versionNumber, versionName) {
        if (versionNumber > MAX_SAFE_INTEGER || this.major < 0) {
            throw new TypeError(`Invalid ${versionName} version`);
        }
    }

    _isNumeric(numeric) {
        return REGEX_NUMERIC.test(numeric);
    }

    _padNumber(num, fill) {
        const length = ('' + num).length;
        return (Array(
            fill > length ? fill - length + 1 || 0 : 0
        ).join(0) + num);
    }

    validate(version) {
        return false;
    }

    mainVersionToNumeric(digit) {
        const numericStr = [
            this._padNumber(this.major, digit),
            this._padNumber(this.minor, digit),
            this._padNumber(this.patch, digit),
        ].join('');
        return parseInt(numericStr);
    }

    compare(other, needCompareBuildVersion = false) {
        let otherSemver = other;
        if (!(other instanceof SemverVersion)) {
            otherSemver = new SemverVersion(other);
        }
        const result = this.compareMainVersion(otherSemver) || this.comparePreReleaseVersion(otherSemver);
        if (!result && needCompareBuildVersion) {
            return this.compareBuildVersion(otherSemver);
        } else {
            return result;
        }
    }

    // 比较数字
    compareNumeric(a, b) {
        return a > b ? 1 :
            (a < b ? -1 : 0);
    }

    compareIdentifiers(a, b) {
        const aIsNumeric = this._isNumeric(a);
        const bIsNumeric = this._isNumeric(b);
        if (aIsNumeric && bIsNumeric) {
            a = +a;
            b = +b;
        }
        // 字符比数字大
        if (aIsNumeric && !bIsNumeric) {
            return -1;
        } else if (bIsNumeric && !aIsNumeric) {
            return 1;
        } else {
            return this.compareNumeric(a, b);
        }
    }

    compareMainVersion(otherSemver) {
        return this.compareNumeric(this.major, otherSemver.major)
            || this.compareNumeric(this.minor, otherSemver.minor)
            || this.compareNumeric(this.minor, otherSemver.patch);
    }

    comparePreReleaseVersion(otherSemver) {
        if (this.prerelease.length && !otherSemver.prerelease.length) {
            return -1;
        } else if (!this.prerelease.length && otherSemver.prerelease.length) {
            return 1;
        } else if (!this.prerelease.length && !otherSemver.prerelease.length) {
            return 0;
        }
        let i = 0;
        do {
            const a = this.prerelease[i];
            const b = otherSemver.prerelease[i];
            if (a === undefined && b === undefined) {
                return 0;
            } else if (b === undefined) {
                return 1;
            } else if (a === undefined) {
                return -1;
            } else if (a === b) {
                continue;
            }
            else {
                return this.compareIdentifiers(a, b);
            }
        } while (++i);
    }

    compareBuildVersion(otherSemver) {
        if (this.buildVersion && !otherSemver.buildVersion) {
            return 1;
        } else if (!this.buildVersion && otherSemver.buildVersion) {
            return -1;
        } else {
            return this.compareIdentifiers(this.buildVersion, otherSemver.buildVersion);
        }
    }
}

module.exports = SemverVersion;

