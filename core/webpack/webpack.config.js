const path = require('path');
const fs = require('fs');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const dictcConfig = require('./contentGenerator');
console.log('ssssss', JSON.stringify(dictcConfig));

const htmlPlugin = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, '../src/index.html'),
  title: 'dictc',
  // favicon: path.resolve(__dirname, '../src/images/favicon.ico')
});

// used for extracting css out of js files
const extractSass = new ExtractTextPlugin({
    filename: 'styles/[name].[hash].css',
    disable: process.env.NODE_ENV === 'development'
});

const forkTsChecker = new ForkTsCheckerWebpackPlugin({
  tsconfig: path.resolve(__dirname, '../../tsconfig.json'),
});

// This is very useful and important
const tsconfigPathResolver = new TsconfigPathsPlugin({
  configFile: path.resolve(__dirname, '../../tsconfig.json')
});

const cleanDist = new CleanWebpackPlugin(['dist/*'], {
    root: path.resolve(__dirname, '../'),
    verbose: true,
});

const globalProvide = new webpack.ProvidePlugin({
  React: 'react',
});

// It is a track
const globalDefinition = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('development'),
    DICTC_TITLE: JSON.stringify(dictcConfig.title),
    DICTC_FOOTER_TEXT: JSON.stringify(dictcConfig.footerText),
    DICTC_CONTENTS: JSON.stringify(dictcConfig.contents),
  }
});

const htmlAddAssets = new AddAssetHtmlPlugin([
  {
    filepath: path.resolve(__dirname, '../assets/css/github-markdown.css'),
    typeOfAsset: 'css',
    includeSourcemap: false,
  }
]);

const tsCheckerPlugin = new CheckerPlugin();

// Using cache to build, makes complition faster
// This could cause building fail in dev mode
const hardSourceWebpackPlugin = new HardSourceWebpackPlugin();

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '../src/ts/index.tsx'),
  devServer: {
    contentBase: path.resolve(__dirname, '../../dist'),
    port: 9000,
    stats: 'errors-only',
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx)$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              // silent: true,
              errorsAsWarnings: true
            }
          }
        ],
			},
			{
				test: /\.s?css$/,
        use: extractSass.extract({
          // use style-loader in development
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: path.resolve(__dirname, './postcss.config.js'),
                  ctx: {
                    env: 'production',
                  },
                },
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ],
        })
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'raw-loader',
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/,
        use: [
          {
            loader: 'file-loader',
          }
        ]
      },
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    plugins:[tsconfigPathResolver],
	},
	plugins: [
    cleanDist,
    htmlPlugin,
    htmlAddAssets,
    extractSass,
    tsCheckerPlugin,
    forkTsChecker,
    globalProvide,
    globalDefinition,
    hardSourceWebpackPlugin,
],
  // publicPath is essential, without which the page will fail on refreshing the browser 
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../../dist/'),
    chunkFilename: '[name].bundle.js',
    publicPath: '/'
  }
};
