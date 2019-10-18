'use strict';

const path = require('path');
const fs = require('fs');
// const url = require('url');
// const chalk = require('chalk');

const appDirectory = fs.realpathSync(process.cwd());
console.log("process.cwd(), appDirectory", process.cwd(), '\n', appDirectory)
const resolveApp = relativePath => {
  // console.log(appDirectory, relativePath)
  return path.resolve(appDirectory, relativePath)
  
};
const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];
// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  console.log('filePath', filePath)
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveModule(resolveApp, 'src/index'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  // testsSetup: resolveModule(resolveApp, 'src/setupTests'),
  proxySetup: resolveApp('src/setupProxy.js'),
  appNodeModules: resolveApp('node_modules'),
  // publicUrl: getPublicUrl(resolveApp('package.json')),
  // servedPath: getServedPath(resolveApp('package.json')),
};