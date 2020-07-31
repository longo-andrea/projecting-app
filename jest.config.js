module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/components/**/*.{js,vue}',
    '!src/main.js',
    '!src/**/index.js', // ignoring index of each component's folder
  ],
};
