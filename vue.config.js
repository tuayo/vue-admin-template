const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
  },
  devServer: {
    port: 1234,
    hot: true,
    open: false, // 自动打开浏览器
    proxy: {
      "^api": {
        target: "http://127.0.0.1:9999",
        changeOrigin: true, // 允许跨域
        ws: false
      }
    }
  }
}
