const fs = require('fs-extra');
const colors = require('colors');
// Existing Consts
const { indexText } = require('../consts/indexText.js');
const { paths } = require('../consts/paths.js');

exports.buildConsts = async () => {
  try {
    // Try to find rc file
    const overrides = require('../.pro-scriptsrc.js');
    console.log(`Action: .pro-scriptsrc overides found, consts updated.`.dim.gray);
    // Initial/default consts
    const { paths: rcPaths, indexText: rcIndexText } = overrides;
    // Replace any paths as needed or use the defaults
    const pathRoot = rcPaths.pathRoot || paths.pathRoot;
    const pathRedux = rcPaths.pathRedux || paths.pathRedux;
    const pathComponents = rcPaths.pathComponents || paths.pathComponents;
    const pathActions = rcPaths.pathActions || paths.pathActions;
    const pathReducers = rcPaths.pathReducers || paths.pathReducers;
    const pathHooks = rcPaths.pathHooks || paths.pathHooks;
    const pathReduxStore = rcPaths.pathReduxStore || `${pathRedux}/store.js`;
    const pathComponentsIndex = rcPaths.pathComponentsIndex || `${pathComponents}/index.js`;
    const pathActionsIndex = rcPaths.pathActionsIndex || `${pathActions}/index.js`;
    const pathReducersIndex = rcPaths.pathReducersIndex || `${pathReducers}/index.js`;
    const pathHooksIndex = rcPaths.pathHooksIndex || `${pathHooks}/index.js`;
    // Replace any indexText as needed or use the defaults
    const componentExportText = rcIndexText.componentExportText || indexText.componentExportText;
    const componentImportText = rcIndexText.componentImportText || indexText.componentImportText;
    const actionExportText = rcIndexText.actionExportText || indexText.actionExportText;
    const actionImportText = rcIndexText.actionImportText || indexText.actionImportText;
    const reducerExportText = rcIndexText.reducerExportText || indexText.reducerExportText;
    const reducerImportText = rcIndexText.reducerImportText || indexText.reducerImportText;
    const hookExportText = rcIndexText.hookExportText || indexText.hookExportText;
    const hookImportText = rcIndexText.hookImportText || indexText.hookImportText;
    // Build final consts to return and use
    return {
      paths: {
        pathRoot,
        pathRedux,
        pathComponents,
        pathActions,
        pathReducers,
        pathHooks,
        pathReduxStore,
        pathComponentsIndex,
        pathActionsIndex,
        pathReducersIndex,
        pathHooksIndex,
      },
      indexText: {
        componentExportText,
        componentImportText,
        actionExportText,
        actionImportText,
        reducerExportText,
        reducerImportText,
        hookExportText,
        hookImportText,
      },
    };
  }
  catch (err) {
    if (err instanceof Error && err.code === 'MODULE_NOT_FOUND') {
      console.log(`Action: .pro-scriptsrc not found, using default consts`.dim.gray);
      return {paths, indexText};
    }
    else {
      throw new Error(`Unable to build constants.  Check .pro-scriptsrc.js file format. (${err})`);
    }
  }
};
