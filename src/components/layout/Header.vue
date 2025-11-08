<template>
  <header class="bg-white dark:bg-gray-900 shadow-sm w-full">
    <div class="w-full mx-auto px-3 sm:px-4 lg:px-6">
      <div class="flex justify-between h-14 sm:h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/" class="text-blue-600 dark:text-blue-400 font-light text-lg sm:text-xl lg:text-2xl truncate max-w-[250px] sm:max-w-none modern-font">
              Promasidor GH Assistant
            </router-link>
          </div>
          <nav class="hidden sm:ml-6 lg:ml-10 sm:flex sm:space-x-8">
            <router-link
              to="/"
              class="border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm md:text-base font-medium transition-colors duration-200"
              :class="{ 'border-blue-600 dark:border-blue-400 text-blue-700 dark:text-blue-300 font-semibold active-link': isCurrentRoute('/')}">
              Home
            </router-link>
            <router-link
              v-if="isAuthenticated"
              to="/chat"
              class="border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm md:text-base font-medium transition-colors duration-200"
              :class="{ 'border-blue-600 dark:border-blue-400 text-blue-700 dark:text-blue-300 font-semibold active-link': isCurrentRoute('/chat')}">
              Chat
            </router-link>
          </nav>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
          <button
            v-if="isAuthenticated"
            type="button"
            @click.stop.prevent="showSignOutConfirm = true"
            class="sign-out-btn p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 bg-white dark:bg-transparent shadow-sm transition-colors duration-200"
            title="Sign Out">
            <span class="sr-only">Sign Out</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
          <button
            type="button"
            @click="toggleTheme"
            class="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-white dark:bg-transparent shadow-sm">
            <span class="sr-only">Toggle dark mode</span>
            <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
        </div>
        
        <!-- Mobile menu button -->
        <div class="flex items-center sm:hidden">
          <button
            v-if="isAuthenticated"
            type="button"
            @click.stop.prevent="showSignOutConfirm = true"
            class="sign-out-btn p-1 mr-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 bg-white dark:bg-transparent shadow-sm transition-colors duration-200"
            title="Sign Out">
            <span class="sr-only">Sign Out</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
          <button
            type="button"
            @click="toggleTheme"
            class="p-1 mr-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white bg-white dark:bg-transparent shadow-sm">
            <span class="sr-only">Toggle dark mode</span>
            <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
          
          <button
            type="button"
            @click="isOpen = !isOpen"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <!-- Icon when menu is closed -->
            <svg
              v-if="!isOpen"
              class="block h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!-- Icon when menu is open -->
            <svg
              v-else
              class="block h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state -->
    <div v-show="isOpen" class="sm:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <router-link
          to="/"
          class="text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent transition-colors duration-200"
          :class="{ 'bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-600 dark:border-blue-400 text-blue-700 dark:text-blue-300 font-semibold': isCurrentRoute('/')}"
          @click="isOpen = false">
          Home
        </router-link>
        <router-link
          v-if="isAuthenticated"
          to="/chat"
          class="text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent transition-colors duration-200"
          :class="{ 'bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-600 dark:border-blue-400 text-blue-700 dark:text-blue-300 font-semibold': isCurrentRoute('/chat')}"
          @click="isOpen = false">
          Chat
        </router-link>
      </div>
    </div>

    <!-- Sign Out Confirmation Dialog -->
    <ConfirmDialog
      :is-open="showSignOutConfirm"
      title="Sign Out"
      message="Are you sure you want to sign out? You will need to sign in again to access the chat."
      confirm-text="Sign Out"
      cancel-text="Cancel"
      @confirm="handleSignOut"
      @cancel="showSignOutConfirm = false"
    />
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useThemeStore } from '../../stores/theme';
import { supabase } from '../../lib/supabase';
import ConfirmDialog from '../ui/ConfirmDialog.vue';

const route = useRoute();
const themeStore = useThemeStore();
const isOpen = ref(false);
const isAuthenticated = ref(false);
const showSignOutConfirm = ref(false);

const isDarkMode = computed(() => themeStore.isDark);

// Check authentication state
const checkAuth = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  isAuthenticated.value = !!session;
  console.log('Auth state checked:', isAuthenticated.value);
};

// Listen for auth state changes
supabase.auth.onAuthStateChange((_event, session) => {
  isAuthenticated.value = !!session;
  console.log('Auth state changed:', isAuthenticated.value);
});

// Handle sign out
const handleSignOut = async () => {
  console.log('Sign out initiated');
  
  try {
    // Clear local state first
    isAuthenticated.value = false;
    console.log('Local state cleared');

    // Clear Supabase session
    await supabase.auth.signOut({ scope: 'global' });
    console.log('Supabase session cleared');

    // Clear all auth-related storage
    localStorage.clear();
    sessionStorage.clear();
    console.log('Storage cleared');

    // Force reload
    window.location.replace('/');
  } catch (error) {
    console.error('Error during sign out:', error);
    // Force reload even if there's an error
    window.location.replace('/');
  }
};

const toggleTheme = () => {
  themeStore.toggleTheme();
};

const isCurrentRoute = (path: string) => {
  return route.path === path;
};

onMounted(() => {
  checkAuth();
  setTimeout(() => {
    const headerElement = document.querySelector('header');
    if (headerElement) {
      const headerHeight = headerElement.offsetHeight;
      document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
    }
  }, 50);
});

// Update header height on mobile menu toggle
watch(isOpen, () => {
  setTimeout(() => {
    const headerElement = document.querySelector('header');
    if (headerElement) {
      const headerHeight = headerElement.offsetHeight;
      document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
    }
  }, 50);
});
</script>

<style scoped>
/* Ensure header stays at top of viewport on all devices */
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  width: 100vw;
}

/* Custom styles for active menu items */
.border-b-3 {
  border-bottom-width: 3px;
}

/* Enhanced visibility for active menu items in light mode - hidden on mobile */
.border-blue-600 {
  border-bottom-width: 0 !important;
  border-color: transparent !important;
  box-shadow: none;
}

@media (min-width: 640px) {
  .border-blue-600 {
    border-bottom-width: 2px !important;
    border-color: #3b82f6 !important;
    box-shadow: 0 2px 4px -4px rgba(37, 99, 235, 0.3);
  }
}

/* Additional styling for active links - hidden on mobile */
.active-link {
  position: relative;
}

.active-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 0;
  background-color: transparent;
  z-index: 1;
  opacity: 0;
}

@media (min-width: 640px) {
  .active-link::after {
    height: 2px;
    background-color: #3b82f6;
    opacity: 0.8;
  }
  
  .dark .active-link::after {
    background-color: #60a5fa;
    opacity: 0.7;
  }
}

/* Add slight glow effect to active nav items in dark mode - hidden on mobile */
.dark .border-blue-400 {
  box-shadow: none;
  border-bottom-width: 0 !important;
}

@media (min-width: 640px) {
  .dark .border-blue-400 {
    box-shadow: 0 1px 2px rgba(59, 130, 246, 0.3);
    border-bottom-width: 2px !important;
  }
}

/* Dark mode toggle styles */
button[class*="rounded-full"] {
  transition: all 0.2s ease;
  border: 1px solid #e5e7eb;
}

button[class*="rounded-full"]:hover {
  transform: scale(1.05);
}

.dark button[class*="rounded-full"] {
  border-color: transparent;
}

/* Modern UI font styling */
.modern-font {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  letter-spacing: 0.01em;
  color: #3b82f6;
  position: relative;
  transition: all 0.3s ease;
  padding-bottom: 2px;
}

.modern-font:hover {
  color: #2563eb;
  transform: translateY(-1px);
}

.modern-font::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, #3b82f6, rgba(59, 130, 246, 0));
  border-radius: 2px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.modern-font:hover::after {
  transform: scaleX(1);
}

.dark .modern-font {
  color: #60a5fa;
}

.dark .modern-font:hover {
  color: #93c5fd;
}

.dark .modern-font::after {
  background: linear-gradient(90deg, #60a5fa, rgba(96, 165, 250, 0));
}

@media (max-width: 640px) {
  .modern-font {
    font-size: 1.25rem;
  }
}

/* Sign out button styles */
.sign-out-btn {
  position: relative;
  z-index: 10;
  cursor: pointer;
  pointer-events: auto;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.sign-out-btn:hover {
  transform: scale(1.05);
}

.sign-out-btn:active {
  transform: scale(0.95);
}
</style> 