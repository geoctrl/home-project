var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var path = require('path');
var commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
	devtool: 'source-map',

	output: {
		path: path.resolve(__dirname, '..', 'dist'),
		filename: '[name].[hash].js',
		chunkFilename: '[id].[hash].chunk.js'
	},

	htmlLoader: {
		minimize: false // workaround for ng2
	},

	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.DefinePlugin({
			'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		})
	]
});