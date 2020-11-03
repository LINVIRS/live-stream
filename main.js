import Vue from 'vue'
import App from './App'

//引入封装的请求库并且挂载在Vue原型上，使用时候：this.$H
//VUE.PROTOTYPE.$appName='My App',这样各个Vue 实例可以通过$appName的方式应用
//这样不会污染全局作用域
import $H from './common/request.js'
Vue.prototype.$H=$H
//引入vueX并挂载在Vue原型上
import store from 'store/index.js'
Vue.prototype.$store=store

Vue.config.productionTip = false

App.mpType = 'app'

// 权限验证
Vue.prototype.authJump = (options) => {
  if (!store.state.token) {
    uni.showToast({
      title: '请先登录',
      icon: 'none'
    });
    return uni.navigateTo({
      url: '/pages/login/login.vue'
    })
  }
  uni.navigateTo(options);
}
const app = new Vue({
	store,
    ...App
})
app.$mount()
