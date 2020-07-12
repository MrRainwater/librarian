const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    bundle: './src/index.tsx',
    pageAction: './src/pageAction/index.tsx'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      },
      {
        test: /(\.sass|\.scss|\.css)$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]--[hash:base64:5]'
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [new webpack.EnvironmentPlugin(['NODE_ENV'])],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.scss', 'sass'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}
