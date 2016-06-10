var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');


module.exports = webpackMerge(commonConfig, {
	// devtool: 'cheap-module-eval-source-map',
	//
	output: {
		path: path.resolve(__dirname, '..', 'app'),
		publicPath: 'http://localhost:8080/',
		filename: '[name].js',
		chunkFilename: '[id].chunk.js'
	},
	
	module: {
		loaders: [{
			test: /\.ts$/,
			loader: 'tslint-loader',
			exclude: [/node_modules/, /lib/]
		}]
	},
	
	plugins: [
		new webpack.DefinePlugin({
			'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		})
	],
	
	devServer: {
		historyApiFallback: true
	}
});