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

test('version 1.10111.12 is validated', async t => {
    t.is(SemverVersion.validate('1.10111.12'), true);
});

// validate

test('validate version v1.10111.12 return true', async t => {
    t.is(SemverVersion.validate('v1.10111.12'), true);
});

test('validate version 1.10111.12-beta+20171013 return true', async t => {
    t.is(SemverVersion.validate('1.10111.12-beta+20171013'), true);
});

test('validate version 1.10111a.12-beta+20171013 return false', async t => {
    t.is(SemverVersion.validate('1.10111a.12-beta+20171013'), false);
});

test('validate version 1.0.0.1 return false', async t => {
    t.is(SemverVersion.validate('1.10111a.12-beta+20171013'), false);
});