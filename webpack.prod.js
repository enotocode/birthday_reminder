var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.join(__dirname, 'node_modules');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var config = {
    entry: [
        './src/client/index.js'
    ],
    output: {
        //path: path.join(__dirname, 'src/server/public/'),
        filename: 'index.js',
        publicPath: '/'
    },
    devtool: 'cheap-module-source-map',
    plugins: [
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            'react',
                            'env'
                        ]
                    }
                }
            }
        ]

    }
};

module.exports = config;
