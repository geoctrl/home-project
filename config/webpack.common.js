var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'build';
var isTest = ENV === 'test' || ENV === 'test-watch';

module.exports = {
	entry: isTest ? {} : {
		polyfills: path.resolve(__dirname, '..', 'app', 'polyfills.ts'),
		vendors: path.resolve(__dirname, '..', 'app', 'vendors.ts'),
		app: path.resolve(__dirname, '..', 'app', 'main.ts')
	},
	resolve: {
		extensions: ['', '.js', '.ts']
	},
	module: {
		loaders: [
			{
				test: /\.ts$/,
				loader: 'awesome-typescript-loader',
				exclude: [/node_modules/, /lib/]
			},
			{
				test: /.html$/,
				loader: 'raw',
				exclude: [/node_modules/, /lib/]
			},
			{
				test: /.scss$/,
				loader: 'style!css!postcss-loader!sass',
				exclude: [/node_modules/, /lib/]
			}
		],
		postLoaders: !isTest ? [] : [{
			test: /\.ts$/,
			include: path.resolve('src'),
			loader: 'istanbul-instrumenter-loader',
			exclude: [/\.spec\.ts$/, /\.e2e\.ts$/, /node_modules/]
		}]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: ['app', 'vendors', 'polyfills']
		}),
		new HtmlWebpackPlugin({
			template: 'app/index.ejs',
			envDev: process.env.NODE_ENV === 'development',
			envProd: process.env.NODE_ENV === 'production'
		})

	],
	tslint: {
		emitErrors: false,
		failOnHint: false,
		resourcePath: 'src'
	},
	postcss: function() {
		return [require('autoprefixer')];
	}
};