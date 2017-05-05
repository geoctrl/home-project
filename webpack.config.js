
var path = require('path');
var webpack = require('webpack');

// Webpack Plugins
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {

	var config = {};

	if (isProd) {
		config.devtool = 'source-map';
	} else {
		config.devtool = 'eval-source-map';
	}

	// add debug messages
	config.debug = !isProd || !isTest;

	config.entry = isTest ? {} : {
		polyfills: path.resolve(__dirname, 'app', 'polyfills.ts'),
		vendors: path.resolve(__dirname, 'app', 'vendors.ts'),
		app: path.resolve(__dirname, 'app', 'main.ts')
	};

	config.output = isTest ? {} : {
		path: root('dist'),
		publicPath: isProd ? '' : 'http://localhost:9000/',
		filename: isProd ? '[name].[hash].js' : 'js/[name].js',
		chunkFilename: isProd ? '[id].[hash].chunk.js' : '[id].chunk.js'
	};

	config.resolve = {
		cache: !isTest,
		root: root(),
		// only discover files that have those extensions
		extensions: ['', '.ts', '.js', '.json', '.css', '.scss', '.html']
	};

	config.module = {
		preLoaders: isTest ? [] : [{test: /\.ts$/, loader: 'tslint'}],
		loaders: [
			// Support for .ts files.
			{
				test: /\.ts$/,
				loader: 'awesome-typescript-loader',
				exclude: [isTest ? /\.(e2e)\.ts$/ : /\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
			},

			{
				test: /.scss$/,
				loader: 'style!css!postcss-loader!sass',
				exclude: [/node_modules/]
			},

			{test: /\.html$/, loader: 'raw'}
		],
		postLoaders: [],
		noParse: [/.+zone\.js\/dist\/.+/, /.+angular2\/bundles\/.+/, /angular2-polyfills\.js/]
	};

	if (isTest) {
		// instrument only testing sources with Istanbul, covers ts files
		config.module.postLoaders.push({
			test: /\.ts$/,
			include: path.resolve('app'),
			loader: 'istanbul-instrumenter-loader',
			exclude: [/\.spec\.ts$/, /\.e2e\.ts$/, /node_modules/]
		});

		// needed for remap-instanbul
		config.ts = {
			compilerOptions: {
				sourceMap: false,
				sourceRoot: './app',
				inlineSourceMap: true
			}
		};
	}

	config.plugins = [
		// Define env variables to help with builds
		// Reference: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
		new webpack.DefinePlugin({
			// Environment helpers
			'process.env': {
				ENV: JSON.stringify(ENV)
			}
		})
	];

	if (!isTest) {
		config.plugins.push(
				// Generate common chunks if necessary
				// Reference: https://webpack.github.io/docs/code-splitting.html
				// Reference: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
				new CommonsChunkPlugin({
					name: ['vendors', 'polyfills']
				}),

				new HtmlWebpackPlugin({
					template: 'app/index.ejs',
					envDev: process.env.NODE_ENV === 'development',
					envProd: process.env.NODE_ENV === 'production'
				})
		);
	}

	// Add build specific plugins
	if (isProd) {
		config.plugins.push(
				// Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
				// Only emit files when there are no errors
				new webpack.NoErrorsPlugin(),

				// Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
				// Dedupe modules in the output
				new webpack.optimize.DedupePlugin(),

				// Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
				// Minify all javascript, switch loaders to minimizing mode
				new webpack.optimize.UglifyJsPlugin()

		);
	}

	config.postcss = [
		autoprefixer({
			browsers: ['last 2 version']
		})
	];

	config.tslint = {
		emitErrors: false,
		failOnHint: false
	};

	config.devServer = {
		contentBase: './app',
		historyApiFallback: true,
		stats: 'minimal' // none (or false), errors-only, minimal, normal (or true) and verbose
	};

	return config;
}();

// Helper functions
function root(args) {
	args = Array.prototype.slice.call(arguments, 0);
	return path.join.apply(path, [__dirname].concat(args));
}