const webpack=require('webpack');
const express=require('express');
const path=require('path');
const webpackDevServer=require('webpack-dev-server');
const webpackConfig=require('./webpack.config.js');

const app=express();
const port=3000;

const compiler=webpack(webpackConfig);
const server=new webpackDevServer(compiler, {
	publicPath: webpackConfig.output.publicPath,
	contentBase: './src',
	historyApiFallback: true,
	hot: true,
	noInfo: false,
	stats: {
		colors: true,
		hash: false,
		timings: true,
		chunks: false,
		chunkModules: false,
		modules: false
	},
	port: 3000
});

server.listen(port, function(err) {
	if (err) {
		console.log(err);
	}
	console.info(`Listening on port ${port}`);
});