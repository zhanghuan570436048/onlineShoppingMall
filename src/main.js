import Vue from 'vue'
import App from './App.vue'
//引入路由模块
import VueRouter from 'vue-router'
//引入路由
import index from './components/index.vue';
import goodsInfo from './components/goodsinfo.vue';
//引入懒加载
import VueLazyload from 'vue-lazyload';

//导入css
import './assets/statics/site/css/style.css';

//顶部轮播图插件引入文件
import ElementUI from 'element-ui';
//导入css样式
import 'element-ui/lib/theme-chalk/index.css';

//导入axios模块目的是让说有的模块都可以用
import axios from "axios";
axios.defaults.baseURL = 'http://47.106.148.205:8899';
//挂载到Vue的原型上->vue实例化出来的对象
Vue.prototype.axios = axios;
//使用路由中间件
Vue.use(ElementUI);

Vue.use(VueRouter);

Vue.use(VueLazyload,{
  loading:require("./assets/img/01.gif")
});
//定义路由规则
const router = new VueRouter({
  routes:[
    {path: '/index',component:index},
    {path: '/',component:index},
    {path: '/goodsInfo/:id',component:goodsInfo}
]

})

//揽加载设置
// Vue.use(VueLazyload, {
//   preLoad: 1.3,
//   loading: './assets/img/01.gif',
// })
var moment = require('moment');

//将日期格式化抽取成全局过滤器
Vue.filter('cutTime', function (value) {
   
   return moment(value).format("YYYY-MM-DD");
    
});


Vue.config.productionTip = false

new Vue({
  //挂载路由规则
  render: h => h(App),
  router
}).$mount('#app')
