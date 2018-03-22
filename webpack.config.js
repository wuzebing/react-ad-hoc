/*
 * @file webpack配置文件(开发环境)
 * @author tanjizhen
 * @date 2017-04-30
 */
const path = require('path');
const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const port = 3000;

module.exports = {
    devtool: '#source-map',
    entry: {
        bundle: './app/main.jsx',
        vendor: ['react', 'react-dom', 'react-router', 'redux', 'font-awesome-loader'],
    },
    output: {
        path: path.join(__dirname, '/build'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: 'babel-loader'
        }, {
            test: /\.(less|css)$/,
            use: [
                'style-loader',
                'css-loader?#sourceMap',
                'postcss-loader',
                'less-loader'
            ]
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: "url-loader?limit=10000&mimetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: "file-loader"
        }],
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor'],
        }),
        new OpenBrowserPlugin({
            url: `http://localhost:${port}`
        })
    ],
    devServer: {
        compress: true, // 启用gzip压缩
        contentBase: path.join(__dirname, 'app'),
        port: port, // 运行端口3000
        inline: true,
        hot: true,
        historyApiFallback: true
    }
};