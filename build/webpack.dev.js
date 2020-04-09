const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common')

const devConfig = {
  mode: 'development',
  module: {
    rules: [{
			test: /\.scss$/,
			use: [
				// 从下往上执行
				'style-loader', 
				{
					loader: 'css-loader',
					// scss 内引入其他 scss 文件，也执行下面 postcss-loader 和 sass-loader
					options: {
						importLoaders: 2,
						modules: true	// 模块化样式，只对当前引入文件生效
					}
				},
				'sass-loader',
				'postcss-loader'
			]
		}, {
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader',
				'postcss-loader'
			]
		}]
  },
	/**
   * 映射关系，提示相关信息指向真实文件位置
   * source-map 会生成.map文件
   * inline- 是把xxx.map 文件内置到main.js里面，并精确行列提示
   * cheap- 则是只提示行信息，不带列信息，并且负责业务代码
   * module- 负责管loader，第三方模块的信息
   * eval 则是打包速度最快，性能最好，但提示不够全面。会将source-map文件放到dist目录的输出的js中
   */
	devtool: 'cheap-module-eval-source-map',	// 开发环境最佳实践。线上代码则可以去掉 eval-
	devServer: { // 启动 http 服务器，并实行热更新
    contentBase: '/dist',  // 配置web服务器在哪个文件夹下启动
    open: true,  // 启动自动打开网页
    // middleware: "node server.js",  // 自定义web服务器
    port: 8080,
    hot: true,  // 配合HotModuleReplacementPlugin完全开启 HMR
    // hotOnly: true   // 即使HMR不生效，也不要浏览器刷新
  },
	plugins: [
		new webpack.HotModuleReplacementPlugin()  // webpack 内置
  ],
  output: {
    filename: '[name].js',  // 入口文件名称，如果文件直接引用，就走这里
		chunkFilename: '[name].js',  // 引用文件名称，如果文件间接被引用，就走这里
  }
}

module.exports = merge(commonConfig, devConfig);