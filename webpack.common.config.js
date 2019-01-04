module.exports = {
    entry: {
        main: './src/index.js',
        socket_io: './src/socketio.js',
        tab_barrage: './src/components/_TabBarrage.js',
        tab_home: './src/components/_TabHome.js',
        tab_reward: './src/components/_TabReward.js',
        tab_vote: './src/components/_TabVote.js'
    },
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js'
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    module: {
        rules:
            [
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        query: {
                            presets: ['@babel/preset-react', '@babel/preset-env'],
                            plugins: [
                                '@babel/plugin-proposal-class-properties',
                                '@babel/plugin-syntax-dynamic-import',
                                ["import", { "libraryName": "antd-mobile", "style": "css" }]
                            ]
                        }
                    },
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: 'url-loader?limit=100000'
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: 'url-loader?limit=100000'
                }
            ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
