const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

let mode = 'development';
let target = 'web'; // to solve postcss - browserslist bug ( by default, target is set to 'web' )

if (process.env.NODE_ENV === 'production') {
  mode = 'production';
  target = 'browserslist'; // to solve postcss - browserslist bug
}

module.exports = {
  mode: mode,
  target: target, // to solve postcss - browserslist bug

  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [MiniCSSExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'], // every array in webpack reads from right to left
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  plugins: [new MiniCSSExtractPlugin()],

  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    hot: true, // hot reloading
  },
};
