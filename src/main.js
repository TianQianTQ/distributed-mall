import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import VueCookie from 'vue-cookie'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import { userInfo } from './api'
import { setStore, getStore } from '/utils/storage'

Vue.use(infiniteScroll)
Vue.use(VueCookie)
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // error: 'dist/error.png',
  loading: '/static/images/load.gif'
  // attempt: 1
})
Vue.config.productionTip = false

// 不需要登陆的页面 => 白名单
const whiteList = ['/home', '/goods', '/login', '/goodsDetails']
router.beforeEach(function (to, from, next) {
  userInfo().then(res => {
    // 已登录
    if(res.data.userId) {
      console.log('已登录');
      store.commit('RECORD_USERINFO', {info: res.data})
      setStore('userId',res.data.userId);
      if (to.path === '/login') {
        next({path: '/'})
      }
      next()
    }else{
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      }else{
        next('/login')
      }
    }
  })
})

/* eslint-disable no-new */
Vue.use(ElementUI);
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
