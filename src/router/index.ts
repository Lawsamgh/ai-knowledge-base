import type { RouteRecordRaw } from 'vue-router'

// Lazy-loaded components
const Home = () => import('../views/Home.vue')
const Chat = () => import('../views/Chat.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home - AI Knowledge Base',
      requiresAuth: false
    },
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    meta: {
      title: 'Chat - AI Knowledge Base',
      requiresAuth: true
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

export default routes 