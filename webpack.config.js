const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    devServer: {
        static: './dist',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
        }),
    ],
    module: {
    rules: [
            {
                test: /\.css$/i,
            use: [
                "style-loader",
                {
                    loader: 'css-loader',
                    options: {
                      sourceMap: true,
                      importLoaders: 1,
                      modules: {
                        localIdentName: '[name]__[local]__[contenthash:base64:5]',
                        auto: resourcePath => resourcePath.endsWith('.m.css'),
                      },
                    },
                  },
            ],
        },
    ],
  },
};