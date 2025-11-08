import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  // State
  const isDark = ref(false);

  // Initialize theme from localStorage or system preference
  const initializeTheme = () => {
    // Check if user has a saved preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
      isDark.value = true;
    } else if (savedTheme === 'light') {
      isDark.value = false;
    } else {
      // Check system preference if no saved preference
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    // Apply theme to document
    applyTheme();
  };

  // Apply theme to document
  const applyTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Toggle theme
  const toggleTheme = () => {
    isDark.value = !isDark.value;
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
  };

  // Watch for changes in isDark and apply theme
  watch(isDark, () => {
    applyTheme();
  });

  // Initialize theme when store is created
  if (typeof window !== 'undefined') {
    initializeTheme();
    
    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      // Only apply if user hasn't set a preference
      if (!localStorage.getItem('theme')) {
        isDark.value = e.matches;
      }
    });
  }

  return {
    isDark,
    toggleTheme,
  };
}); 