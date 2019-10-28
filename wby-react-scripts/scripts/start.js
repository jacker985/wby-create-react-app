
// const fs = require('fs-extra');

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const configFactory = require('../config/webpack.config')
// const paths = require('../config/paths');
const config = configFactory('development');
// Tools like Cloud9 rely on this.
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const clearConsole = require('react-dev-utils/clearConsole');
const createDevServerConfig = require('../config/webpackDevServer.config');
const isInteractive = process.stdout.isTTY;
const serverConfig = createDevServerConfig();
// clearConsole();
const compiler = webpack(config);
compiler.hooks.beforeCompile.tap('beforeCompile', () => {
    // console.log("beforeCompile")
})
compiler.hooks.invalid.tap('invalid', () => {
    if (isInteractive) {
    //   clearConsole();
    }
    console.log('Compiling...');
  });
compiler.hooks.done.tap('done', async () => {
    
    if (isInteractive) {
        // clearConsole();
    }

    setTimeout(() => {
        // clearConsole();
        console.log("compile done")
    }, 2000)
})

const devServer = new WebpackDevServer(compiler, serverConfig);
devServer.listen(DEFAULT_PORT, HOST, err => {
    if(err){
        return console.log(err)
    }
    // setTimeout(() => {
    //     clearConsole();
    // }, 3000)
})