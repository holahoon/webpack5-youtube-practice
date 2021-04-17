const path = require("path");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

let mode = "development";
let target = "web"; // to solve postcss - browserslist bug ( by default, target is set to 'web' )
const plugins = [
  new CleanWebpackPlugin(),
  new MiniCSSExtractPlugin(),
  new HtmlWebpackPlugin({ template: "./src/index.html" })
];

if (process.env.NODE_ENV === "production") {
  // - production mode
  mode = "production";
  target = "browserslist"; // to solve postcss - browserslist bug
} else {
  // - development mode
  plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
  mode: mode,
  target: target, // to solve postcss - browserslist bug

  entry: "./src/index.js", // after webpack 5, this isn't really required if sticking with default, but ReactRefreshWebpackPlugin requires it to be present

  output: {
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[hash][ext][query]" // creates an images directory and puts all of the images inside
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        // type: "asset/resource" // outputs all of the image files
        // type: "asset/inline" // inlines all the images into JavaScript - useful when you have really small images
        type: "asset", // will just inline small image files into JS and output image files that are big
        parser: {
          dataUrlCondition: {
            maxSize: 30 * 1024 // only the image that's bigger than this image will be in images file and others will be inline JS
          }
        }
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader,
            options: { publicPath: "" }
          },
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ] // every array in webpack reads from right to left
      },
      {
        test: /\.jsx?$/, // may or may not have an x at the end
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },

  plugins: plugins,

  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx"]
  },

  devtool: "source-map",
  devServer: {
    contentBase: "./dist",
    hot: true // hot reloading
  }
};
