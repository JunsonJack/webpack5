## 00初识webpack5
第一步，建立项目文件夹src，然后建立打包入口文件夹index.js
第二步，编写项目代码，终端输入webpack
第三步，将打包后的dist文件夹中的main.js引入到index.html中
第四步，打开index.html，查看效果

## webpack5基本配置
第一步，在src同级目录下新建一个webpack.config.js文件，里面写配置信息。
第二步，终端输入webpack，查看效果
第三步，终端输入webpack后成功打包了build.js文件，跟上面打包的main.js内容一样

## webpack5配置loader
第一步，为什么要配置loader？
webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱可用的自带能力。
loader 能让 webpack 能够去处理其他类型的文件（比如css类型文件，图片类型，txt类型等等），并将它们转换为有效模块，以供使用。
第二步，安装css-loader
```javascript
npm i css-loader -D
```
第三步，配置loader
```javascript
// 定义一些规则
module: {
  rules: [
    {
      test:/\.css$/,
      use:[
        {loader: 'css-loader'}
      ]
    }
  ]
}
```
test 属性，定义一个正则表达式，匹配需要处理的文件类型。识别出哪些文件会被转换。
use 属性，定义出在进行转换时，应该使用哪个 loader。
配置文件里配置后，别忘了在index入口文件导入css文件。

第三步，安装style-loader
上面css-loader只是能识别css文件，而引入了style-loader后css样式才能在页面展示
```javascript
npm i style-loader -D
```
webpack是从后往前执行的，所以style-loader 要写在css-loader前面

第四步，安装sass 和 sass-loader 
```javascript
npm i sass -D
npm i sass-loader -D
```

第五步，使用postcss-loader处理css兼容
postcss是JavaScript转换样式的工具，这个工具能处理css兼容问题。就是这个工具能给我们写的css代码添加一些兼容的前缀
```javascript
npm i postcss-loader -D
npm i autoprefixer -D
```
第六步，如果需要更强大的功能，可以安装postcss-preset-env
```javascript
npm i postcss-preset-env -D
```
添加配置
```javascript
{
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [
        [
          'postcss-preset-env',
          {
            browsers: 'last 2 versions'
          }
        ]
      ]
    }
  }
}
```
## webpack5assets处理图片
webpack5之后可以直接使用asset处理图片，不必再配置file-loader或url-loader。
能更好的简化使用。且它是webpack5内置模块，不必额外进行安装其它东西
```javascript
{
  test: /\.(png|svg|jpe?g|gif)$/,
  type: 'asset/resource'
}
```
## webpack5处理字体
```javascript
 // 字体图标
{
  test: /\.(ttf|woff2?)$/,
      type:'asset/resource',
    generator:{
  filename:'font/[name].[hash:3][ext]'
},
}
```
## webpack5打包前清理dist文件夹
```javascript
npm i clean-webpack-plugin -D
```
第一步，引入插件
```javascript
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
```
第二步，配置插件
```javascript
plugins: [
  new CleanWebpackPlugin()
]
```
## webpack5配置html模板
能帮我们打包后在打包目录里生成一个html文件模板，并引用入口文件。
```javascript
npm i html-webpack-plugin -D
```
第一步，引入插件
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')
```
第二步，配置插件
```javascript
plugins: [
  new HtmlWebpackPlugin({
    template: './src/index.html'
  })
]
```
## babel-loader 处理js兼容
第一步，安装babel-loader
```javascript
npm i babel-loader @babel/core @babel/preset-env -D
```
第二步，配置babel-loader
```javascript
{
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env']
    }
  }
}
```

## polyfill处理js兼容
第一步，安装core-js
```javascript
npm i @babel/polyfill --save
```
第二步，配置polyfill
```javascript
presets: [
  '@babel/preset-env',
  {
    useBuiltIns: 'entry',
    crorejs: 3
  }
]
```
## 自动更新webpack-dev-server
可以实现你修改源码后，打包后的代码也自动更新，不用每次都手动打包去更新。
第一步，安装webpack-dev-server
```javascript
npm install webpack-dev-server --save-dev
```
第二步，配置webpack-dev-server
```javascript
devServer: {
  contentBase: './dist',
  open: true,
  port: 8080
}
```
## 打包vue文件
第一步，安装vue-loader
```javascript
npm i vue-loader vue-template-compiler -D
```
第二步，配置vue-loader
```javascript
{
  test: /\.vue$/,
  loader: 'vue-loader'
}
```

## webpack5配置vue
第一步，安装vue
```javascript
npm i vue -S
```
第二步，配置vue
```javascript
import Vue from 'vue'
import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})
```






