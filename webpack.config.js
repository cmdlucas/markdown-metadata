const path = require('path');
const nodeExternals = require('webpack-node-externals');
module.exports = {
    entry: "./src/index.ts",
    mode: 'production',
    target: 'node',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'bin'),
        libraryTarget: 'this'
    },
    resolve: {
        extensions: [".ts", ".js", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "awesome-typescript-loader",
                exclude: /node_modules/
            }
        ]
    },
    externals: [
        nodeExternals()
    ]
};