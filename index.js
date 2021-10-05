#!/usr/bin/env node
const { createCommand } = require('./scripts/createCommand.js');
const { removeComponent } = require('./scripts/removeComponent.js');

exports.createCommand = createCommand;
exports.removeComponent = removeComponent;
