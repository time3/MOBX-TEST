const path = require('path');
const config = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env'],
                    plugins: ['transform-decorators-legacy','transform-class-properties']
                }
            }
        }]
    },
    devtool: 'inline-source-map'
}

module.exports = config;

//1. babel-plugin-transform-class-properties 转义calss类的属性
//1.npm i babel-plugin-transform-decoorators-legacy -D转义decorators 修饰器