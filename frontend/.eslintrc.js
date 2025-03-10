// .eslintrc.js
module.exports = {
    root: true, // 프로젝트 루트에서 설정을 적용
    env: {
      node: true, // Node.js 환경을 인식하도록 설정
    },
    extends: [
      'plugin:vue/vue3-essential', // Vue 3 관련 기본 ESLint 규칙
      'eslint:recommended', // ESLint 기본 권장 규칙
    ],
    parserOptions: {
      parser: '@babel/eslint-parser', // Babel을 사용한 파서 설정
    },
    rules: {
      // 커스텀 규칙을 추가할 수 있습니다
    },
  };
  