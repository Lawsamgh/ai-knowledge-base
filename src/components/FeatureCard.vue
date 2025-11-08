<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5 sm:p-6 lg:p-8 transition-transform hover:scale-105 h-full flex flex-col feature-card">
    <div class="flex flex-col items-center mb-4">
      <div class="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center mb-4 sm:mb-5 lg:mb-6 shadow-md feature-icon">
        <svg v-if="icon === 'chat'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <svg v-else-if="icon === 'database'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
        <svg v-else-if="icon === 'computer'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <svg v-else-if="icon === 'briefcase'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <svg v-else-if="icon === 'heart'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <svg v-else-if="icon === 'globe'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <h3 class="text-lg sm:text-xl lg:text-2xl font-semibold text-center text-gray-900 dark:text-white mb-3 sm:mb-4 card-title">{{ title }}</h3>
    </div>
    <div class="card-description flex-grow px-1">
      <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  icon?: 'chat' | 'database' | 'computer' | 'lightning' | 'briefcase' | 'heart' | 'globe';
}>();
</script>

<style scoped>
@media (min-width: 1280px) {
  .transition-transform:hover {
    transform: scale(1.08);
  }
}

/* Card styling */
.feature-card {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(229, 231, 235, 0.5);
}

.dark .feature-card {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(75, 85, 99, 0.3);
}

.feature-card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.dark .feature-card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.card-title {
  position: relative;
  padding-bottom: 0.75rem;
  transition: color 0.3s ease;
}

.feature-card:hover .card-title {
  color: #2563eb;
}

.dark .feature-card:hover .card-title {
  color: #60a5fa;
}

.card-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 2px;
  background: linear-gradient(to right, #3b82f6, #1d4ed8);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.dark .card-title::after {
  background: linear-gradient(to right, #60a5fa, #3b82f6);
}

.feature-card:hover .card-title::after {
  width: 60px;
}

.card-description {
  overflow-y: auto;
  padding-right: 4px;
  line-height: 1.6;
  transition: color 0.3s ease;
}

.card-description::-webkit-scrollbar {
  width: 4px;
}

.card-description::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.dark .card-description::-webkit-scrollbar-track {
  background: #374151;
}

.card-description::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 10px;
}

.dark .card-description::-webkit-scrollbar-thumb {
  background: #4b5563;
}

.card-description::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

.dark .card-description::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

/* Enhance icon container with subtle pulse animation */
.feature-icon {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  transform: translateZ(0);
}

.feature-icon::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%);
  opacity: 0;
  transition: opacity 0.5s ease;
}

.feature-icon:hover::after {
  opacity: 0.5;
  animation: pulse-glow 2s infinite;
}

@keyframes pulse-glow {
  0%, 100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.7;
  }
}

/* Make stroke width slightly thinner for larger icons */
svg {
  stroke-width: 1.75;
  transition: transform 0.3s ease;
}

.feature-icon:hover svg {
  transform: scale(1.1);
}
</style> 