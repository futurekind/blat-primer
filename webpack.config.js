const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPluginHelper = require('./.blat-scripts/templates/webpackHtmlTemplateHelper');

const htmlWebpackPlugins = HtmlWebpackPluginHelper().files.map(file => {
    return new HtmlWebpackPlugin(file)
})

module.exports = {
    entry: [
        './src/js/index',
        ...HtmlWebpackPluginHelper().files.map(f => f.entry)
    ],

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },

    plugins: [
        ...htmlWebpackPlugins,
        new ExtractTextPlugin('css/main.css'),
    ],

    module: {
        
        rules: [

            {
                test: /\.html$/,
                include: [ path.resolve(__dirname, 'src') ],
                loader: 'html-loader',
                options: {
                    interpolate: true
                }
            },

            {
                test: /\.scss$/,
                use: process.env.NODE_ENV === 'production'
                    ? ExtractTextPlugin.extract({
                        fallback: "",
                        use: [
                            { loader: 'css-loader' },
                            { loader: 'postcss-loader' },
                            { loader: 'sass-loader' },
                        ]
                    })

                    : [
                        { loader: 'style-loader' },
                        { loader: 'css-loader' },
                        { loader: 'postcss-loader' },
                        { loader: 'sass-loader' },
                    ]
                
            }

        ]

    }
}