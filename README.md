# wby

# wby-create-react-app

包含一个脚手架，包括
1. 常用命令，
2. 创建项目
2. 下载模版文件
3. 安装依赖包

开发计划：
1. 替换模版文件的start,build 脚本
2. 使用.env.production中的环境变量替换html模版中的变量怎么实现，参见相关问题3

## 模版文件

项目地址：https://github.com/jacker985/wby-react-template.git

单独使用一个项目作为模版文件，通过分支来包含不同模版


## react-redux-pro一个包含后台常用系统的页面框架, 类似于antd-design-pro

目录结构#
我们已经为你生成了一个完整的开发框架，提供了涵盖中后台开发的各类功能和坑位，下面是整个项目的目录结构。


├── public
│   ├── index.html           # 
│   └── favicon.png          # Favicon
├── src
│   ├── action               # 公用action
│   ├── api                  # 公共请求方法
│   ├── components           # 业务通用组件
│   ├── constants            # 常量
│   ├── containers           # 页面
│   ├── reducers             # 
│   ├── store                # 
│   ├── util                 # 
│   ├── index.js             # entry
│   ├── index.less           # 全局样式
│   └── indexNbTheme.less    # antd 自定义主题
├── tests                    # 测试工具
├── README.md
└── package.json



node基础知识：
process.cwd()   //执行命令的当前目录

## 相关问题
1. process.env什么时候清空？
process.env.PUBLIC_URL 当process.exit(0|1)退出后会被清空

2. 理解不了这块代码，从env中读取，为什么直接删除env呢
// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve('./paths')];

3. 替换html模版中的变量怎么实现？
//使用InterpolateHtmlPlugin插件，在HtmlWebpackPlugin通过hooks在生成前替换环境变量
    const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),

