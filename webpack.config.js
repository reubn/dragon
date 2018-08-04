import path from 'path'

import webpack from 'webpack'

import BabiliPlugin from 'babel-minify-webpack-plugin'
import nodeExternals from 'webpack-node-externals'

  const devMode = process.env.NODE_ENV !== 'production'

  export default [{
    mode: 'development',
    entry: './src',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'index.js'
    },
    target: 'node',
    externals: [(context, request, callback) => {
      const nodeModulesPath = path.resolve(__dirname, '../node_modules')
      const fixedRequest = request.replace(`${nodeModulesPath}/`, '')
      return nodeExternals()(context, fixedRequest, callback)
    }],
    module: {
      rules: [
        {test: /\.js$/, loader: 'babel-loader'}
      ]
    },
    plugins: [
      devMode ? () => 0 : new BabiliPlugin()
    ]
  }]
