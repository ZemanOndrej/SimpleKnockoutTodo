let debug = process.env.NODE_ENV !== "production";
let webpack = require('webpack');
let path = require("path");



let APP_DIR = path.join(__dirname, "/");

let config = {

    devServer: {
        publicPath: "/",
        historyApiFallback: {
            index: 'index.html',
        }
    },
    context: APP_DIR,
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./js/scripts.js",
    watch: true,
    output: {
        publicPath: "/",
        path: APP_DIR + "/js",
        filename: "scripts.min.js"
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false}),
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: [ 'es2015']
                }
            }
        ]
    }
};


module.exports= config;