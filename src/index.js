/**
 * 代码分割 code splitting，与webpack无关
 * 在webpack中有两种方式
 * 1. 同步代码： 只需要在webpack.common.js中做optimazation 的配置
 * 2. 异步代码（import引入）： 无需做任何配置，就会自动做分割。
 *        安装 babel-plugin-dynamci-import-webpack，在babelrc配置
 */
// import _ from 'lodash'

// const element = document.createElement('div')
// element.innerHTML = _.join(['Derrick', 'Liu'], '***')
// document.body.appendChild(element)

// 异步加载第三方库，放入单独的文件
// 通过 import 还能实现模块代码懒加载
// 使用 import ，因为是 promise，所以必须使用 babel-polyfill
// async function getComponent() {
//   const { default: _ } = await import(/* webpackChunkName:"lodash" */'lodash')
//   const element = document.createElement('div')
//   element.innerHTML = _.join(['Derrick', 'Liu'], '***')
//   return element
// }

// document.addEventListener('click', () => {
//   getComponent().then(element => {
//     document.body.appendChild(element)
//   })
// })

console.log('hello world')

// /* webpackPrefetch: true */ 网络闲时加载
// 利用缓存来提升性能比较有限，应该考虑如何使页面加载代码利用率更高
// 通过command + shift + p 查看加载的文件使用率
// document.addEventListener('click', () => {
//   // 这里 _func 下划线表示默认到处的方法
//   import(/* webpackPrefetch: true */ './click.js').then(({default: _func}) => {
//     _func()
//   })
// })

// css 文件拆分和合并，压缩
// import './style.css'