const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
            template: (__dirname, 'src', 'index.html'),
      })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                    use: ["style-loader", {
                        loader: "css-loder",
                        options: {
                            modules: true,
                        }
                    }
                    ],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            }
        ],
    },
  };