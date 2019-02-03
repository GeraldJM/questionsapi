const path = require('path');
const webpack = require('webpack');
const unminify = require('unminified-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

let config = {
    target: 'node',
    mode: 'none',
    externals: [ nodeExternals() ],
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'app.bundle.js'
    },
    watch: false,
    module: {
        rules: [
            {   
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: []
};

if(process.env.NODE_ENV == "development") {
    config.mode = 'development';
    config.watch = true;
    config.plugins = [
        new unminify(),
        new NodemonPlugin({
            watch: path.resolve('./dist'),
            script: './dist/app.bundle.js'
        })
    ]
} else if (process.env.NODE_ENV == "production") {
    config.mode = 'production';
}

console.log(`Current Environment: ${process.env.NODE_ENV}`);

webpack(config, function(err, stats) {
    if(err) {
        console.error(err.stack || err);
        if(err.details) {
            console.error(err.details);
        }
        return;
    }

    if(stats.hasErrors() || stats.hasWarnings() ) {
        console.log(stats.toString({
            chunks: false,
            colors: true
        }));
    } 
});