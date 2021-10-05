const colors = require('colors');
// Helpers
const { createFolder } = require('../helpers/createFolder.js');
const { copyTemplate } = require('../helpers/copyTemplate.js');
const { pathExists } = require('../helpers/pathExists.js');
const { promptUser } = require('../helpers/promptUser.js');

exports.createComponentFiles = async (consts) => {
  // Consts
  const { paths } = consts;
  const {
    pathRoot,
    pathComponents,
    pathComponentsIndex,
  } = paths;

  try {
    // -------------------------------------
    // Check for existing Component paths
    // -------------------------------------
    let rootExists = await pathExists(pathRoot, 'nothrow');
    let componentsFolderExists = await pathExists(pathComponents, 'nothrow');
    let componentsIndexExists = await pathExists(pathComponentsIndex, 'nothrow');
    // ----------------------------------------------------
    // Make sure one or more of these files are missing
    // ----------------------------------------------------
    // JS turns these bools into numbers (1, 0) when math is done on them.
    const totalFilesToBuild = (!rootExists + !componentsFolderExists + !componentsIndexExists);
    if (!totalFilesToBuild) { throw new Error('All base Component files/folders already exist, nothing to build.'); }
    // ---------------------------------------------------
    // Confirm that the user wants to build these files
    // ---------------------------------------------------
    const { confirm } = await promptUser({ type: 'confirm', name: 'confirm', message: `About to build ${totalFilesToBuild} files/folders, continue?`});
    if (!confirm) { throw new Error('User canceled creation of Component files/folders.')}
    // ----------------------------------
    // If needed, build the src folder
    // ----------------------------------
    if (!rootExists) { await createFolder(`${pathRoot}`); }
    // -----------------------------------------
    // If needed, build the Components folder
    // -----------------------------------------
    if (!componentsFolderExists) { await createFolder(`${pathComponents}`); }
    // -----------------------------------------
    // If needed, build the Components index
    // -----------------------------------------
    if (!componentsIndexExists) { await copyTemplate('componentsIndex.js', `${pathComponents}/index.js`); }
    // -----------------------------------
    // Create Component Files Completed
    // -----------------------------------
    return console.log(`Successfully created ${totalFilesToBuild} Component files/folders.`.brightGreen.bold);
  }
  catch (error) {
    if (error.isTtyError) {
      console.log('Error:  Prompt could not be rendered in the current environment'.red);
    } else {
      console.log(`${error}`.red);
    }
  }
};
