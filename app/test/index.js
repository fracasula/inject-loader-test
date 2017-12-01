import Vue from 'vue';

Vue.config.productionTip = false;

// require all test files (files that ends with .js)
const testsContext = require.context('./specs', true, /Spec\.js$/);
testsContext.keys().forEach(testsContext);
