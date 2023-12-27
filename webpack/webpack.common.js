const path = require('path');
const HTMLWebpackPlugins = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const production = process.env.NODE_ENV === "production";

module.exports = {
    entry: path.resolve(__dirname, "..", './src/index.tsx'),
    output: {
        path: path.resolve(__dirname, "..", "./dist"),
        filename: "main.js",
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                use: [{
                    loader: "ts-loader"
                }],
                exclude: /node_modules/
            },
            {
                test: /\.css?$/,
                use: [
                    production ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                mode: "local",
                                localIdentName: '[name]__[local]__[hash: base64:5]',
                                auto: /\.module\.\w+$/i,
                            },
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|webp)$/,
                type: 'assets/resource',
                generator: {
                    filename: 'static/images/[hash][ext][query]',
                }
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: ['@svgr/webpack', 'url-loader'],
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.tsx', '.ts', '.json']
    },
    plugins: [
        new HTMLWebpackPlugins({
            template: path.resolve(__dirname, '..', './public/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: production
            ? 'static/styles/[name].[contenthash].css'
            : 'static/styles/[name].css'
        }),
        new CleanWebpackPlugin()
    ]
}