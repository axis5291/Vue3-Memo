module.exports = {
  configureWebpack: {
    plugins: [],
  },
  lintOnSave: false, // ⚠️ 필요하면 이 줄도 추가 (ESLint 완전 비활성화)
  devServer: {
    proxy: {
        "/api": {
            target: "http://localhost:3000",
            changeOrigin: true,
        }
    }
}
};

