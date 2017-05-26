module.exports = {
    entry: './src/app.js',
    output: {
        path: __dirname+'/static',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
    
            {
                test: /\.html$/,
                use: "html-loader"
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    }
}