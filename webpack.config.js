var config = {
    entry: './src/client/index.js',
    output: {
        path: './',
        filename: 'index.js',
        publicPath: 'http://reminder.com:3000/'
    },
    devServer: {
        inline: true,
        host: 'reminder.com',
        port: 3000,
        // CORS 
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    },
    devtool: 'eval',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',

                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};

module.exports = config;