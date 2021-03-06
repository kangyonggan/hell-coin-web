import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/layout/layout.vue'
import NotFound from '../views/404.vue'
import Index from '../views/index.vue'
import Login from '../views/login.vue'
import Register from '../views/register.vue'
import Assets from '../views/user/assets.vue'


const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: Index
      },
      {
        path: 'login',
        component: Login
      },
      {
        path: 'register',
        component: Register
      },
      {
        path: 'user/assets',
        component: Assets
      },
      {
        path: '/:catchAll(.*)',
        meta: {
          title: '404'
        },
        component: NotFound
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  mode: 'history',
  routes
})


router.beforeEach(async (to, from, next) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
