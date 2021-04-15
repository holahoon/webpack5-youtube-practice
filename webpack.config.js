const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

let mode = "development";
let target = "web"; // to solve postcss - browserslist bug ( by default, target is set to 'web' )

if (process.env.NODE_ENV === "production") {
  mode = "production";
  target = "browserslist"; // to solve postcss - browserslist bug
}

module.exports = {
  mode: mode,
  target: target, // to solve postcss - browserslist bug

  output: {
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

  plugins: [new MiniCSSExtractPlugin()],

  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx"]
  },

  devtool: "source-map",
  devServer: {
    contentBase: "./dist",
    hot: true // hot reloading
  }
};
