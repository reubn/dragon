import path from 'path'

import BabiliPlugin from 'babel-minify-webpack-plugin'
import nodeExternals from 'webpack-node-externals'
import ExtractCssChunks from 'extract-css-chunks-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

const cssIdentifier = 'index.css'

const devMode = process.env.NODE_ENV !== 'production'

export default [{
  name: 'server',
  mode: devMode ? 'development' : 'production',
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
},
{
  name: 'front',
  mode: devMode ? 'development' : 'production',
  entry: {
    index: './src/front'
  },
  output: {
    path: path.resolve(__dirname, './dist/front'),
    filename: '[name].js'
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', {
              targets: {
                browsers: ['last 1 version', 'not dead', '> 0.2%']
              }
            }], 'stage-0', 'react']
        }
      },
      {
        test: /\.css$/,
        use: [
          ExtractCssChunks.loader, {
            loader: 'css-loader',
            query: {
              localIdentName: devMode ? '[local]-[emoji:1]' : '[emoji:2]',
              modules: true,
              minimize: !devMode
            }
          }]
      },
      {
        test: /\.woff2?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000
          }
        }
      }
    ]
  },
  plugins: [
    devMode ? () => 0 : new BabiliPlugin(),
    new ExtractCssChunks({
      filename: cssIdentifier
    }),
    new CopyWebpackPlugin(['src/front/index.html'])
  ],
  resolve: {
    extensions: ['.js', '.css', '.json']
  }
}]
