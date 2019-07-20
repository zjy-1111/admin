import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Main from './views/Main'
import AdminList from './views/AdminList'
import AdminEdit from './views/AdminEdit'



Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', name: 'login', component: Login, meta: { isPublic: true } },
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        { path: '/admin/list', component: AdminList},
        { path: '/admin/create', component: AdminEdit},
        { path: '/admin/edit/:id', component: AdminEdit, props: true},
      ]
    }
  ]
})

router.beforeEach((to, from ,next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})
export default router
