const colors = require('colors');
// Helpers
const { createFolder } = require('../helpers/createFolder.js');
const { copyTemplate } = require('../helpers/copyTemplate.js');
const { pathExists } = require('../helpers/pathExists.js');
const { promptUser } = require('../helpers/promptUser.js');

exports.createReduxStoreFiles = async (consts) => {
  // Consts
  const { paths } = consts;
  const {
    pathRoot,
    pathRedux,
    pathReduxStore,
    pathActions,
    pathReducers,
    pathHooks,
    pathActionsIndex,
    pathReducersIndex,
    pathHooksIndex,
  } = paths;

  try {
    // ---------------------------------------
    // Check for existing Redux store paths
    // ---------------------------------------
    let rootExists = await pathExists(pathRoot, 'nothrow');
    let reduxFolderExists = await pathExists(pathRedux, 'nothrow');
    let reduxStoreExists = await pathExists(pathReduxStore, 'nothrow');
    let reduxActionsFolderExists = await pathExists(pathActions, 'nothrow');
    let reduxReducersFolderExists = await pathExists(pathReducers, 'nothrow');
    let reduxHooksFolderExists = await pathExists(pathHooks, 'nothrow');
    let reduxActionsIndexExists = await pathExists(pathActionsIndex, 'nothrow');
    let reduxReducersIndexExists = await pathExists(pathReducersIndex, 'nothrow');
    let reduxHooksIndexExists =await pathExists(pathHooksIndex, 'nothrow');
    // ----------------------------------------------------
    // Make sure one or more of these files are missing
    // ----------------------------------------------------
    // JS turns these bools into numbers (1, 0) when math is done on them.
    const totalFilesToBuild = (
      !rootExists +
      !reduxFolderExists +
      !reduxStoreExists +
      !reduxActionsFolderExists +
      !reduxReducersFolderExists +
      !reduxHooksFolderExists +
      !reduxActionsIndexExists +
      !reduxReducersIndexExists +
      !reduxHooksIndexExists
    );
    if (!totalFilesToBuild) { throw new Error('All base Redux files/folders already exist, nothing to build.'); }
    // ---------------------------------------------------
    // Confirm that the user wants to build these files
    // ---------------------------------------------------
    const { confirm } = await promptUser({ type: 'confirm', name: 'confirm', message: `About to build ${totalFilesToBuild} files/folders, continue?`});
    if (!confirm) { throw new Error('User canceled creation of Redux files/folders.')}
    // ----------------------------------
    // If needed, build the src folder
    // ----------------------------------
    if (!rootExists) { await createFolder(`${pathRoot}`); }
    // -----------------------------------------
    // If needed, build the Redux folder
    // -----------------------------------------
    if (!reduxFolderExists) { await createFolder(`${pathRedux}`); }
    // -------------------------------------------------------------------
    // If needed, build the Redux Actions, Reducers, and hooks folders
    // -------------------------------------------------------------------
    if (!reduxActionsFolderExists) { await createFolder(`${pathActions}`); }
    if (!reduxReducersFolderExists) { await createFolder(`${pathReducers}`); }
    if (!reduxHooksFolderExists) { await createFolder(`${pathHooks}`); }
    // --------------------------------------
    // If needed, build the Redux store.js
    // --------------------------------------
    if (!reduxStoreExists) { await copyTemplate('reduxStore.js', `${pathRedux}/store.js`); }
    // -----------------------------------------------------------------
    // If needed, build the Redux actions index and xhrActions file
    // -----------------------------------------------------------------
    if (!reduxActionsIndexExists) { await copyTemplate('reduxActionsIndex.js', `${pathActions}/index.js`); }
    if (!reduxActionsIndexExists) { await copyTemplate('xhrActions.js', `${pathActions}/xhrActions.js`); }
    // -------------------------------------------------------------
    // If needed, build the Redux hooks index and useRedux file
    // -------------------------------------------------------------
    if (!reduxReducersIndexExists) { await copyTemplate('reduxReducerIndex.js', `${pathReducers}/index.js`); }
    // -------------------------------------------------------------
    // If needed, build the Redux hooks index and useRedux file
    // -------------------------------------------------------------
    if (!reduxHooksIndexExists) { await copyTemplate('reduxHooksIndex.js', `${pathHooks}/index.js`); }
    if (!reduxHooksIndexExists) { await copyTemplate('useRedux.js', `${pathHooks}/useRedux.js`); }
    // -----------------------------------
    // Create Component Files Completed
    // -----------------------------------
    return console.log(`Successfully created ${totalFilesToBuild} Redux files/folders.`.brightGreen.bold);
  }
  catch (error) {
    if (error?.isTtyError) {
      console.log('Error:  Prompt could not be rendered in the current environment'.red);
    } else {
      console.log(`${error}`.red);
    }
  }
};
