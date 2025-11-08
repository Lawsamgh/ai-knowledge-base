<template>
  <Transition name="toast">
    <div 
      v-if="visible" 
      class="fixed z-50 bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg text-white font-medium text-sm flex items-center space-x-2"
      :class="[
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        type === 'info' ? 'bg-blue-500' : 'bg-gray-700'
      ]"
    >
      <!-- Success icon -->
      <svg v-if="type === 'success'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 6L9 17l-5-5"></path>
      </svg>
      
      <!-- Error icon -->
      <svg v-if="type === 'error'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>
      
      <!-- Info icon -->
      <svg v-if="type === 'info'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
      
      <span>{{ message }}</span>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { watch, defineProps, defineEmits } from 'vue';

const props = defineProps<{
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  visible: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

// Auto-close the toast after duration
watch(() => props.visible, (newValue) => {
  if (newValue && props.duration) {
    setTimeout(() => {
      emit('close');
    }, props.duration);
  }
});
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translate(-50%, 20px);
}

.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px);
}
</style> 