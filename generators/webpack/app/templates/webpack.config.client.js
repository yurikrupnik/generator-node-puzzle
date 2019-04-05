const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const dotenv = require('dotenv');
<%_ if(vue) { _%>
const VueLoaderPlugin = require('vue-loader/lib/plugin');
<%_ } _%>

module.exports = env => {
    const isProd = env ? !!env.prod : false;
    const isDebug = env ? !!env.debug : false;
    const config = isProd ? dotenv.config() : require('./<%= destinationPath %>/config'); // eslint-disable-line global-require

    return {
        context: path.resolve(__dirname, '<%= destinationPath %>'),
        optimization: {
            minimizer: [
                new TerserPlugin(),
                new OptimizeCSSAssetsPlugin({})
            ]
        },
        target: 'web',
        resolve: {
            extensions: [
                '.json',
                '.js',
                <%_ if(react) { _%>
                '.jsx',
                <%_ } _%>
                '.css' <%_ if(sass) { _%>,
                '.scss'
                <%_ } _%>
            ] <%_ if(vue) { _%>,
            alias: {
                vue: 'vue/dist/vue.js'
            }
            <%_ } %>
        },
        devtool: isProd ? 'source-map' : 'eval-cheap-module-source-map',
        entry: './<%= isFullstack ? 'client' : 'index' _%>.<%= react ? 'jsx' : 'js' _%>',
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
                    test: /\.(js<%= react ? '|jsx' : '' _%>)$/,
                    use: ['babel-loader', 'eslint-loader'],
                    exclude: /node_modules/,
                },
                <%_ if(vue) { _%>
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                <%_ } _%>
                <%_ if(angular) { _%>
                {
                    test: /\.(html)$/,
                    use: {
                        loader: 'html-loader',
                        options: {
                            attrs: [':data-src']
                        }
                    }
                },
                <%_ } _%>
                {
                    test: /\.(css<%= sass ? '|scss' : '' _%>)$/,
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
                        <%_ if(sass) { _%>
                        {
                            loader: 'sass-loader'
                        }
                        <%_ } _%>
                    ],
                },
                {
                    test: /\.ejs$/,
                    use: 'raw-loader'
                },
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
            new HtmlWebpackPlugin({
                template: 'index.ejs',
                filename: 'index.<%= isFullstack ? 'esj' : 'html' _%>',
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
            <%_ if(vue) { _%>
            new VueLoaderPlugin(),
            <%_ } _%>
            new BundleAnalyzerPlugin({}),
        ],
        devServer: { // when not prod - NODE_ENV_DOCKER taken from docker-compose env
            open: true,
            <%_ if(!isFullstack) { _%>
            index: 'index.html',
            historyApiFallback: true
            <%_ } _%>
            <%_ if(isFullstack) { _%>
            port: config.port + 1,
            host: process.env.NODE_ENV_DOCKER ? '0.0.0.0' : 'localhost',
            proxy: {
                '/': { target: `http://localhost:${config.port}` }
            }
            <%_ } _%>
        }
    };
};
