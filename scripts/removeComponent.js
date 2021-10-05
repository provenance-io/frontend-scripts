const colors = require('colors');
// Helpers
const { pathExists } = require('../helpers/pathExists.js');
const { promptUser } = require('../helpers/promptUser.js');
const { deleteFile } = require('../helpers/deleteFile.js');
const { isCamelCase } = require('../helpers/isCamelCase.js');
const { cleanIndex } = require('../helpers/cleanIndex.js');
const { buildConsts } = require('../helpers/buildConsts.js');

exports.removeComponent = async () => {
  try {
    // -----------------------------------------
    // Check for .v-scriptrc.js file overrides
    // -----------------------------------------
    const consts = await buildConsts();
    // Consts
    const { paths, indexText } = consts;
    const {
      pathRoot,
      pathRedux,
      pathComponents,
      pathActions,
      pathReducers,
      pathHooks,
      pathComponentsIndex,
      pathActionsIndex,
      pathReducersIndex,
      pathHooksIndex,
    } = paths;
    const {
      componentExportText,
      actionExportText,
      actionImportText,
      reducerExportText,
      reducerImportText,
      hookExportText,
    } = indexText;

    let totalFilesModified = 0;
    // -----------------
    // Check root paths
    // -----------------
    await pathExists(pathRoot);
    const reduxPathExists = await pathExists(pathRedux, 'nothrow');
    let reduxActionsPathExists = false;
    let reduxReducersPathExists = false;
    let reduxHooksPathExists = false;
    let reduxActionsIndexExists = false;
    let reduxReducersIndexExists = false;
    let reduxHooksIndexExists = false;
    if (reduxPathExists) {
      reduxActionsPathExists = await pathExists(pathActions, 'nothrow');
      reduxReducersPathExists = await pathExists(pathReducers, 'nothrow');
      reduxHooksPathExists = await pathExists(pathHooks, 'nothrow');
      reduxActionsIndexExists = await pathExists(pathActionsIndex, 'nothrow');
      reduxReducersIndexExists = await pathExists(pathReducersIndex, 'nothrow');
      reduxHooksIndexExists = await pathExists(pathHooksIndex, 'nothrow');
    }
    // -------------------------
    // Get Components name
    // -------------------------
    const { name } = await promptUser({ type: 'input', name: 'name', message: "Name of Component to remove?"})
    if (!isCamelCase(name)) throw new Error(`Component name must be camel case, you entered "${name}".`);
    const lowercaseName = name.substring(0, 1).toLowerCase() + name.substring(1);
    // -----------------------------------
    // Get all paths for Component files
    // -----------------------------------
    const reduxComponentActionPath = `${pathActions}/${lowercaseName}Actions.js`;
    const reduxComponentReducerPath = `${pathReducers}/${lowercaseName}Reducer.js`;
    const reduxComponentHookPath = `${pathHooks}/use${name}.js`;
    // -------------------------------------------
    // Check which files of this Component exist
    // -------------------------------------------
    const componentExists = await pathExists(pathComponents, 'nothrow');
    const componentsIndexExists = await pathExists(pathComponentsIndex, 'nothrow');
    // ------------------------------------------------------------
    // Variables determining if certain redux paths/files exist
    // ------------------------------------------------------------
    let reduxComponentActionExists = false;
    let reduxComponentReducerExists = false;
    let reduxComponentHookExists = false;
    // ----------------------------------------------
    // If Component has redux files find each one
    // ----------------------------------------------
    if (reduxActionsPathExists) { reduxComponentActionExists = await pathExists(reduxComponentActionPath, 'nothrow'); }
    if (reduxReducersPathExists) { reduxComponentReducerExists = await pathExists(reduxComponentReducerPath, 'nothrow'); }
    if (reduxHooksPathExists) { reduxComponentHookExists = await pathExists(reduxComponentHookPath, 'nothrow'); }
    // --------------------------------------------
    // Assemble array of files/folders to delete
    // --------------------------------------------
    const deleteList = [];
    if (componentExists) deleteList.push(componentPath);
    if (reduxComponentActionExists) deleteList.push(reduxComponentActionPath);
    if (reduxComponentReducerExists) deleteList.push(reduxComponentReducerPath);
    if (reduxComponentHookExists) deleteList.push(reduxComponentHookPath);
    // ------------------------------------
    // Delete each folder with Component
    // ------------------------------------
    const deleteListCount = deleteList.length;
    // Note: if we don't have anything to delete just end this function
    if (!deleteListCount) { throw new Error(`"${name}" has no files or folders to remove.`); }
    const { confirm } = await promptUser({ type: 'confirm', name: 'confirm', message: `Are you sure you want to delete the Component "${name}" (${deleteListCount} files/folders).`})
    if (confirm) {
      for (const path of deleteList) {
        await deleteFile(path);
        totalFilesModified += 1;
      }
    } else { throw new Error(`User canceled removal of Component "${name}".`); }
    // ---------------------------------------------------------
    // Clean up any index files with references to Component
    // ---------------------------------------------------------
    if (componentsIndexExists) {
      const targetString = componentExportText(name);
      await cleanIndex(componentsIndexPath, targetString);
      totalFilesModified += 1;
    }
    if (reduxActionsIndexExists) {
      const targetString = [`${lowercaseName}Actions,`, actionImportText(lowercaseName)];
      await cleanIndex(reduxActionsIndexPath, targetString);
      totalFilesModified += 1;
    }
    if (reduxReducersIndexExists) {
      const targetString = [`${lowercaseName}Reducer,`, reducerImportText(lowercaseName)];
      await cleanIndex(reduxReducersIndexPath, targetString);
      totalFilesModified += 1;
    }
    if (reduxHooksIndexExists) {
      const targetString = hookExportText(name);
      await cleanIndex(reduxHooksIndexPath, targetString);
      totalFilesModified += 1;
    }
    // -----------------------------
    // Remove Component Completed
    // ----------------------------- 
    return console.log(`Successfully removed "${name}" Component (Modified/Deleted ${totalFilesModified} files).`.brightGreen.bold);
  }
  catch (error) {
    if (error?.isTtyError) {
      console.log('Error:  Prompt could not be rendered in the current environment'.red);
    } else {
      console.log(`${error}`.red);
    }
  }
};
