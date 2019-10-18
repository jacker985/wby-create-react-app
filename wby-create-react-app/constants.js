const { name, version } = require('./package.json');

const configFile = `${process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']}/.zhurc`; // 配置文件的存储位置
const defaultConfig = {
    repo:"zhu-cli",
    register:"github"
};

module.exports = {
    configFile, defaultConfig
}
