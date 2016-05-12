var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// environment variables
var envDev = (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV),
		envProd = process.env.NODE_ENV === 'production';

var config = {
	entry: path.resolve(__dirname, 'app', 'app.ts'),
	output: {
		path: path.resolve(__dirname, 'app'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.ts', '.js']
	},
	module: {
		loaders: [
			{
				test: /.ts$/,
				loader: 'awesome-typescript-loader'
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
		new webpack.DefinePlugin({
			__DEV__: envDev,
			__PROD__: envProd
		}),
		new HtmlWebpackPlugin({
			template: 'app/index.ejs',
			envDev: envDev,
			envProd: envProd
		})

	],
	postcss: function() {
		return [require('autoprefixer')];
	}
};

if (process.env.NODE_ENV === 'development') {

}

if (process.env.NODE_ENV === 'production') {
	config.output.path = path.resolve(__dirname, 'dist');
	// config.devtool = 'source-map';
	config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;
