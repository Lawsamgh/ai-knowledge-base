import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './assets/css/tailwind.css'
import './style.css'
import { supabase } from './lib/supabase'

// Import routes
import routes from './router/index'

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Add navigation guard
router.beforeEach(async (to, from, next) => {
  // Set page title
  document.title = to.meta.title as string || 'AI Knowledge Base'

  // Check if route requires authentication
  if (to.meta.requiresAuth) {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      // Redirect to home page if not authenticated
      next({ name: 'Home' })
      return
    }
  }

  next()
})

// Create pinia instance
const pinia = createPinia()

// Create and mount the Vue application
const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
