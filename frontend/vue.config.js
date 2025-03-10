const { defineConfig } = require('@vue/cli-service');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new ESLintPlugin({
        extensions: ['js', 'vue'], // ESLint가 검사할 파일 확장자
      }),
    ],
  },
});
