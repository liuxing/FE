const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const ROOT_PATH = path.resolve(__dirname)
const APP_PATH = path.resolve(__dirname, 'app')
const BUILD_PATH = path.resolve(__dirname, 'build')


module.exports = {
    entry: APP_PATH,
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        // webpack-dev-server代理  多用于前后端分离SPA
        proxy: {
            '/api/*': {
                target: 'http://localhost:5000',
                secure: false
            }
        }
    },
    devtool: 'eval-source-map', // 启用source-map
    jshint: {
        "esnext": true,
        "asi": true
    },
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                include: APP_PATH,
                loader: 'jshint-loader'
            }
        ],
        loaders: [
            {
                test: /\.scss$/,
                loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
                include: APP_PATH
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=40000'
            },
            {
                test: /\.jsx?$/,
                loader: 'babel',
                include: APP_PATH,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin()]
}
