const colors = require('colors');
// Helpers
const { copyTemplate } = require('../helpers/copyTemplate.js');
const { pathExists } = require('../helpers/pathExists.js');
const { promptUser } = require('../helpers/promptUser.js');
const { appendIndex } = require('../helpers/appendIndex.js');

exports.createReduxStore = async (consts) => {
  // Consts
  const { paths } = consts;
  const {
    pathRoot,
    pathRedux,
    pathActions,
    pathReducers,
    pathHooks,
    pathActionsIndex,
    pathReducersIndex,
    pathHooksIndex,
  } = paths;

  try {
    // -----------------
    // Check root paths
    // -----------------
    await pathExists(pathRoot);
    await pathExists(pathRedux);
    await pathExists(pathActions);
    await pathExists(pathReducers);
    await pathExists(pathHooks);
    await pathExists(pathActionsIndex);
    await pathExists(pathReducersIndex);
    await pathExists(pathHooksIndex);
    // ---------------
    // Get Store name
    // ---------------
    const { name } = await promptUser({ type: 'input', name: 'name', message: "What is this Redux store's name?"})
    const lowercaseName = name.substring(0, 1).toLowerCase() + name.substring(1);
    // ----------------------------------------
    // Make sure Store doesn't already exist
    // ----------------------------------------
    const storeAlreadyExists = await pathExists(`${pathReducers}/${name}`, 'nothrow');
    if (storeAlreadyExists) { throw new Error(`Unable to create Redux store "${name}", it already exists.`)}
    else { console.log(`Test: "${name}" Redux store doesn't already exist.`.dim.green); }
    // --------------------------------------------
    // Update index files, then update templates
    // --------------------------------------------
    await appendIndex('action', `${lowercaseName}Actions`, consts);
    await appendIndex('hook', `use${name}`, consts);
    await appendIndex('reducer', `${lowercaseName}Reducer`, consts);
    await copyTemplate('actions.js', `${pathActions}/${lowercaseName}Actions.js`, name);
    await copyTemplate('hooks.js', `${pathHooks}/use${name}.js`, name);
    await copyTemplate('reducers.js', `${pathReducers}/${lowercaseName}Reducer.js`, name);
    // ------------------------
    // Create Redux Completed
    // ------------------------
    return console.log(`Successfully created "${name}" Redux store.`.brightGreen.bold);
  }
  catch (error) {
    if (error.isTtyError) {
      console.log('Error:  Prompt could not be rendered in the current environment'.red);
    } else {
      console.log(`${error}`.red);
    }
  }
};
