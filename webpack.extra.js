module.exports = {
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: [{
                    loader: 'share-loader',
                    options: {
                        modules: [/@angular/, /rxjs/],
                        namespace: 'portal'
                    }
                }]
            }
        ]

    }
};
