module.exports = {
	entry: './example/src/example.js',
	output: {
		filename: './example/index.js'
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.js$/,
				use: [
					{ loader: 'babel-loader' }
				],
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.js']
	}
};