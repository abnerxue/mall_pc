/*
 * @Description: vue
 * @Version: 2.0.1.003
 * @Author: 薛松田
 * @Date: 2019-11-19 14:07:13
 * @LastEditors: 薛松田
 * @LastEditTime: 2019-11-25 11:36:43
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios';

//axios请求数据格式化成java服务器能识别的组件
import qs from 'qs'; 
Vue.prototype.$qs = qs;

import VueClipboard  from 'vue-clipboard2'
Vue.use(VueClipboard )

var Promise = require('es6-promise').Promise;
Promise.polyfill();
Vue.prototype.$ajax = axios;

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.config.productionTip = false

import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
