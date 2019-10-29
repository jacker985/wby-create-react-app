
const fs = require('fs-extra');
// const path = require('path');
// const os = require('os');

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const configFactory = require('../config/webpack.config')
const paths = require('../config/paths');


const chalk = require('react-dev-utils/chalk');
const clearConsole = require('react-dev-utils/clearConsole');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const {
    choosePort,
    createCompiler,
    prepareProxy,
    prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');


const createDevServerConfig = require('../config/webpackDevServer.config');
const useYarn = fs.existsSync(paths.yarnLockFile)
const isInteractive = process.stdout.isTTY;

// clearConsole();

const openBrowser = require('react-dev-utils/openBrowser');

//检查public下 index.html是否存在, src/index.js是否存在，
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
    process.exit(1)
}

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

//如果配置了HOST环境变量，需要配置对应的HOST
if (process.env.HOST) {
    console.log(
        chalk.cyan(
            `Attempting to bind to HOST environment variable: ${chalk.yellow(
                chalk.blod(process.env.HOST)
            )}`
        )
    )
    console.log(
        `If this was unintentional, check that you haven't mistakenly set it in your shell.`
    );
    console.log(
        `Learn more here: ${chalk.yellow('https://create-react-app.dev/docs/advanced-configuration/')}`
    );
    console.log();
}

// We require that you explicitly set browsers and do not fall back to
// browserslist defaults.
const { checkBrowsers } = require('react-dev-utils/browsersHelper');
checkBrowsers(paths.appPath, isInteractive)
    .then(() => {
        // We attempt to use the default port but if it is busy, we offer the user to
        // run on a different port. `choosePort()` Promise resolves to the next free port.

        //如果端口被占用，切换到一个可用的端口， 返回一个可用的端口
        return choosePort(HOST, DEFAULT_PORT);
    })
    .then(port => {
        if (port == null) {
            // We have not found a port.
            return;
        }
        const config = configFactory('development');
        const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
        const appName = require(paths.appPackageJson).name;
        const useTypeScript = fs.existsSync(paths.appTsConfig);
        const urls = prepareUrls(protocol, HOST, port); //生成请求的url，拼接 协议，host，端口；

        const devSocket = {
            warnings: warnings => devServer.sockWrite(devServer.sockets, 'warnings', warnings),
            errors: errors => devServer.sockWrite(devServer.sockets, 'errors', errors)
        }

        const compiler = createCompiler({
            appName, config, devSocket, urls, useYarn, useTypeScript, webpack
        })

        //加载代理
        const proxySetting = require(paths.appPackageJson).proxy;
        const proxyConfig = prepareProxy(proxySetting, paths.appPublic)

        const serverConfig = createDevServerConfig(proxyConfig, urls.lanUrlForConfig);
        const devServer = new WebpackDevServer(compiler, serverConfig);

        // fs.writeFileSync(path.resolve('proxy.js'), JSON.stringify(proxySetting, null, 2) + os.EOL + JSON.stringify(proxyConfig, null, 2) + os.EOL + JSON.stringify(serverConfig, null, 2) + os.EOL)

        devServer.listen(port, HOST, err => {
            if (err) {
                return console.log(err);
            }

            if (isInteractive) {
                clearConsole();
            }
            console.log(chalk.cyan('Starting the development server...\n'));
            openBrowser(urls.localUrlForBrowser);
        });
        ['SIGINT', 'SIGTERM'].forEach(function (sig) {
            process.on(sig, function () {
                devServer.close();
                process.exit();
            });
        });
    })
    .catch(err => {
        if (err && err.message) {
            console.log(err.message);
        }
        process.exit(1);
    });



