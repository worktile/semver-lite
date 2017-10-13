const test = require('ava');
const semver = require('../src/index');
// const old = require('../src/old');

test('compare 2.0.0 > 1.0.0 return 1', async t => {
    t.is(semver.compare('2.0.0', '1.0.0'), 1);
});

test('compare 1.0.0 < 2.0.0 return -1', async t => {
    t.is(semver.compare('1.0.0', '2.0.0'), -1);
});

test('compare 1.0.0 = 1.0.0 return 0', async t => {
    t.is(semver.compare('1.0.0', '1.0.0'), 0);
});

test('compare 1.1.0 > 1.0.10 return 1', async t => {
    t.is(semver.compare('1.1.0', '1.0.10'), 1);
});

test('compare 1.0.0-beta > 1.0.0 return -1', async t => {
    t.is(semver.compare('1.0.0-beta', '1.0.0'), -1);
});

test('compare 1.0.0-beta > 1.0.0-1 return 1', async t => {
    t.is(semver.compare('1.0.0-beta', '1.0.0-1'), 1);
});

test('compare 1.0.0-rc > 1.0.0-beta return 1', async t => {
    t.is(semver.compare('1.0.0-rc', '1.0.0-beta'), 1);
});

test('compare 1.0.0-beta < 1.0.0-rc return -1', async t => {
    t.is(semver.compare('1.0.0-beta', '1.0.0-rc'), -1);
});

test('compare 1.0.0+1 < 1.0.0+2 return 0', async t => {
    t.is(semver.compare('1.0.0+1', '1.0.0+2'), 0);
});

test('compare 1.0.0+1 < 1.0.0+2 with build version return -1', async t => {
    t.is(semver.compare('1.0.0+1', '1.0.0+2', true), -1);
});


test('2.0.0 gt 1.0.0 return true', async t => {
    t.is(semver.gt('2.0.0', '1.0.0'), true);
});

test('2.0.0 gt 2.0.0 return false', async t => {
    t.is(semver.gt('2.0.0', '2.0.0'), false);
});

test('2.0.0 gt 3.0.0 return false', async t => {
    t.is(semver.gt('2.0.0', '3.0.0'), false);
});


test('1.0.0 lt 2.0.0 return true', async t => {
    t.is(semver.lt('1.0.0', '2.0.0'), true);
});

test('2.0.0 lt 2.0.0 return false', async t => {
    t.is(semver.lt('2.0.0', '2.0.0'), false);
});

test('3.0.0 lt 2.0.0 return true', async t => {
    t.is(semver.lt('3.0.0', '2.0.0'), false);
});

test('version 1.10.12-beta+20130222 main version to numeric is 100100012', async t => {
    t.is(semver.mainVersionToNumeric('1.10.12'), 100100012);
});

test('version 1.10111.12 main version to numeric is 1101110012', async t => {
    t.is(semver.mainVersionToNumeric('1.10111.12'), 1101110012);
});

test('compare main version 1.0.0-rc and 1.0.0-beta return 0', async t => {
    t.is(semver.compareMainVersion('1.0.0-rc', '1.0.0-beta'), 0);
});

test('compare main version 1.2.0-2+123 and 1.0.10-beta return 1', async t => {
    t.is(semver.compareMainVersion('1.2.0-2+123', '1.0.10-beta'), 1);
});

test('get version 1.2.0-2+20171013 is 1.2.0-2+20171013', async t => {
    t.is(semver.instance('1.2.0-2+20171013').version, '1.2.0-2+20171013');
});

test('get version v1.2.0-2+20171013 is 1.2.0-2+20171013', async t => {
    t.is(semver.instance('v1.2.0-2+20171013').version, '1.2.0-2+20171013');
});

test('get main version 1.2.0-2+20171013 is 1.2.0-2', async t => {
    t.is(semver.instance('1.2.0-2+20171013').mainVersion, '1.2.0');
});

test('get main version v1.2.0-2+20171013 is 1.2.0', async t => {
    t.is(semver.instance('v1.2.0-2+20171013').mainVersion, '1.2.0');
});