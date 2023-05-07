const webpack = require('webpack');

module.exports = {
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				resolve: {
					extensions: ['.js', '.jsx', '.ts', '.tsx']
				},
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
						],
					}
				}
			},

			{
				test: /\.ts$/,
				exclude: [/node_modules/],
				use: [
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			process: 'process/browser.js',
		}),
	],
};
