/**
 * 在node中使用webpack
 * 自定义配置web服务器，并打包
 * webpack-dev-middleware 监听打包代码发生的变化
 * 然后通过编译器处理重新打包
 */

// const express = require('express')
// const webpack = require('webpack')
// const webpackMiddleWare = require('webpack-dev-middleware')
// const config = require('./webpack.dev.js')
// const complier = webpack(config)

// const app = express()

// app.use(webpackMiddleWare(complier, {
//   // publicPath: config.output.publicPath // 可选
// }))

// app.listen(3000, () => {
//   console.log('server is running')
// })