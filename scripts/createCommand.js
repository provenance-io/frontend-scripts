const { createComponent } = require('./createComponent.js');
const { createReduxStore } = require('./createReduxStore.js');
const { createComponentFiles } = require('./createComponentFiles.js');
const { createReduxStoreFiles } = require('./createReduxStoreFiles.js');
const { promptUser } = require('../helpers/promptUser.js');
const { buildConsts } = require('../helpers/buildConsts.js');
const inquirer = require('inquirer');

exports.createCommand = async (name) => {
  try {
    // -----------------------------------------
    // Check for .v-scriptrc.js file overrides
    // -----------------------------------------
    const consts = await buildConsts();
    // ------------------
    // Get Creation type
    // ------------------
    const { type } = await promptUser({
      type: 'list',
      name: 'type',
      message: 'What would you like to create?',
      choices: [
        'React Component',
        'Redux Store (API Calls)',
        // 'Redux Store (No API Calls)',
        new inquirer.Separator(),
        'React Component Default File Structure',
        'Redux Store Default File Structure',
        new inquirer.Separator(),
        'Cancel',
      ]
    })
    // ------------------------------------------------------------
    // Based on the answer, start the specific create functions
    // ------------------------------------------------------------
    switch (type) {
      case 'React Component': return createComponent(consts);
      case 'Redux Store (API Calls)': return createReduxStore(consts);
      // case 'Redux Store (No API Calls)': return createReduxStore(consts);
      case 'React Component Default File Structure': return createComponentFiles(consts);
      case 'Redux Store Default File Structure': return createReduxStoreFiles(consts);
      default: return;
    }
  }
  catch (error) {
    if (error.isTtyError) {
      console.log('Error:  Prompt could not be rendered in the current environment'.red);
    } else {
      console.log(`${error}`.red);
    }
  }
};
