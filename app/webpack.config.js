const path = require('path');
const webpack = require('webpack');
const mergeConfig = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const sizeAnalyzer = require('webpack-bundle-size-analyzer');

module.exports = mergeConfig(baseConfig, {
    entry: {
        build: './src/main.js',
        chart: ['vis', 'chart.js']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: '[name].js'
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        hot: true,
        port: process.env.DEV_SERVER_PORT ? process.env.DEV_SERVER_PORT : 8090
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
});

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `"${process.env.NODE_ENV}"`
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'chart',
            async: true,
            children: true,
            minChunks: 3
        }),
        new sizeAnalyzer.WebpackBundleSizeAnalyzerPlugin('./../dist/build-size-report.txt')
    ]);
}
