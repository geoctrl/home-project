var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		polyfills: path.resolve(__dirname, '..', 'app', 'polyfills.ts'),
		vendors: path.resolve(__dirname, '..', 'app', 'vendors.ts'),
		app: path.resolve(__dirname, '..', 'app', 'app.ts')
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
		]
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
	// tslint: {
	// 	emitErrors: false,
	// 	failOnHint: false,
	// 	resourcePath: 'src'
	// },
	postcss: function() {
		return [require('autoprefixer')];
	}
};