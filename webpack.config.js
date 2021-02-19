/**
 * Custom stack template stuff
 * 
 * Author:  Anshul Kharbanda
 * Created: [Creation Date]
 */
const webpack = require('webpack')
const path = require('path')

// Build directory
const buildDir = 'public'

// Webpack config module
module.exports = {
    mode: process.env.NODE_ENV || 'development',
    devtool: 'source-map',
    entry: './app/index.js',
    output: {
        path: path.resolve(__dirname, buildDir),
        filename: 'bundle.js'
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, buildDir),
        compress: true,
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.s?css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpg|jpeg|png)$/,
                exclude: /node_modules/,
                use: 'file-loader'
            }
        ]
    }
}