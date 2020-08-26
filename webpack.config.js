const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
//const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    stats: {
        chunkModules: true
    },
    watchOptions: {  
        poll: 1000 // Check for changes every second
    },
    optimization: {
        minimize: false,
        minimizer: [new UglifyJsPlugin({
            include: /\.min\.js$/
        })]
    },
    entry: {
        bundle: './src/app.js',
        //vendors: [
        //    'bootstrap',
        //    'vue'
        //    //"webpack-material-design-icons"
        //]
    },
    output: {
        filename: '[name].js',
        //filename: '[name]_[hash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.(css)$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.s(c|a)ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        // Requires sass-loader@^8.0.0
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                fiber: require('fibers'),
                                indentedSyntax: true // optional
                            },
                        },
                    },
                ],
            },
            { test: /\.(jpe?g|png|gif|svg|eot|woff|ttf|svg|woff2)$/, loader: "file?name=[name].[ext]" },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
        ],
    },
    plugins: [
        // make sure to include the plugin!
        //new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new CleanWebpackPlugin()
    ], 
    //resolve: {
    //    alias: {
    //        'vue$': 'vue/dist/vue.js'
    //        //'vue$': 'vue/dist/vue.js' //'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' para webpack 1
    //    },
    //    extensions: ['*', '.js', '.vue', '.json']
    //}
}; 