// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import vueResource from 'vue-resource'

import Table from './components/table.vue'
import Table2 from './components/table2.vue'

Vue.use(ElementUI, { size: 'small' });
Vue.use(vueResource);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
