#!/usr/bin/env node

// 调用这个脚手架的命令是
const spawn = require('react-dev-utils/crossSpawn');
const args = process.argv.slice(2);

// console.log("process.argv: ", process.argv)
//[ '/usr/local/bin/node', '/Users/guangli/project/wby/bin/index.js' ]

// console.log("args: ", args) //[]

// node ./bin/indexed.js start
// console.log("process.argv: ", process.argv)
//[ '/usr/local/bin/node', '/Users/guangli/project/wby/bin/index.js' 'start' ]

const scriptIndex = args.findIndex(
  x => x === 'build' || x === 'eject' || x === 'start' || x === 'test'
);

// console.log("scriptIndex: ", scriptIndex) // 0

// node ./bin/index.js build2 start
const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];
// node ./bin/index.js -p 3000  start -d dist
// console.log("nodeArgs: ", nodeArgs) //nodeArgs:  [ '-p', '3000' ]

// console.log("script: ", script)
switch(script){
    case 'build':
    case 'start': {
        //执行对应的nodejs文件
        const  result = spawn.sync(
            'node', 
            nodeArgs    //nodeArgs:  [ '-p', '3000' ]
            .concat(require.resolve('../scripts/' + script))  // start
            .concat(args.slice(scriptIndex + 1)),  // -d dist\
            { stdio: 'inherit' }
        )
        // console.log("result", result)
        //进程被杀掉，或者ctrl+c中止进行，
        if(result.signal){
            process.exit(1);
        }
        //result.status 0 正常，1 异常；
        process.exit(result.status)
        break;
    }
    default:
        console.log('Unknown script "' + script + '".');
        console.log('Perhaps you need to update react-scripts?');
        console.log(
            'See: https://facebook.github.io/create-react-app/docs/updating-to-new-releases'
        );
        break;
}

