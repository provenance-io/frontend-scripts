const fs = require('fs-extra');
const colors = require('colors');

exports.fillTemplate = async (readFilePath, replaceValue) => {
  try {
    // Nothing to replace, just cloning template as-is
    if (!replaceValue) return;
    const data = await fs.readFile(readFilePath, 'utf-8');
    // Need to run the find and replace 3x to handle all cases
    let newFile = data.replace(new RegExp('TEMPLATE', 'g'), replaceValue.toUpperCase());
    newFile = newFile.replace(new RegExp('Template', 'g'), replaceValue); 
    newFile = newFile.replace(new RegExp('template', 'g'), replaceValue.toLowerCase());
    await fs.writeFile(readFilePath, newFile, 'utf-8');
    console.log(`Action: Populated template values for "${readFilePath}".`.dim.gray);
  }
  catch {
    throw new Error(`Unable to fill template from "${readFilePath}".`);
  }
};
