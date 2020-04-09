const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: {
		main: './src/index.js',
		// lodash: './src/lodash.js'	// Code Splitting 代码手动分割示例
	},
	module: {
		rules: [{ 
			test: /\.js$/, 
			exclude: /node_modules/, 
			use: [
				{
					loader: 'babel-loader'
				},
				{
					loader: 'imports-loader?this=>window'  // 安装 imports-loader ，原本this是指向模块自身。该配置将该模块this 指向 window
				}
			]
		}, {
			test: /\.(jpg|png|gif)$/,
			use: {
				loader: 'url-loader',
				options: {
					name: '[name]_[hash].[ext]',
					outputPath: 'images/',
					limit: 10240	// 如果图片小于10240字节，将会以base64的形式放在打包文件内。可以减少http请求，提升网页加载速度
				}
			} 
		}, {
			test: /\.(eot|ttf|svg)$/,
			use: {
				loader: 'file-loader'
			} 
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html'	// 指定参照模版生成一个html文件到dist文件夹中，在打包之后运行
		}), 
		// 第三方插件，帮助删除dist目录下的文件，在打包之前运行
		// 默认会认为common.js所在的目录就是根目录。配置root可解决
		new CleanWebpackPlugin(['dist'], {
			root: path.resolve(__dirname, '../')
		}),
		new webpack.ProvidePlugin({
			_: 'lodash'  // 如果一个模块中使用了 _ ， 就会自动引入 lodash 库，然后把 lodash 赋值给 _
		})
	],
	performance: false, // 去掉一些性能警告
	optimization: {
		// 如果低版本webpack，在未修改的代码时，打包出来的contenthash却不同的时候做该配置，会生成一个runtime文件
		// runtime 文件存放的是打包出来的业务代码和库代码之间的关联代码。里面不再存在manifest
		runtimeChunk: {  
			name: 'runtime'
		},
		// development模式，只打包使用过的模块。
		// tree shaking 只支持 ES module。另外需要在pkg中配置sideEffects: false，也可以配置哪些文件不需要被排除在外，比如["*.css"]
		usedExports: true,
		splitChunks: {	// 不管是同步和异步的代码分割，都需要使用这个插件
			//  'async' 只针对异步代码分割，但异步才能提高加载性能，同步只是增加缓存
			//  'all' 会自动识别同步还是异步 
			// 'initial' 只针对同步
			chunks: 'all',  

			/** 下面都是默认项，不需要重新配置 */
      // minSize: 30000,	// 控制引入的模块/库/包 大于该数值字节的时候才会进行代码分割
      // maxSize: 0,
      // minChunks: 1,	// 在打包生成的chunk里，模块/库/包至少引用1次时，就进行代码分割
      // maxAsyncRequests: 5,  // 同时加载的模块/库/包 最多只有5个的时候，就代码分割。在打包前5个的时候生成，超过5个的就不管了
      // maxInitialRequests: 3,  // 网站首页或者入口文件加载时，引入的库进行代码分割，最多只能分割成三个js文件，超过3个就不管了
      // automaticNameDelimiter: '~',  // 文件生成时，文件名中间的连接符
			// name: true,
			// /** 上面的配置项对同步引入有效，并且还会走到cacheGroups */
      cacheGroups: {	// 相当于缓存组，可以把多个库打包到一起
        vendors: {	
					// test会检测引入的库是否在node_modules里面，如果符合，就把库打包到vendors组里
					// 生成的文件名则是 vendors～[entry.js](入口文件名)
          test: /[\\/]node_modules[\\/]/,
					priority: -10,  // 值越大，优先级越高
					name: 'verdors'	// 自定义打包文件名
				},
			// 	// 生成的文件名则是 default～[entry.js](入口文件名)
        default: {
          priority: -20,
					reuseExistingChunk: true,	// 如果某个模块已经被打包，再次打包的时候，就直接使用了
					// name: 'common'	// 自定义打包文件名
				}
      }
		}
	},
	output: {
		// publicPath: '/', // 配置打包出来的html中对于打包后的js的引用地址前缀
		path: path.resolve(__dirname, '../dist')  // path.resolve(__dirname, 'dist')
	}
}
