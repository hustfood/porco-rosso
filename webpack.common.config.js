module.exports = {
    entry: [
        './src/index.js',
    ],
    output: {
        filename: 'main.js',
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
                            presets: ['react', 'es2015'],
                            plugins: []
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
