const path = require('path');
const config = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/index.jsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [{
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react'],
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
//npm i mobx -S 安装mobx
//npm i react reatc-dom prop-types mobx-react -S 引入react
//npm i babel-preset-react -D 开发依赖编译JSX语法