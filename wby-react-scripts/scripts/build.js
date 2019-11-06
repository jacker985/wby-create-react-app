// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// Ensure environment variables are read.
require('../config/env');

const fs = require('fs-extra');

const webpack = require('webpack');
const configFactory = require('../config/webpack.config.js')
const paths = require('../config/paths');
const chalk = require('react-dev-utils/chalk');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const { checkBrowsers } = require('react-dev-utils/browsersHelper');
const FileSizeReporter = require('react-dev-utils/FileSizeReporter');

const path = require('path');
const printHostingInstructions = require('react-dev-utils/printHostingInstructions');
const printBuildError = require('react-dev-utils/printBuildError');

const measureFileSizesBeforeBuild = FileSizeReporter.measureFileSizesBeforeBuild;
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;
const useYarn = fs.existsSync(paths.yarnLockFile);

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

const isInteractive = process.stdout.isTTY;
// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
    process.exit(1);
}

const config = configFactory('production');

//checkBrowsers 检查浏览器版本
checkBrowsers(paths.appPath, isInteractive).then(() => {
    const data = measureFileSizesBeforeBuild(paths.appBuild);
    return data;
}).then((previousFileSizes) => {
    fs.emptyDirSync(paths.appBuild);
    copyPublicFolder();
    return build(previousFileSizes)
}).then(({ stats, previousFileSizes, warnings }) =>{
    if(warnings.length){
        console.log(chalk.yellow('Compiled with warnings.\n'));
        console.log(warnings.join('\n\n'));
        console.log(
        '\nSearch for the ' +
            chalk.underline(chalk.yellow('keywords')) +
            ' to learn more about each warning.'
        );
        console.log(
        'To ignore, add ' +
            chalk.cyan('// eslint-disable-next-line') +
            ' to the line before.\n'
        );
    }else{
        console.log(chalk.green('Compiled successfully.\n'));
    }
    printFileSizesAfterBuild(
        stats,
        previousFileSizes,
        paths.appBuild,
        WARN_AFTER_BUNDLE_GZIP_SIZE,
        WARN_AFTER_CHUNK_GZIP_SIZE
    )
    console.log('\n');
    const appPackage = require(paths.appPackageJson);
    const publicUrl = paths.publicUrl;
    const publicPath = config.output.publicPath;
    const buildFolder = path.relative(process.cwd(), paths.appBuild);
    printHostingInstructions(
        appPackage,
        publicUrl,
        publicPath,
        buildFolder,
        useYarn
    );
}, 
err => {
    console.log(chalk.red('Failed to compile.\n'));
    printBuildError(err);
    process.exit(1)
})

function build(previousFileSizes){
    const compiler = webpack(config);
    return new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            let messages;
            if(err){
                if(!err.message){
                    console.log()
                    return reject(err);
                }
                messages = formatWebpackMessages({
                    errors: [err.message],
                    warnings: []
                })
            }else{
                messages = formatWebpackMessages(
                    stats.toJson({all: false, warnings:true, errors:true})
                )
            }
            if(messages.errors.length){
                if(messages.errors.length > 1){
                    messages.errors.length = 1
                }
                return reject(new Error(messages.errors.join('\n\n')));
            }
            return resolve({
                stats,
                previousFileSizes,
                warnings: messages.warnings,
            })
        })
    })
}

function copyPublicFolder() {
    fs.copySync(paths.appPublic, paths.appBuild, {
        dereference: true,
        filter: file => file !== paths.appHtml,
    });
  }
  