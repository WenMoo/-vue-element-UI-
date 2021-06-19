module.exports = {
    devServer: {
        open: true,
        overlay: {
            // before:require('./src/mock/index.js'),
            warnings: false,
            errors: true
        },
        proxy: {
            '/api': {
                target: 'http://8.129.6.143:8080',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': 'http://8.129.6.143:8080'
                }
            }
        }

    }
}
