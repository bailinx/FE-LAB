var webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://127.0.0.1:3000',
        'webpack/hot/only-dev-server',
        './js/app.jsx'
    ],
    output: {
        path: __dirname + '/assets',
        // 这里如果不用url，则会出现随机的文件名，导致引用不正确
        publicPath: 'http://localhost:3000/assets',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
                test: /\.js$/,
                loader: 'babel-loader'
            }, {
                test: /\.jsx$/,
                loader: 'react-hot!babel-loader!jsx-loader?harmony'
            }, {
                test: /\.less/,
                loader: 'style-loader!css-loader!less-loader'
            }, {
                test: /\.(css)$/,
                loader: 'style-loader!css-loader'
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }

        ]
    },
    plugins: [
        // 一定要加这个插件
        new webpack.HotModuleReplacementPlugin()
    ]
}
