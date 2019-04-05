const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const dotenv = require('dotenv');
const json = require('./package');

const filename = 'server.js';

module.exports = (env, argv) => {
    const isProd = env ? !!env.prod : false;
    const isDebug = env ? !!env.debug : false;
    isProd ? dotenv.config() : require('./<%= destinationPath %>/config');
    return {
        context: path.resolve(__dirname, '<%= destinationPath %>'),
        resolve: {
            extensions: [
                '.json',
                <%_ if(react) { _%>
                '.jsx',
                <%_ } _%>
                <%_ if(isFullstack) { _%>
                '.css',
                <%_ } _%>
                <%_ if(sass) { _%>
                '.scss',
                <%_ } _%>
                '.js'
            ],
        },
        target: 'node', // in order to ignore built-in modules like path, fs, etc.
        node: false,
        externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
        devtool: 'source-map',
        entry: './<%= isFullstack ? 'server' : 'index' _%>.<%= react ? 'jsx' : 'js' _%>',
        output: {
            path: path.resolve(__dirname, 'dist'),
            chunkFilename: '[name].js',
            filename
        },
        mode: isProd ? 'production' : 'development',
        module: {
            rules: [
                {
                    test: /\.(js<%= react ? '|jsx' : '' _%>)$/,
                    use: ['babel-loader', 'eslint-loader'],
                },
                <%_ if(isFullstack) { _%>
                {
                    test: /\.(css<%= sass ? '|scss' : '' _%>)$/,
                    use: [
                        'css-loader',
                        <%_ if(sass) { _%>
                        {
                        loader: 'sass-loader'
                        }
                        <%_ } _%>
                    ]
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
            new GenerateJsonPlugin('package.json', Object.assign({}, json, {
                main: filename,
                scripts: {
                    start: `node ${filename}`
                },
                devDependencies: {}
            })),
            argv.watch ? new NodemonPlugin({
                script: path.resolve(__dirname, 'dist', filename),
                watch: path.resolve(__dirname, 'dist', filename),
                verbose: true
            }) : () => {}
        ]
    };
};
