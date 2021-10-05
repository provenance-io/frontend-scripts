exports.indexText = {
  componentExportText: name => `export { default as ${name} } from './${name}';`,
  componentImportText: name => '',
  actionExportText: name => `${name},`,
  actionImportText: name => `import * as ${name} from './${name}';`,
  reducerExportText: name => `${name},`,
  reducerImportText: name => `import ${name} from './${name}';`,
  hookExportText: name => `export { default as ${name} } from './${name}';`,
  hookImportText: name => '',
};
