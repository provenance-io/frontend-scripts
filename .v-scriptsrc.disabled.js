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
    pathRoot: './srcz',
    pathRedux: './srcz/reduxz',
    pathComponents: './srcz/Componentz',
    pathActions: './srcz/reduxz/actionsz',
    pathReducers: './srcz/reduxz/reducersz',
    pathHooks: './srcz/reduxz/hooksz',
  },
};
