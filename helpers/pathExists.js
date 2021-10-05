const fs = require('fs-extra');

exports.pathExists = async (path, nothrow) => {
  try {
    const pathResponse = await fs.pathExists(path);
    // nothrow means it's ok to not find the path, and just return "false"
    if (pathResponse || nothrow) {
      !nothrow && console.log(`Test: path "${path}" exists.`.dim.green);
      return pathResponse;
    }
    throw new Error(`Path "${path}" not found.`);
  } catch {
    throw new Error(`Path "${path}" not found.`);
  }
};
