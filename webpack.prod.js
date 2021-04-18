const baseConfig = require('./webpack.common')

const { merge } = require('webpack-merge')

const config = {
  mode: 'production',
  output: {
    publicPath: '/chess'
  }
}

module.exports = merge(baseConfig, config)
