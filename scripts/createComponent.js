const colors = require('colors');
// Helpers
const { createFolder } = require('../helpers/createFolder.js');
const { copyTemplate } = require('../helpers/copyTemplate.js');
const { pathExists } = require('../helpers/pathExists.js');
const { isCamelCase } = require('../helpers/isCamelCase.js');
const { promptUser } = require('../helpers/promptUser.js');
const { appendIndex } = require('../helpers/appendIndex.js');

exports.createComponent = async (consts) => {
  // Consts
  const { paths } = consts;
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
  
  try {
    // -----------------
    // Check root paths
    // -----------------
    await pathExists(pathRoot);
    await pathExists(pathComponents);
    await pathExists(pathComponentsIndex);
    // -------------------------
    // Get Components name
    // -------------------------
    const { name } = await promptUser({ type: 'input', name: 'name', message: "What is the Component's name?"})
    const lowercaseName = name.substring(0, 1).toLowerCase() + name.substring(1);
    // ----------------------------------------
    // Make sure Component name is valid
    // ----------------------------------------
    if (isCamelCase(name)) { console.log(`Test: "${name}" is correctly camel case.`.dim.green); }
    else { throw new Error(`Component name must be camel case, you entered "${name}".`) }
    // ------------------------------------------------
    // Make sure Component doesn't already exist
    // ------------------------------------------------
    const componentAlreadyExists = await pathExists(`${pathComponents}/${name}`, 'nothrow');
    if (componentAlreadyExists) { throw new Error(`Unable to create Component "${name}", it already exists.`)}
    else { console.log(`Test: "${name}" Component doesn't already exist.`.dim.green); }
    // ---------------------------------------
    // Ask about creating a Redux Store
    // ---------------------------------------
    const { redux } = await promptUser({ type: 'confirm', name: 'redux', message: 'Does this component need a redux store?'})
    if (redux) {
      // ------------------
      // Check redux paths
      // ------------------
      await pathExists(pathRedux);
      await pathExists(pathActions);
      await pathExists(pathReducers);
      await pathExists(pathHooks);
      await pathExists(pathActionsIndex);
      await pathExists(pathReducersIndex);
      await pathExists(pathHooksIndex);
      // --------------------------------------------
      // Update index files, then update templates
      // --------------------------------------------
      await appendIndex('action', `${lowercaseName}Actions`, consts);
      await appendIndex('hook', `use${name}`, consts);
      await appendIndex('reducer', `${lowercaseName}Reducer`, consts);
      await copyTemplate('actions.js', `${pathActions}/${lowercaseName}Actions.js`, name);
      await copyTemplate('hooks.js', `${pathHooks}/use${name}.js`, name);
      await copyTemplate('reducers.js', `${pathReducers}/${lowercaseName}Reducer.js`, name);
      // -------------------------------------------------
      // Create Component folder then create redux file
      // -------------------------------------------------
      await createFolder(`${pathComponents}/${name}`);
      await copyTemplate('componentRedux.js', `${pathComponents}/${name}/${name}.js`, name);
    } else {
      // -----------------------------------------------
      // Create Component folder then create basic file
      // -----------------------------------------------
      await createFolder(`${pathComponents}/${name}`);
      await copyTemplate('componentBasic.js', `${pathComponents}/${name}/${name}.js`, name);
    }
    // ------------------------------------------------------
    // Create Component index from template and update it
    // ------------------------------------------------------
    await copyTemplate('componentIndex.js', `${pathComponents}/${name}/index.js`, name);
    // ---------------------------------------------------------
    // Add Component to list of existing exported Components
    // ---------------------------------------------------------
    await appendIndex('component', name, consts);
    // -----------------------------
    // Create Component Completed
    // ----------------------------- 
    return console.log(`Successfully created "${name}" Component (${redux ? 'w/Redux' : 'w/o Redux'}).`.brightGreen.bold);
  }
  catch (error) {
    if (error.isTtyError) {
      console.log('Error:  Prompt could not be rendered in the current environment'.red);
    } else {
      console.log(`${error}`.red);
    }
  }
};
