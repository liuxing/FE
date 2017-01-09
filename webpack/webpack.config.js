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
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass'],
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
