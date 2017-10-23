const webpack=require('webpack');
const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const CleanWebpackPlugin=require('clean-webpack-plugin');

const config={
	devtool: 'source-map',

	entry: {
		bundle: [
			'webpack-dev-server/client?http://localhost:3000',
			'webpack/hot/dev-server',
			'./src/js/index.js'
		]
	},

	output: {
    	path: path.join(__dirname, 'static'),
    	filename: '[name].js',
    	chunkFilename: '[name].js',
    	publicPath: '/'
  	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: {
					loader: 'babel-loader'
				},
				exclude: /node_modules/
			},

			{
		        test: /\.css$/,
		        use: [
		        	{
		            	loader: 'style-loader'
		          	},

		          	{
		            	loader: 'css-loader'
		          	}
		        ]
	    	},

			{
				test: /\.(jpe?g|png)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							name: '[name].[ext]',
							limit: 10000
						}
					}
				]
			},

			{ 
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                use: [
					{
						loader: 'url-loader',
						options: {
							mimetype: 'application/font-woff',
							limit: 10000
						}
					}
				]
            },

			{
				test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [
					{
						loader: 'url-loader'	
					}
				]
			}
		]
	},

	resolve: {
		modules: [
			path.resolve(__dirname, 'src'),
			'node_modules'
		],
		extensions: ['.js', '.jsx', '.css']
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),

		new CleanWebpackPlugin(['./static'], {
			root: __dirname,
			verbose: true,
			dry: false
		}),

		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html'
		})
	]
};

module.exports=config;