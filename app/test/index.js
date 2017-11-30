import Vue from 'vue';

Vue.config.productionTip = false;

// require all test files (files that ends with .js)
const testsContext = require.context('./specs', true, /\.js/);
testsContext.keys().forEach(testsContext);
