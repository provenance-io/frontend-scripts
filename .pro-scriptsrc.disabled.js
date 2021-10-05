module.exports = {
  indexText: {
    exportTextComponent: name => 'exportTextComponent --- test',
    importTextComponent: name => 'importTextComponent --- test',
    exportTextAction: name => 'exportTextAction --- test',
    importTextAction: name => 'importTextAction --- test',
    exportTextReducer: name => 'exportTextReducer --- test',
    importTextReducer: name => 'importTextReducer --- test',
    exportTextHook: name => 'exportTextHook --- test',
    importTextHook: name => 'importTextHook --- test',
  },
  paths: {
    pathRoot: './src',
    pathRedux: './src/redux',
    pathComponents: './src/Component',
    pathActions: './src/redux/actions',
    pathReducers: './src/redux/reducers',
    pathHooks: './src/redux/hooks',
  },
};
