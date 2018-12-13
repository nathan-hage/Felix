import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Login from '@/components/login'
import Settings from '@/views/settings'
import Tool from '@/views/Tool'
import Dashboard from '@/views/dashboard'

Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "*",
      redirect: "/dashboard"
    },
    // {
    //   path: '/login',
    //   name: 'Login',
    //   component: Login
    // },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      props: true
    },
    {
      path: "/tool/:prototypeName",
      name: "Tool",
      component: Tool
    },
    {
      path: "/settings",
      name: "Settings",
      component: Settings
    }
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = firebase.auth().currentUser

  if (requiresAuth && !currentUser) {
    next("/dashboard");
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})

export default router