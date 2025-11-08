<template>
  <div :class="{ 'dark': isDarkMode }" class="min-h-screen bg-gray-50 dark:bg-gray-900 w-full flex flex-col">
    <router-view />
    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useThemeStore } from './stores/theme';
import { useRoute } from 'vue-router';
import ToastContainer from './components/ui/ToastContainer.vue';

const themeStore = useThemeStore();
const route = useRoute();

// Computed property for dark mode state
const isDarkMode = computed(() => themeStore.isDark);

// Update document title based on route
watch(() => route.meta.title, (title) => {
  if (title) {
    document.title = title as string;
  } else {
    document.title = 'AI Knowledge Base';
  }
}, { immediate: true });

// Initialize theme and set viewport handling on mount
onMounted(() => {
  // Set viewport height and width for all devices
  const setViewportDimensions = () => {
    const vh = window.innerHeight * 0.01;
    const vw = window.innerWidth * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.documentElement.style.setProperty('--vw', `${vw}px`);
    
    // Handle orientation changes on mobile
    document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
  };
  
  setViewportDimensions();
  window.addEventListener('resize', setViewportDimensions);
  window.addEventListener('orientationchange', setViewportDimensions);
  
  return () => {
    window.removeEventListener('resize', setViewportDimensions);
    window.removeEventListener('orientationchange', setViewportDimensions);
  };
});
</script>

<style>
html, body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  flex: 1;
}

/* Use dynamic viewport height for all devices */
.min-h-screen {
  min-height: 100vh; /* Fallback */
  min-height: calc(var(--vh, 1vh) * 100);
  height: var(--app-height, 100%);
}

/* Full-width container for all devices */
.w-full {
  width: 100vw;
  width: calc(var(--vw, 1vw) * 100);
}

/* Full-height container for desktop */
@media (min-width: 1024px) {
  .full-height-container {
    height: calc(100vh - 64px);
    height: calc(var(--app-height, 100vh) - 64px);
    max-height: unset;
  }
}

/* Ensure content doesn't overflow on small screens */
img, video, svg {
  max-width: 100%;
  height: auto;
}
</style>
