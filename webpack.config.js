var webpack = require('webpack');

module.exports = {
  context: __dirname + "/app",

  entry: {
    javascript: "./index.js",
    html: "./index.html",
  },

  output: {
    filename: "bundle.js",
    path: __dirname + "/public",
    publicPath: __dirname + '/public',
  },
 
  module: {
    loaders: [
      { test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"],
      },
      { test: /\.html$/,
        loader: "file?name=[name].[ext]",
      },
      { test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["react-hot", "babel-loader"],
      },
      // Adding a loader for css. To do this with less you download the 
      // less-loader and add it to the end of the load string here, and 
      // of course test for less files, not css
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      // Any png-image or woff-font below or equal to 100K will be converted 
      // to inline base64 instead
      { test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/, loader: 'url-loader?limit=100000' },
    ],
  }
};
