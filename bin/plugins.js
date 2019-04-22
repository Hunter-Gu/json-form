const $path = require('path')
const webpack = require('webpack')
const { getFilename } = require('./utils')

exports.getDefinePlugin = function () {
  return new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
}

exports.getCleanPlugin = function (...paths) {
  const CleanWebpackPlugin = require('clean-webpack-plugin');

  return new CleanWebpackPlugin(paths, { allowExternal: true })
}

exports.getDevHelperPlugins = function () {
  const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
  const WebpackNotifierPlugin = require('webpack-notifier')

  return [
    new WebpackNotifierPlugin(),
    new FriendlyErrorsWebpackPlugin()
  ]
}

exports.getProdHelperPlugins = function () {
  return [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
}
