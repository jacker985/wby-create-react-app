'use strict';

const chalk = require('chalk');
const commander = require('commander');
const envinfo = require('envinfo');
const packageJson = require('./package.json');
const path = require('path')
const fs = require('fs-extra')
const os = require('os');
//npm 语义化版本
const semver = require('semver')
const inquirer = require('inquirer')
const spawn = require('cross-spawn');
const { promisify } = require('util');

const downloadTemplate = require('./downloadTemplate');

let projectName;
const program = new commander.Command(packageJson.name)
    .version(packageJson.version)
    .action(name => {
        projectName = name
    })
    .option('--scripts-version <alternative-package>', 'use')
    .option('--useNpm', 'use')
    .option('--usePnp', 'use')
    .option('--typescript', 'use')
    .on('--help', () => {
        console.log(` Only ${chalk.green('<project-directory>')} is required`)
    })
    .on('option:scripts-version', ()=>{
        console.log("========")
    })
    .parse(process.argv);

function install (root, useYarn, usePnp, dependencies, verbose, isOnline){
    return new Promise((resolve, reject) => {
        // let command;
        // let args;
        // command = 'npm';
        // args = [
        //     'install',
        //     '--save',
        //     '--save-exact',
        //     '--loglevel',
        //     'error',
        // ].concat(dependencies);

        
        /**
         * spawn 执行命令行命令
         */
        // const child = spawn(command, args, { stdio: 'inherit' });
        // child.on('close', code => {
        //     if (code !== 0) {
        //         reject({
        //             command: `${command} ${args.join(' ')}`,
        //         });
        //         return;
        //     }
        //     resolve();
        // });

        let command;
        let args;
        useYarn = true;
        if (useYarn) {
            command = 'yarnpkg';
            args = ['add'];
        } else {
            command = 'npm';
            args = ['install', '--save', verbose && '--verbose'].filter(e => e);
        }
        args = args.concat(dependencies);

        console.log(`Installing react and react-dom using ${command}...`, args);
        console.log();

        const proc = spawn.sync(command, args, { stdio: 'inherit' });
        if (proc.status !== 0) {
            console.error(`\`${command} ${args.join(' ')}\` failed`);
            reject();
            return;
        }else{
            resolve();
        }
    })
}

const createApp = async function (){
    const { 
        verbose,
        version,
        useNpm,
        usePnp,
        useTypescript 
    } = program;
    const root = path.resolve(projectName);
    const appName = path.basename(root);
    
    console.log(`Creating a new React app in ${chalk.green(root)}.`);
    console.log();
    //下载wby-template代码
    await downloadTemplate(projectName);

    //执行安装包命令 yarn install 
    const appPackage = require(path.resolve(root, 'package.json'));
    // console.log(appPackage.dependencies)
    const originalDirectory = process.cwd();
    process.chdir(root)
    await install(root, null, null, Object.keys(appPackage.dependencies));
    process.exit(0);
}
createApp();