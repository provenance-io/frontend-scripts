const fs = require('fs-extra');

exports.appendIndex = async (type, name, consts) => {
  const typeCapitalized = type[0].toUpperCase() + type.substring(1);
  const { indexText, paths } = consts;
  const importTextFunc = indexText[`${type}ImportText`];
  const exportTextFunc = indexText[`${type}ExportText`];  
  const indexFilePath = paths[`path${typeCapitalized}sIndex`];
  const importText = importTextFunc(name);
  const exportText = exportTextFunc(name);

  try { 
    const data = await fs.readFile(indexFilePath, 'utf-8')
    let updatedIndexData;
    const trimData = data.trim();
    switch (type) {
      case 'component':
        // Just append to the end of the exports
        updatedIndexData = trimData.concat(`\n${exportText}\n`);
        break;
      case 'action': {
        const searchString = 'export {';
        if (!trimData.includes(searchString)) { throw new Error(`Unable to build "${type}/index.js", missing "${searchString}".`); }
        let splitIndex = trimData.indexOf(searchString);
        // Update import section
        updatedIndexData = trimData.substring(0, splitIndex - 1) + `${importText}\n\n` + trimData.substring(splitIndex);
        // Update export section
        splitIndex = updatedIndexData.trim().indexOf('};');
        updatedIndexData = updatedIndexData.trim().substring(0, splitIndex - 1) + `\n\t${exportText}\n` + updatedIndexData.trim().substring(splitIndex);
        break;
      }
      case 'hook':
        // Just append to the end of the exports
        updatedIndexData = trimData.concat(`\n${exportText}\n`);
        break;
      case 'reducer': {
        const searchString = 'const rootReducer = {';
        if (!trimData.includes(searchString)) { throw new Error(`Unable to build "${type}/index.js", missing "${searchString}".`); }
        let splitIndex = trimData.indexOf(searchString);
        // Update import section
        updatedIndexData = trimData.substring(0, splitIndex - 1) + `${importText}\n\n` + trimData.substring(splitIndex);
        // Update export section
        splitIndex = updatedIndexData.trim().indexOf('};');
        updatedIndexData = updatedIndexData.trim().substring(0, splitIndex - 1) + `\n\t${exportText}\n` + updatedIndexData.trim().substring(splitIndex);
        break;
      }
      default: break;
    }
    return await fs.writeFile(indexFilePath, updatedIndexData, 'utf-8');
  } catch (error) {
    throw new Error(error || `Unable to build "${type}/index.js".`)
  }
};