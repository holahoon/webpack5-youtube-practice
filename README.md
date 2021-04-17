# Webpack 5 project setup tutorial practice

learned from [Youtube](https://www.youtube.com/watch?v=TOb1c39m64A&t=180s)

### CSS
In this tutorial, we are using `sass` and `postcss`.
I honestly don't know if I'm ever going to be using `postcss`, but just make sure to create a `postcss.config.js` file and specify the `preset-env` that you installed.

```javascript
module.exports = {
  plugins: ['postcss-preset-env'],
};

```

and in webpack config, make sure that `'postcss-loader'` is after `'sass-loader'` (*in webpack, it runs right to left for arrays*).

```javascript
// webpack.config.js
use: [MiniCSSExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
```

### browsers list
Both `postcss` and `babel` will look at the `.browserslistrc` to see which browser it needs to support.
`.browserslistrc` file kind of lets you be more specific on targeting older browsers. By doing so, it will create [vendor prefix](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix) in your built `dist` `css` file.

### babel

[`@babel/preset-env`](https://babeljs.io/docs/en/babel-preset-env) - is a smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms.

[`@babel/react-env`](https://babeljs.io/docs/en/babel-preset-react) - for adding react with babel.
```javascript
// babel.config.js
module.exports = {
  presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
};
```
This allows you not need to import React when working with JSX in your file.

### dealing with files

In previous webpack (prior to webpack 5), you would have to install `file loader` or `url loader`

### in package.json

`"clean": "rm -rf dist"` just deletes `dist` folder

### React refresh webpack plugin
[npm react-refresh-webpack-plugin](https://www.npmjs.com/package/react-refresh-webpack-plugin)

```bash
$ npm install -D @pmmmwh/react-refresh-webpack-plugin react-refresh
```

```javascript
// [ babel.config.js ]
const plugins = [];

if (process.env.NODE_ENV !== "production") plugins.push("react-refresh/babel");

module.exports = {
  presets: ["@babel/preset-env", ["@babel/preset-react", { runtime: "automatic" }]],
  plugins: plugins
};
```

> This check was needed because react-refresh babel should only be enabled in development
> This is also needed in webpack.config.js file as well