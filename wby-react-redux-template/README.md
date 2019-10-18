# 配置编辑器环境
安装vscode插件，其他编辑器自己安装，在vscode编辑器里面最左侧边栏上点击扩展
1. 安装EditorConfig，统一编辑器风格
2. 安装ESLint 插件
$ npm install eslint@4.x babel-eslint@8 --save-dev
# or
$ yarn add eslint@4.x babel-eslint@8 -D

注意：
eslint默认只支持tc39中处于stage-4的语法支持，
stage-2 语法需要安装babel-eslint来支持，本项目支持stage-2语法，建议避免使用stage-0|1语法

```
https://www.npmjs.com/package/eslint
//stage-2 语法
class Popout extends React.Component {
	state = {
		visible: false,
		fieldInfo: {},
		sourceVisible: {
			display: 'none'
		}
	};

	showModal = (id) => {
		this.setState({ visible: true });
	}
}
```

transform-do-expressions 这个插件就是为了方便在 jsx写if/else表达式而提出的

```
stage-0
    {
        if(color == 'blue') { 
            <BlueComponent/>; 
        }else if(color == 'red') { 
            <RedComponent/>; 
        }else { 
            <GreenComponent/>; }
        }
    }
```

transform-function-bind, 这个插件其实就是提供过 :: 这个操作符来方便快速切换上下文， 如下面的代码：

```
obj::func
// is equivalent to:
func.bind(obj)
```


# 配置开发环境

### 配置host
1. 修改根目录下，.env.development中的host值。xx.nip.io
2. 修改/etc/hosts 下配置127.0.0.1 xx.nip.io
3. 在浏览器中访问xx.nip.io:3000

4. 配置代理转发，node net.js mock地址 真实的接口地址；
node net.js http://192.168.100.226:10006/mock/5aa728c1b0eb11000ca1d3e1 http://bentley.trunk.192.168.100.203.nip.io

然后配置接口的转发地址，36742这个服务是本地node起的服务，作用是决定什么时候转发到mock和真实地址
"proxy": "http://localhost:36742",

[mock数据文档](http://192.168.100.226:10006/html/web/controller/console/console.html)

### 添加自动登录

** 添加自动登录可以不用配置host **
1. 通过jsonp
http://192.168.100.196:2288//api/cross/getUserLoginInfoJsonp?callback=callback

转发地址 ： http://192.168.100.196:3355/

http://192.168.100.197:2277//api/cross/getUserLoginInfoJsonp",




## 登陆项目资源
mock数据地址：http://192.168.100.226:10006/mock/5aa728dab0eb11000ca1d3e4   

测试环境地址：http://192.168.100.196:2288/  老B端

"proxy": {
    "/api/flash": {
        "target": "http://192.168.100.196:2254",//提现服务，金浩
        "changeOrigin": true
    },
    "/api": {
        "target": "http://192.168.100.196:8080",   //新B端
        "changeOrigin": true
    },
    "/upload/upload": {
        "target": "http://192.168.100.147:80",
        "changeOrigin": true
    }
},






