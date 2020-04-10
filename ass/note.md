### mode: development | production | none
```
  // 配置 mode: 'development' 相当于配置了
    module.exports = {
      devtool: 'eval',
      cache: true,
      performance: {
        // 性能设置,文件打包过大时，不报错和警告，只做提示
        hints: false
      },
      output: {
        // 打包时，在包中包含所属模块的信息的注释
        pathinfo: true
      },
      optimization: {
        // 使用可读的模块标识符进行调试
        namedModules: true,
        // 使用可读的块标识符进行调试
        namedChunks: true,
        // 设置 process.env.NODE_ENV 为 development
        nodeEnv: 'development',
        // 不标记块是否是其它块的子集
        flagIncludedChunks: false,
        // 不标记模块的加载顺序
        occurrenceOrder: false,
        // 不启用副作用
        sideEffects: false,
        usedExports: false,
        concatenateModules: false,
        splitChunks: {
          hidePathInfo: false,
          minSize: 10000,
          maxAsyncRequests: Infinity,
          maxInitialRequests: Infinity,
        },
        // 当打包时，遇到错误编译，仍把打包文件输出
        noEmitOnErrors: false,
        checkWasmTypes: false,
        // 不使用 optimization.minimizer || TerserPlugin 来最小化包
        minimize: false,
        removeAvailableModules: false
      },
      plugins: [
        // 当启用 HMR 时，使用该插件会显示模块的相对路径
        // 建议用于开发环境
        new webpack.NamedModulesPlugin(),
        // webpack 内部维护了一个自增的 id，每个 chunk 都有一个 id。
        // 所以当增加 entry 或者其他类型 chunk 的时候，id 就会变化，
        // 导致内容没有变化的 chunk 的 id 也发生了变化
        // NamedChunksPlugin 将内部 chunk id 映射成一个字符串标识符（模块的相对路径）
        // 这样 chunk id 就稳定了下来
        new webpack.NamedChunksPlugin(),
        // 定义环境变量
        new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
      ]
    }
```
```
  配置 mode: 'production' 相当于配置了
    module.exports = {
      performance: {
        // 性能设置,文件打包过大时，会报警告
        hints: 'warning'
      },
      output: {
        // 打包时，在包中不包含所属模块的信息的注释
        pathinfo: false
      },
      optimization: {
        // 不使用可读的模块标识符进行调试
        namedModules: false,
        // 不使用可读的块标识符进行调试
        namedChunks: false,
        // 设置 process.env.NODE_ENV 为 production
        nodeEnv: 'production',
        // 标记块是否是其它块的子集
        // 控制加载块的大小（加载较大块时，不加载其子集）
        flagIncludedChunks: true,
        // 标记模块的加载顺序，使初始包更小
        occurrenceOrder: true,
        // 启用副作用
        sideEffects: true,
        // 确定每个模块的使用导出，
        // 不会为未使用的导出生成导出
        // 最小化的消除死代码
        // optimization.usedExports 收集的信息将被其他优化或代码生成所使用
        usedExports: true,
        // 查找模块图中可以安全的连接到其它模块的片段
        concatenateModules: true,
        // SplitChunksPlugin 配置项
        splitChunks: {
          // 默认 webpack4 只会对按需加载的代码做分割
          chunks: 'async',
          // 表示在压缩前的最小模块大小,默认值是30kb
          minSize: 30000,
          minRemainingSize: 0,
          // 旨在与HTTP/2和长期缓存一起使用 
          // 它增加了请求数量以实现更好的缓存
          // 它还可以用于减小文件大小，以加快重建速度。
          maxSize: 0,
          // 分割一个模块之前必须共享的最小块数
          minChunks: 1,
          // 按需加载时的最大并行请求数
          maxAsyncRequests: 6,
          // 入口的最大并行请求数
          maxInitialRequests: 4,
          // 界定符
          automaticNameDelimiter: '~',
          // 块名最大字符数
          automaticNameMaxLength: 30,
          cacheGroups: { // 缓存组
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
            }
          }
        },
        // 当打包时，遇到错误编译，将不会把打包文件输出
        // 确保 webpack 不会输入任何错误的包
        noEmitOnErrors: true,
        checkWasmTypes: true,
        // 使用 optimization.minimizer || TerserPlugin 来最小化包
        minimize: true,
      },
      plugins: [
        // 使用 terser 来优化 JavaScript
        new TerserPlugin(/* ... *\/),
        // 定义环境变量
        new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
        // 预编译所有模块到一个闭包中，提升代码在浏览器中的执行速度
        new webpack.optimize.ModuleConcatenationPlugin(),
        // 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。
        // 这样可以确保输出资源不会包含错误
        new webpack.NoEmitOnErrorsPlugin()
      ]
    }
```

```
  // 配置 mode: 'none' 相当于配置了
    module.exports = {
      performance: {
      // 性能设置,文件打包过大时，不报错和警告，只做提示
      hints: false
      },
      optimization: {
        // 不标记块是否是其它块的子集
        flagIncludedChunks: false,
        // 不标记模块的加载顺序
        occurrenceOrder: false,
        // 不启用副作用
        sideEffects: false,
        usedExports: false,
        concatenateModules: false,
        splitChunks: {
          hidePathInfo: false,
          minSize: 10000,
          maxAsyncRequests: Infinity,
          maxInitialRequests: Infinity,
        },
        // 当打包时，遇到错误编译，仍把打包文件输出
        noEmitOnErrors: false,
        checkWasmTypes: false,
        // 不使用 optimization.minimizer || TerserPlugin 来最小化包
        minimize: false,
      },
      plugins: []
    }
```