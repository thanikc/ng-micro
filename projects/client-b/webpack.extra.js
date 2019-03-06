const { Externals } = require('share-loader');

module.exports = {
    externals: [
        Externals({
            namespace: 'portal',
            modules: [[/@angular/, /rxjs/]]
        })
    ],
};