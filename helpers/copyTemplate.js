const fs = require('fs-extra');
const colors = require('colors');
const { fillTemplate } = require('./fillTemplate.js');

exports.copyTemplate = async (templateName, targetLocation, componentName) => {
  try {
    await fs.copy(`${__dirname}/../templates/${templateName}`, targetLocation);
    console.log(`Action: Copied template "${templateName}" to "${targetLocation}".`.dim.gray);
    return fillTemplate(targetLocation, componentName);
  } catch {
    throw new Error(`Unable to copy "${templateName}" template to "${targetLocation}".`);
  }
};
