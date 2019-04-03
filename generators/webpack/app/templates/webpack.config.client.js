const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const dotenv = require('dotenv');
<%_ if(react) { _%>
const VueLoaderPlugin = require('vue-loader/lib/plugin');
<%_ } _%>

module.exports = env => {
    const isProd = env ? !!env.prod : false;
    const isDebug = env ? !!env.debug : false;
    const config = isProd ? dotenv.config() : require('./src/config'); // eslint-disable-line global-require

    return {
        context: path.resolve(__dirname, <%= 'destinationPath' %>), // todo
        optimization: {
            minimizer: [
                new UglifyJsPlugin({ // todo
                    cache: true,
                    parallel: true,
                    sourceMap: true // set to true if you want JS source maps
                }),
                new OptimizeCSSAssetsPlugin({})
            ]
        },
        target: 'web',
        resolve: {
            extensions: ['.json', '.js', <%= react ? "'.jsx'" : "" _%>, '.css', <%= sass ? "'.scss'": "'''" _%>] // todo
            <%_ if(react) { _%>
            alias: {
                vue: 'vue/dist/vue.js' // todo
            }
            <%_ } _%>
        },
        devtool: isProd ? 'source-map' : 'eval-cheap-module-source-map',
        entry: './client.jsx', // todo
        output: {
            filename: '[name].js',
            chunkFilename: '[name].js',
            path: path.resolve(__dirname, 'dist/assets'),
            publicPath: '/'
        },
        mode: isProd ? 'production' : 'development',
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/, // todo
                    use: ['babel-loader', 'eslint-loader'],
                    exclude: /node_modules/,
                },
                <%_ if(react) { _%>
                {
                    test: /\.vue$/, // todo
                    loader: 'vue-loader'
                },
                <%_ } _%>
                <%_ if(react) { _%>
                {
                    test: /\.(html)$/, // todo
                    use: {
                        loader: 'html-loader',
                        options: {
                            attrs: [':data-src']
                        }
                    }
                },
                <%_ } _%>

                {
                    test: /\.(css|scss)$/, // todo
                    use: [
                        'css-hot-loader',
                        !isProd ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: isProd ? '[hash:base64]' : '[local]--[hash:base64:5]'
                            }
                        },
                        <%_ if(react) { _%>
                        { // todo
                            loader: 'sass-loader'
                        }
                        <%_ } _%>
                    ],
                },
                <%_ if(react) { _%>
                { // todo
                    test: /\.ejs$/,
                    use: 'raw-loader'
                },
                <%_ } _%>
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {}
                        }
                    ]
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.DEBUG': JSON.stringify(isDebug),
                'process.env.PORT': JSON.stringify(process.env.PORT)
            }),
            new HtmlWebpackPlugin({ // todo
                template: 'index.ejs', // todo
                filename: 'index.ejs', // todo
                favicon: 'assets/favicon.ico',
                meta: {
                    charset: 'UTF-8',
                    viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
                },
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true
                }
            }),
            new MiniCssExtractPlugin({
                filename: !isProd ? '[name].css' : '[name].[hash].css',
                chunkFilename: !isProd ? '[id].css' : '[id].[hash].css',
            }),
            new BundleAnalyzerPlugin({}),
            new VueLoaderPlugin()
        ],
        devServer: { // when not prod - NODE_ENV_DOCKER taken from docker-compose env
            // todo client and fullstack
            port: config.port + 1,
            open: true,
            host: process.env.NODE_ENV_DOCKER ? '0.0.0.0' : 'localhost',
            proxy: {
                '/': { target: `http://localhost:${config.port}` }
            }
        }
    };
};
