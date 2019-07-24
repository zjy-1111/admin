import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Main from './views/Main'
import AdminList from './views/AdminList'
import AdminEdit from './views/AdminEdit'
import DoctorList from './views/DoctorList'
import DoctorEdit from './views/DoctorEdit'
import VideoList from './views/VideoList'
import VideoEdit from './views/VideoEdit'



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

        { path: '/doctor/list', component: DoctorList},
        { path: '/doctor/create', component: DoctorEdit},
        { path: '/doctor/edit/:id', component: DoctorEdit, props: true},

        { path: '/video/list', component: VideoList},
        { path: '/video/create', component: VideoEdit},
        { path: '/video/edit/:id', component: VideoEdit, props: true},
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
