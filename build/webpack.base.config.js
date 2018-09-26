const path = require('path')

const webpack = require('webpack')

const CleanWebpackPlugin = require('clean-webpack-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const { VueLoaderPlugin } = require('vue-loader')

const resolve = dirname => {
  return path.join(__dirname, '..', dirname)
}

const config = {
  mode: 'development',

  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },

  entry: {
    main: path.resolve(__dirname, '../src/main.js')
  },

  output: {
    path: resolve('dist'),
    filename: '[name].[bundle].js'
  },

  module: {
    rules: [
      {
        test: /\.(js|vue|jsx)$/,
        use: 'eslint-loader',
        exclude: [resolve('node_modules')],
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [resolve('src')],
        exclude: [resolve('node_modules')]
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.(jpg|png|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10,
              name: '[name].min.[ext]'
            }
          },
          'file-loader'
        ]
      }]
  },

  plugins: [
    new CleanWebpackPlugin([
      resolve('dist')],
    {
      root: path.resolve(__dirname, '../')
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),

    new VueLoaderPlugin(),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html')
    })
  ]
}

module.exports = config
