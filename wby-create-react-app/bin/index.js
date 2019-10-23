#!/usr/bin/env node

'use strict';
// console.log(process.version)
var currentNodeVersion = process.version;
var semver = currentNodeVersion.split('.');
var major = semver[0];

if (major < 8) {
    console.error(
        'You are running Node ' +
        currentNodeVersion +
        '.\n' +
        'Create React App requires Node 8 or higher. \n' +
        'Please update your version of Node.'
    );
    process.exit(1);
}

require('../createApp')