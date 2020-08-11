module.exports = {
    watch: true,
    mode: "development",
    entry: {
        index: "./static/js/index.js",
    },
    output: {
        filename: "[name].js",
        path: __dirname+'/static/js-react'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            { test: /\.(png|jpg)$/, loader: 'url-loader' },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[hash].[ext]',
                },
            },
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    }
}