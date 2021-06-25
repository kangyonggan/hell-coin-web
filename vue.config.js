let baseUrl = 'https://kangyonggan.com/api'

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:8080'
}

module.exports = {
  devServer: {
    disableHostCheck: true,
    port: 8800,
    public: '0.0.0.0:8800',
    proxy: {
      '/api': {
        target: baseUrl,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
