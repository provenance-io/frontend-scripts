const fs = require('fs-extra');
const colors = require('colors');

exports.createFolder = async (path) => {
  try {
    await fs.emptyDir(path);
    console.log(`Action: Created new empty folder at "${path}".`.dim.gray);
  } catch (err) {
    throw new Error(`Unable to create folder at "${path}". (${err})`);
  }
};
