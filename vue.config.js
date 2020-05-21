const target = 'http://47.98.127.171:80';
module.exports = {
  // https://github.com/vuejs/vue-cli/issues/2595
  devServer: {
    // 所有的接口请求代理
    proxy: {
      '/': {
        target: target,
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^api': ''
        }
      }
    }
  },
  baseUrl: process.env.NODE_ENV === 'production' ? '././' : '/',
  productionSourceMap: false,
};