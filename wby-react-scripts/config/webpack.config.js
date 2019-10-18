'use strict';

// const fs = require('fs');
const paths = require('../config/paths');
// const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

//require.resolve('style-loader')
/**
 * 在Node.js中，可以使用require.resolve函数来查询某个模块文件的带有完整绝对路径的文件名，代码如下所示。
    require.resolve('./testModule.js'); 在这行代码中，我们使用require.resolve函数来查询当前目录下testModule.js模块文件的带有完整绝对路径的模块文件名。
    注意：使用require.resolve函数查询模块文件名时并不会加载该模块
 */
console.log("require.resolve('style-loader'): ", require('style-loader'))
module.exports = function(webpackEnv){
    const isEnvDevelopment = webpackEnv === 'development';
    // const isEnvProduction = webpackEnv === 'production';
    // const mode = isEnvProduction ? 'production' : isEnvDevelopment && 'development';
    // console.log("appIndexJs, appBuild : ", paths.appIndexJs, paths.appBuild)
    // const polyfillPath = path.resolve(__dirname, "../node_modules/@babel/polyfill");
    const getStyleLoaders = (cssOptions, preProcessor) => {
        const loaders = [
            isEnvDevelopment && require.resolve('style-loader'),
            { loader: MiniCssExtractPlugin.loader, options:{publicPath: '../../'}},
            { loader: require.resolve('css-loader'), options: cssOptions },
        ].filter(Boolean);
        if(preProcessor){
            loaders.push({loader: require.resolve(preProcessor), options: { sourceMap : true, javascriptEnabled: true}})
        }
        return loaders;
    }

    return {
        mode: 'development',
        entry:[
            // polyfillPath,
            paths.appIndexJs
        ],
        output:{
            path: paths.appBuild,
            publicPath: '/'
        },
        module: {
            rules : [
                { parser: { requireEnsure: false } },
                // {
                //     test: /\.(js|mjs|jsx|ts|tsx)$/,
                // },
                {
                    oneOf : [
                        {
                            test : [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                            loader:require.resolve('url-loader'),
                            options:{
                                limit: 1024,
                                name: 'static/media/[name].[hash:8].[ext]'
                            }
                        },
                        {
                            test: /\.svg$/,
                            loader: require.resolve('svg-inline-loader')
                        },
                        {
                            test: /\.(js|mjs|jsx)$/,
                            loader: require.resolve('babel-loader'),
                            include: paths.appSrc,
                            options:{
                                // presets: ['@babel/preset-env', {"useBuiltIns":"entry"}]
                                presets: [
                                    [require.resolve("@babel/preset-env"),{"useBuiltIns": "usage"}],
                                    [require.resolve("@babel/preset-react")]
                                ],
                                "plugins": [
                                    [require.resolve("babel-plugin-import"), { "libraryName": "antd", "style": true }],
                                    //https://babeljs.io/docs/en/plugins  babel插件列表，class-properties 处在Experimental阶段，标准化的不需要额外安装插件
                                    [require.resolve("@babel/plugin-proposal-class-properties")],
                                    [require.resolve('babel-plugin-named-asset-import'),{
                                        loaderMap: {
                                            svg: {
                                                ReactComponent:'@svgr/webpack?-svgo,+titleProp,+ref![path]',
                                            },
                                          }
                                    }]
                                ]
                            }
                        },
                        {
                            test: cssRegex,
                            exclude : cssModuleRegex,
                            use : getStyleLoaders({importLoaders: 1})  
                        },
                        {
                            test: lessRegex,
                            exclude : lessModuleRegex,
                            use : getStyleLoaders({importLoaders:2, sourceMap:true}, 'less-loader')
                        }
                    ]
                }
            ]
        },
        devtool:'source-map',
        plugins: [
            // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
            // new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
              title: 'Development',
              template: paths.appHtml,
            }),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: 'static/css/[name].[contenthash:8].css',
                chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
              })
        ],
    }
}
