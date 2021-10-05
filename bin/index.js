#!/usr/bin/env node
const colors = require('colors');
const { version } = require('../package.json');
const { createCommand } = require('../scripts/createCommand.js');
const { removeComponent } = require('../scripts/removeComponent.js');

const { argv } = process;
// argv will pass [executable, script, flags]
const [executable, script, flags] = argv;

switch (flags) {
  case '-v': // fallthrough
  case '-version': // fallthrough
  case 'version': {
    console.log(`pro-scripts version: ${version}`.dim.green);
    break;
  }
  case '-r': // fallthrough
  case '-remove': // fallthrough
  case 'remove': {
    removeComponent();
    break;
  }
  case '-c': // fallthrough
  case '-create': // fallthrough
  case 'create': {
    createCommand();
    break;
  }
  default: console.log('Unknown command.  Pro-scripts possible commands: -v (version), -c (create), -r (remove)'.dim.yellow);
};
