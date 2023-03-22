const path = require('path');
// 1.引入插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 引入vue-loader
const {VueLoaderPlugin} = require('vue-loader')

module.exports = {
  // 打包入口文件路径
  entry: './src/index.js',
  // 打包输出文件路径，filename为打包后的文件名
  output:{
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.js',
    assetModuleFilename: 'img/[name].[hash:6][ext]'
  },
  // 定义一些规则
  module: {
    rules: [
      {
        test:/\.css$/,
        use:[
            'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            // 配置参数
            options:{
              postcssOptions:{
              //   添加插件autoprefixer
                plugins: [
                    require('autoprefixer'),
                    require('postcss-preset-env')
                    ]
              }
            }
          }] // 从右往左执行loader
      },
      {
        test:/\.scss$/,
        use:['style-loader','css-loader'] // 从右往左执行loader
      },
      //   处理图片
      {
        test:/\.(png|jpg|svg|gif|jpe?g)$/,
        type: 'asset/resource', // 直接拷贝图片
        // type: 'asset/inline',//转成 base64
        generator:{
          filename:'img/[name].[hash:6][ext]'
        },
        parser:{
          dataUrlCondition: {
            maxSize: 30*1024
          }
        },
      },
      // 字体图标
      {
        test: /\.(ttf|woff2?)$/,
        type:'asset/resource',
        generator:{
          filename:'font/[name].[hash:3][ext]'
        },
      },
    //     处理js
      {
        test:/\.js$/,
        exclude: /node_modules/,
        use:['babel-loader'],
      },
      {
        test:/\.vue$/,
        use:['vue-loader']
      }

    ]
  },
  plugins: [
    // 2.使用插件
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack5study',
      template: './src/index.html',

    }),
    new VueLoaderPlugin(),
  ],
  target: 'web',
  devServer: {
    hot: true,
    hotOnly:true,
    //默认端口
    port:4000,
    //自动打开浏览器
    open:false,
    //开启服务端压缩
    compress: true,
    //使用 History 路由模式时，若404错误时被替代为 index.html
    historyApiFallback: true,
    // proxy
    proxy: {
      //定义一个标记，如以后api开头的请求都走代理的设置
      '/api': {
        // 要请求的真实服务端基地址 相当于被/api替代了
        target: 'https://...',
        //把api重写为空，因为别人没有 /api
        pathRewrite: {"^/api":""},
        //发送请求头中host会设置成target
        changeOrigin: true
      }
    }
  },
  mode: 'development'

}