const pathRoot = './src';
const pathRedux = `${pathRoot}/redux`;
const pathComponents = `${pathRoot}/Components`;
const pathActions = `${pathRedux}/actions`;
const pathReducers = `${pathRedux}/reducers`;
const pathHooks = `${pathRedux}/hooks`;

exports.paths = {
  pathRoot,
  pathRedux,
  pathComponents,
  pathActions,
  pathReducers,
  pathHooks,
  pathReduxStore: `${pathRedux}/store.js`,
  pathComponentsIndex: `${pathComponents}/index.js`,
  pathActionsIndex: `${pathActions}/index.js`,
  pathReducersIndex: `${pathReducers}/index.js`,
  pathHooksIndex: `${pathHooks}/index.js`,
};
