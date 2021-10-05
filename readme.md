# Provenance Frontend Scripts
## Scripts to quickly create React and Redux components, files, folders, and store items

### Goal:
Instead of manually making components and all the files associated with them you can instead use pro-scripts to create or remove components with a single command.

### Features:
- Create a React only (no Redux store values) component
- Create a React + Redux store component
- Create a Redux store only (no component)
- Build initial/basic Component file structures
- Build initial/basic Redux file structures
- Remove and delete a React + Redux component (this will search and destroy any matching React/Redux component/store values)
- Customize constants to fit your application structure with a `.pro-scriptsrc.js` file

### Usage:
- Install pro-scripts globally and call from within your application
- Default paths and files names can be found within `/consts`
- If you structure or name your files differently use a `.pro-scriptsrc.js` file in your root directory (see bottom of readme for example)
- To view or modify the file construction templates look within the `/templates` folder
- Run `pro` with any of the following flags:
  - `-v` get version of v-scripts
  - `-c` create component and/or store
  - `-r` remove component and/or store

### Notes:
- If using the Build Redux file structures feature you will need to add the following modules to your applications dependencies list:
  - react-redux
  - redux-thunk
  - redux-actions
  - axios
- If you're having issues getting this running, try updating your node version

### .pro-scriptsrc.js Example:
```
// Override any of the paths with your own custom values
module.exports = {
  paths: {
    pathRoot: 'MY/CUSTOM/ROUTE/TO/pathRoot',
    pathRedux: 'MY/CUSTOM/ROUTE/TO/pathRedux',
    pathComponents: 'MY/CUSTOM/ROUTE/TO/pathComponents',
    pathActions: 'MY/CUSTOM/ROUTE/TO/pathActions',
    pathReducers: 'MY/CUSTOM/ROUTE/TO/pathReducers',
    pathHooks: 'MY/CUSTOM/ROUTE/TO/pathHooks',
  },
};
```
