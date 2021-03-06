// 由于 mini-css-extract-plugin 不支持 HMR，所以只在prod环境使用
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// 合并和压缩css文件
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
// 配置渐进式网络程序（PWA）
const WorkboxPlugin = require('workbox-webpack-plugin')

const merge = require('webpack-merge');
const commonConfig = require('./webpack.common')

const prodConfig = {
	mode: 'production',	// 打包代码会被压缩
	devtool: 'cheap-module-source-map',
	module: {
		rules: [{
			test: /\.scss$/,
			use: [
				// 从下往上执行
				MiniCssExtractPlugin.loader, 
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
				MiniCssExtractPlugin.loader,
				'css-loader',
				'postcss-loader'
			]
		}]
	},
	plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].chunk.css"
		}),
		new WorkboxPlugin.GenerateSW({
			// ServiceWorkers
			clientsClaim: true,
     	skipWaiting: true
		})
	],
	optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
		],
		// 如果有多个入口文件，需要把css打包在同一个文件里，需要配置
		// splitChunks: {
    //   cacheGroups: {
    //     styles: {
    //       name: 'styles',  // 打包到名称为 styles 文件里
    //       test: /\.css$/,  // 打包文件是 css后缀 的文件
    //       chunks: 'all',  // 不管同步还是异步
    //       enforce: true
    //     }
    //   }
		// }
		// 也可以配置到多入口对应多个css文件
	},
	output: {
		// 处理线上代码的浏览器缓存
		// 源代码改变，打包生成的contenthash也跟着改变
		filename: '[name].[contenthash].js',
		// 公共块名，非入口，第三方库
		chunkFilename: '[name].[contenthash].js',
  }
}

module.exports = merge(commonConfig, prodConfig);