const fs = require('fs-extra');
const colors = require('colors');

exports.deleteFile = async (path) => {
  // Determine if it is a file or a folder (look for extension)
  const isFile = path.includes('.js');
  try {
    await fs.rm(path, { recursive: true, force: true });
    console.log(`Action: Deleted ${isFile ? 'file' : 'folder'} at "${path}".`.dim.gray);
  } 
  catch (error) {
    console.log('error :', error);
    throw new Error(`Unable to delete ${isFile ? 'file' : 'folder'} at "${path}".`);
  }
};
