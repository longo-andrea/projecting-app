module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/components/**/*.{js,vue}',
    'src/views/**/*.{js,vue}',
    '!src/views/Homepage.vue',
    '!src/views/project/ProjectStats.vue',
    '!src/main.js',
    '!src/**/index.js',
  ],
};
