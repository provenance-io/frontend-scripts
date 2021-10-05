const fs = require('fs-extra');
const colors = require('colors');

const removeStrings = async (path, targetString) => {
  const multiString = Array.isArray(targetString);
  try {
    const data = await fs.readFile(path, 'utf-8')
    const trimData = data.trim();
    let updatedIndexData = trimData;
    const removeString = value => {
      // If the string isn't found, do nothing
      if (!updatedIndexData.includes(value)) return;
      const stringIndexStart = updatedIndexData.indexOf(value);
      const stringIndexEnd = stringIndexStart + value.length;
      const updatedIndexDataBefore = updatedIndexData.substring(0, stringIndexStart);
      const updatedIndexDataAfter = updatedIndexData.substring(stringIndexEnd);
      updatedIndexData = updatedIndexDataBefore + updatedIndexDataAfter;
    };
    multiString ? targetString.forEach(string => removeString(string)) : removeString(targetString);
    return updatedIndexData;
  }
  catch (error) {
    throw new Error(error || `Unable to clean "${path}".`)
  }
};

exports.cleanIndex = async (path, targetString) => {
  try {
    const updatedIndexData = await removeStrings(path, targetString);
    await fs.writeFile(path, updatedIndexData, 'utf-8');
    return console.log(`Action: Cleaned and updated "${path}".`.dim.gray);
  }
  catch (error) {
    throw new Error(error || `Unable to clean "${path}".`)
  }
};