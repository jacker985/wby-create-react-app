const {decode, encode} = require('ini');
const fs = require('fs');
const { defaultConfig, configFile } = require('./constants');
module.exports = (action, k, v) => {
    const flag = fs.existsSync(configFile);
    const obj = {};
    if(flag){
        const content = fs.readFileSync(configFile, 'utf8')
        const c = decode(content);
        Object.assign(obj, c);
    }
    console.log("配置文件是否存在", flag)
    switch (action) {
        case 'get':
            console.log(obj[k] || defaultConfig[k])
            break;
        case 'set':
            obj[k] = v;
            fs.writeFileSync(configFile, encode(obj));
            console.log(`${k}=${v}`);
            break;
        case 'getVal':
            return obj[k]
        default:
            break;
    }
}