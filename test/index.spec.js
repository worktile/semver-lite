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