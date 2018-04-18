import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

// 引入页面组件
import Index from '@/pages/Index'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import axios from "axios"


Vue.use(Router)
Vue.use(iView)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: { requiresAuth: true },
      beforeEnter(to, from, next) {
        console.log(to);
        console.log(from);
        if (to.meta.requiresAuth) {
          console.log("开始检查是否登录！");
          axios
              .post("http://127.0.0.1:3000/v1/users/info", {
                token : sessionStorage.getItem('token')
              })
              .then(function(response) {
                  if (!response.data.sucess) {
                    next({path: '/login'})
                  } else {
                    next()
                  }
              })
              .catch(function(error) {
                console.log(error);
              });
      
        } else {
          next() // 确保一定要调用 next()
        }
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { requiresAuth: false }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false }
    }
  ]
})

