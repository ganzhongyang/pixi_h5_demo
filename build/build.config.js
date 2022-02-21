const resolveDirPath = require('./paths')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const TEMPLATE_DIR = process.env.npm_config_dir

module.exports = {
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [resolveDirPath(`dist/${ TEMPLATE_DIR }`)]
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        minify: TerserPlugin.terserMinify
      }),
      new CssMinimizerWebpackPlugin()
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          filename: './js/[name].[chunkhash].js'
        }
      }
    }
  }
}
