var webpack = require('webpack');

module.exports = {
    entry: {
        app: './js/app.jsx'
    },
    output: {
        path: __dirname + '/assets',
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: ['', '.js', 'jsx']
    },
    module: {
        loaders: [{
                test: /\.js$/,
                loader: 'babel-loader'
            }, {
                test: /\.jsx$/,
                loader: 'babel-loader!jsx-loader?harmony'
            }

        ]
    }
}
