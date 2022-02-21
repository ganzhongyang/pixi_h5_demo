const path = require('path')

module.exports = {
  target: 'web',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, './public/game1')
    },
    hot: true,
    compress: true,
    open: true,
    port: 3000
  }
}
