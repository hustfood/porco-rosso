const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const config = require('./webpack.dev.config');
const options = {
    publicPath: config.output.publicPath,
    hot: true,
    host: 'localhost',
    port: 3000,
    headers: { "Access-Control-Allow-Origin": "*" }
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(3000, '0.0.0.0', () => {
    console.log('dev server listening on port 3000');
});
