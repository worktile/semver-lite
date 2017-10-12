const test = require('ava');
const SemverVersion = require('../src/semver');

test('version 1.10.12-beta+20130222 main version to numeric is 100100012', async t => {
    const semverVersion = new SemverVersion('1.10.12');
    t.is(semverVersion.mainVersionToNumeric(4), 100100012);
});

test('version 1.10111.12 main version to numeric is 1101110012', async t => {
    const semverVersion = new SemverVersion('1.10111.12');
    t.is(semverVersion.mainVersionToNumeric(4), 1101110012);
});