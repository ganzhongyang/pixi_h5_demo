const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackBar = require('webpackbar')
const { DefinePlugin } = require('webpack')
const { merge } = require('webpack-merge')
const buildConfig = require('./build.config')
const devConfig = require('./dev.config')
const resolveDirPath = require('./paths')
const TEMPLATE_DIR = process.env.npm_config_dir
const baseConfig = {
  entry: `./src/template/${ TEMPLATE_DIR }/index.js`,
  output: {
    path: resolveDirPath(`./dist/${ TEMPLATE_DIR }`),
    filename: './js/[name].[contenthash:8].js'
  },
  mode: process.env.NODE_ENV,
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': resolveDirPath('../src')
    }
  },
  module: {
    rules: [
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] },
      { test: /\.js$/, exclude: /\/node_modules/, use: ['babel-loader'] }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: 'body',
      templateParameters: {//允许覆盖模板中使用的参数
        title: TEMPLATE_DIR,//动态写入title
        createTime: new Date()//模板中显示编译时间
      }
    }),
    new MiniCssExtractPlugin({
      filename: './css/index.css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolveDirPath('./public/favicon.ico'),
          to: resolveDirPath(`./dist/${ TEMPLATE_DIR }/favicon.ico`)
        },
        {
          from: resolveDirPath(`./public/${ TEMPLATE_DIR }/resources`),
          to: resolveDirPath(`./dist/${ TEMPLATE_DIR }/resources`)
        }
      ]
    }),
    new DefinePlugin({
      'process.env': {
        TEMPLATE_DIR: JSON.stringify(TEMPLATE_DIR),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new WebpackBar({
      name: '晓阳PIXI学习',
      color: '#00ffff'
    })
  ]
}

module.exports = () => {
  const config = process.env.NODE_ENV === 'production' ? buildConfig : devConfig
  return merge(baseConfig, config)
}
