# This is a new file, so I'll create it from scratch

<template>
  <div class="flex items-center ml-2">
    <button 
      @click="checkConnection" 
      class="relative flex items-center text-xs px-2 py-1 rounded-full border focus:outline-none transition-colors" 
      :class="statusClass"
      title="Check n8n connection status"
    >
      <div class="h-2 w-2 rounded-full mr-1.5" :class="indicatorClass"></div>
      <span>n8n</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { testConnection } from '../../services/n8nService';

// Connection status states
type ConnectionStatus = 'unknown' | 'checking' | 'connected' | 'disconnected';

const status = ref<ConnectionStatus>('unknown');
const latency = ref<number | null>(null);
const lastChecked = ref<Date | null>(null);

// Computed class for the button based on connection status
const statusClass = computed(() => {
  switch (status.value) {
    case 'connected':
      return 'border-green-300 bg-green-50 text-green-700 hover:bg-green-100 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400';
    case 'disconnected':
      return 'border-red-300 bg-red-50 text-red-700 hover:bg-red-100 dark:border-red-800 dark:bg-red-900/30 dark:text-red-400';
    case 'checking':
      return 'border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    default:
      return 'border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400';
  }
});

// Computed class for the indicator dot
const indicatorClass = computed(() => {
  switch (status.value) {
    case 'connected':
      return 'bg-green-500 dark:bg-green-400 animate-pulse';
    case 'disconnected':
      return 'bg-red-500 dark:bg-red-400';
    case 'checking':
      return 'bg-blue-500 dark:bg-blue-400 animate-ping';
    default:
      return 'bg-gray-500 dark:bg-gray-400';
  }
});

// Function to check connection status
const checkConnection = async () => {
  try {
    status.value = 'checking';
    const result = await testConnection();
    
    if (result.success) {
      status.value = 'connected';
      latency.value = result.pingTime || null;
    } else {
      status.value = 'disconnected';
      latency.value = null;
    }
    
    lastChecked.value = new Date();
  } catch (error) {
    console.error('Error checking connection:', error);
    status.value = 'disconnected';
    latency.value = null;
    lastChecked.value = new Date();
  }
};

// Check connection on component mount
onMounted(() => {
  checkConnection();
  
  // Periodically check connection status (every 5 minutes)
  const interval = setInterval(() => {
    checkConnection();
  }, 5 * 60 * 1000);
  
  // Clean up interval on component unmount
  return () => clearInterval(interval);
});
</script>

<style scoped>
.animate-ping {
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  75%, 100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

button {
  user-select: none;
}
</style> 