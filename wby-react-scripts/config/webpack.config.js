'use strict';

const getClientEnvironment = require('./env');
// const fs = require('fs');
const paths = require('./paths');
const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const TerserPlugin = require('terser-webpack-plugin');
const antdThemeOptions = require('./antd.theme');
// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;



//require.resolve('style-loader')
/**
 * 在Node.js中，可以使用require.resolve函数来查询某个模块文件的带有完整绝对路径的文件名，代码如下所示。
    require.resolve('./testModule.js'); 在这行代码中，我们使用require.resolve函数来查询当前目录下testModule.js模块文件的带有完整绝对路径的模块文件名。
    注意：使用require.resolve函数查询模块文件名时并不会加载该模块
 */

module.exports = function (webpackEnv) {
    const isEnvDevelopment = webpackEnv === 'development';
    const isEnvProduction = webpackEnv === 'production';

    // Webpack uses `publicPath` to determine where the app is being served from.
    // It requires a trailing slash, or the file assets will get an incorrect path.
    // In development, we always serve from the root. This makes config easier.
    const publicPath = isEnvProduction
        ? paths.servedPath
        : isEnvDevelopment && '/';
    // Some apps do not use client-side routing with pushState.
    // For these, "homepage" can be set to "." to enable relative asset paths.
    const shouldUseRelativeAssetPaths = publicPath === './';

    // `publicUrl` is just like `publicPath`, but we will provide it to our app
    // as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
    // Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
    const publicUrl = isEnvProduction
        ? publicPath.slice(0, -1)
        : isEnvDevelopment && '';
    // Get environment variables to inject into our app.
    const env = getClientEnvironment(publicUrl);
    const getStyleLoaders = (cssOptions, preProcessor, preOptions = {}) => {
        const loaders = [
            isEnvDevelopment && require.resolve('style-loader'),
            { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../../' } },
            { loader: require.resolve('css-loader'), options: cssOptions },
        ].filter(Boolean);
        if (preProcessor) {
            loaders.push({
                loader: require.resolve(preProcessor),
                options: { sourceMap: true, javascriptEnabled: true, ...preOptions }
            })
        }
        return loaders;
    }

    return {
        mode: 'development',
        entry: [
            // polyfillPath,
            paths.appIndexJs
        ],
        output: {
            path: paths.appBuild,
            publicPath: publicPath,
            filename: isEnvProduction
                ? 'static/js/[name].[contenthash:8].js'
                : isEnvDevelopment && 'static/js/bundle.js'
        },
        optimization: {
            // minimizer: [
            //     new TerserPlugin({
            //         terserOptions: {
            //             parse: {
            //                 // we want terser to parse ecma 8 code. However, we don't want it
            //                 // to apply any minfication steps that turns valid ecma 5 code
            //                 // into invalid ecma 5 code. This is why the 'compress' and 'output'
            //                 // sections only apply transformations that are ecma 5 safe
            //                 // https://github.com/facebook/create-react-app/pull/4234
            //                 ecma: 8
            //             },
            //             compress: {
            //                 ecma: 5,
            //                 warnings: false,
            //                 // Disabled because of an issue with Uglify breaking seemingly valid code:
            //                 // https://github.com/facebook/create-react-app/issues/2376
            //                 // Pending further investigation:
            //                 // https://github.com/mishoo/UglifyJS2/issues/2011
            //                 comparisons: false,
            //                 // Disabled because of an issue with Terser breaking valid code:
            //                 // https://github.com/facebook/create-react-app/issues/5250
            //                 // Pending futher investigation:
            //                 // https://github.com/terser-js/terser/issues/120
            //                 inline: 2
            //             },
            //             mangle: {
            //                 safari10: true
            //             },
            //             output: {
            //                 ecma: 5,
            //                 comments: false,
            //                 // Turned on because emoji and regex is not minified properly using default
            //                 // https://github.com/facebook/create-react-app/issues/2488
            //                 ascii_only: true
            //             }
            //         },
            //         // Use multi-process parallel running to improve the build speed
            //         // Default number of concurrent runs: os.cpus().length - 1
            //         parallel: true,
            //         // Enable file caching
            //         cache: true,
            //         sourceMap: shouldUseSourceMap
            //     }),
            //     new OptimizeCSSAssetsPlugin({
            //         cssProcessorOptions: {
            //             parser: safePostCssParser,
            //             map: shouldUseSourceMap
            //                 ? {
            //                     // `inline: false` forces the sourcemap to be output into a
            //                     // separate file
            //                     inline: false,
            //                     // `annotation: true` appends the sourceMappingURL to the end of
            //                     // the css file, helping the browser find the sourcemap
            //                     annotation: true
            //                 }
            //                 : false
            //         }
            //     })
            // ],
            // Automatically split vendor and commons
            // https://twitter.com/wSokra/status/969633336732905474
            // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    icons: {
                        test: /@ant-design/,
                        priority: 40,
                        name: 'icons'
                    },
                    libs: {
                        test: /(react|react-dom|react-router-dom|redux|axios|react-redux|lodash|immutable|moment")/,
                        priority: 40,
                        name: 'libs',
                    }
                }
            },
            // Keep the runtime chunk seperated to enable long term caching
            // https://twitter.com/wSokra/status/969679223278505985
            runtimeChunk: true
        },

        resolve: {
            alias: {
                '@': paths.appSrc
            }
        },
        module: {
            rules: [
                { parser: { requireEnsure: false } },
                // {
                //     test: /\.(js|mjs|jsx|ts|tsx)$/,
                // },
                {
                    oneOf: [
                        {
                            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                            loader: require.resolve('url-loader'),
                            options: {
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
                            options: {
                                // presets: ['@babel/preset-env', {"useBuiltIns":"entry"}]
                                presets: [
                                    [require.resolve("@babel/preset-env"), { "useBuiltIns": "usage", "corejs":3 }],
                                    [require.resolve("@babel/preset-react")]
                                ],
                                "plugins": [
                                    [require.resolve('@babel/plugin-transform-runtime')],
                                    [require.resolve("babel-plugin-import"), { "libraryName": "antd", "style": true }],
                                    //https://babeljs.io/docs/en/plugins  babel插件列表，class-properties 处在Experimental阶段，标准化的不需要额外安装插件
                                    ["@babel/plugin-proposal-decorators", { "legacy": true }],
                                    ["@babel/plugin-proposal-class-properties", { "loose": true }],
                                    [require.resolve('babel-plugin-named-asset-import'), {
                                        loaderMap: {
                                            svg: {
                                                ReactComponent: '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                                            },
                                        }
                                    }]
                                ]
                            }
                        },
                        {
                            test: cssRegex,
                            exclude: cssModuleRegex,
                            use: getStyleLoaders({ importLoaders: 1 })
                        },
                        {
                            test: lessRegex,
                            exclude: lessModuleRegex,
                            use: getStyleLoaders({ importLoaders: 2, sourceMap: true }, 'less-loader', {
                                modifyVars: antdThemeOptions
                            })
                        }
                    ]
                }
            ]
        },
        devtool: 'source-map',
        plugins: [
            // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
            // new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: 'Development',
                template: paths.appHtml,
            }),
            //使用这个插件，在HtmlWebpackPlugin通过hooks在生成前替换环境变量
            new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: 'static/css/[name].[contenthash:8].css',
                chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
                //chunk libs [mini-css-extract-plugin] Conflicting order between:  这个问题暂时没有好的解决办法
                // https://github.com/facebook/create-react-app/issues/5372
                ignoreOrder: true
            })
        ],
    }
}
