module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
   customExportConditions: ["node", "node-addons"],
 }
};
