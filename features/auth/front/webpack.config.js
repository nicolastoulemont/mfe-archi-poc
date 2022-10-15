const HtmlWebPackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const { PORTS_MAP } = require('@poc/ports-map')
const federation = require('./federation.config.json')

const deps = require('./package.json').dependencies
module.exports = {
  name: 'auth-front',
  output: {
    publicPath: `http://localhost:${PORTS_MAP.AUTH.DEV_WEB_SERVER}/`,
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },

  devServer: {
    port: PORTS_MAP.AUTH.DEV_WEB_SERVER,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      ...federation,
      filename: 'remoteEntry.js',
      remotes: {
        store: `store@http://localhost:${PORTS_MAP.STORE.DEV_WEB_SERVER}/remoteEntry.js`,
      },
      exposes: {
        '.': './src/bootstrap',
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: deps['react-router-dom'],
        },
        '@poc/query': {
          singleton: true,
          requiredVersion: deps['@poc/query'],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
  ],
}
