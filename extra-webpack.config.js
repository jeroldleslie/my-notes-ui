const webpack = require('webpack');

module.exports = {
  plugins: [new webpack.DefinePlugin({
    'processLocal.env': {
      API_URL: JSON.stringify(process.env.API_URL)
    }
  })]
}