<template>
  <div class="min-h-screen flex flex-col w-full">
    <Header />
    
    <main class="flex-grow overflow-hidden relative h-[calc(100vh-var(--header-height)-var(--footer-height))] mt-[var(--header-height)]">
      <div class="w-full h-full flex flex-col bg-white dark:bg-gray-900">
        <!-- Chat messages -->
        <div ref="messageContainer" class="flex-grow overflow-y-auto chat-messages" id="chat-messages">
          <template v-if="messages.length === 0">
            <div class="flex justify-center items-center h-full">
              <div class="text-center px-4 sm:px-6 md:px-10 py-10 max-w-2xl md:max-w-3xl mx-auto welcome-container">
                <div class="ai-face-container mx-auto mb-6 relative">
                  <!-- Robot/AI face made with dots and lines - advanced version -->
                  <svg width="180" height="180" viewBox="0 0 180 180" class="mx-auto">
                    <!-- Background elements -->
                    <circle cx="90" cy="90" r="80" fill="none" stroke="currentColor" stroke-width="1" class="text-blue-300 dark:text-blue-800 opacity-20" />
                    <circle cx="90" cy="90" r="70" fill="none" stroke="currentColor" stroke-width="1" class="text-blue-400 dark:text-blue-700 opacity-30" />
                    
                    <!-- Circular grid pattern -->
                    <circle cx="90" cy="90" r="60" fill="none" stroke="currentColor" stroke-width="1.5" class="text-blue-500 dark:text-blue-600 opacity-40" />
                    <circle cx="90" cy="90" r="50" fill="none" stroke="currentColor" stroke-width="1" class="text-blue-500 dark:text-blue-500 opacity-50 rotating-circle" />
                    <circle cx="90" cy="90" r="40" fill="none" stroke="currentColor" stroke-width="1" class="text-blue-500 dark:text-blue-500 opacity-50 rotating-circle-reverse" />
                    
                    <!-- Face shape -->
                    <path d="M50,65 L50,115 Q90,145 130,115 L130,65 Q90,35 50,65 Z" fill="none" stroke="currentColor" stroke-width="2" class="text-blue-600 dark:text-blue-400" />
                    
                    <!-- Hexagonal grid background -->
                    <path d="M60,60 L120,60 L120,120 L60,120 Z" fill="none" stroke="currentColor" stroke-width="0.8" class="text-blue-400 dark:text-blue-600 opacity-40" />
                    <path d="M75,60 L75,120" stroke="currentColor" stroke-width="0.5" class="text-blue-400 dark:text-blue-600 opacity-30" />
                    <path d="M90,60 L90,120" stroke="currentColor" stroke-width="0.5" class="text-blue-400 dark:text-blue-600 opacity-30" />
                    <path d="M105,60 L105,120" stroke="currentColor" stroke-width="0.5" class="text-blue-400 dark:text-blue-600 opacity-30" />
                    <path d="M60,75 L120,75" stroke="currentColor" stroke-width="0.5" class="text-blue-400 dark:text-blue-600 opacity-30" />
                    <path d="M60,90 L120,90" stroke="currentColor" stroke-width="0.5" class="text-blue-400 dark:text-blue-600 opacity-30" />
                    <path d="M60,105 L120,105" stroke="currentColor" stroke-width="0.5" class="text-blue-400 dark:text-blue-600 opacity-30" />
                    
                    <!-- Technical details -->
                    <path d="M40,90 L50,90" stroke="currentColor" stroke-width="1" class="text-blue-500 dark:text-blue-400 opacity-70 blinking-line" />
                    <path d="M130,90 L140,90" stroke="currentColor" stroke-width="1" class="text-blue-500 dark:text-blue-400 opacity-70 blinking-line" />
                    
                    <path d="M65,50 L75,60" stroke="currentColor" stroke-width="1" class="text-blue-500 dark:text-blue-400 opacity-70" />
                    <path d="M115,50 L105,60" stroke="currentColor" stroke-width="1" class="text-blue-500 dark:text-blue-400 opacity-70" />
                    
                    <!-- CPU-like elements -->
                    <rect x="80" y="35" width="20" height="20" rx="2" fill="none" stroke="currentColor" stroke-width="1" class="text-blue-500 dark:text-blue-400 opacity-80" />
                    <line x1="90" y1="35" x2="90" y2="30" stroke="currentColor" stroke-width="1" class="text-blue-500 dark:text-blue-400" />
                    <line x1="85" y1="35" x2="85" y2="32" stroke="currentColor" stroke-width="1" class="text-blue-500 dark:text-blue-400" />
                    <line x1="95" y1="35" x2="95" y2="32" stroke="currentColor" stroke-width="1" class="text-blue-500 dark:text-blue-400" />
                    
                    <!-- Eyes -->
                    <circle cx="75" cy="80" r="7" fill="currentColor" class="text-blue-600 dark:text-blue-400 pulse-animation" />
                    <circle cx="105" cy="80" r="7" fill="currentColor" class="text-blue-600 dark:text-blue-400 pulse-animation" />
                    
                    <!-- Eye details -->
                    <circle cx="75" cy="80" r="3" fill="currentColor" class="text-blue-200 dark:text-blue-200" />
                    <circle cx="105" cy="80" r="3" fill="currentColor" class="text-blue-200 dark:text-blue-200" />
                    
                    <!-- Scanning line across eyes -->
                    <line x1="65" y1="80" x2="115" y2="80" stroke="currentColor" stroke-width="0.5" class="text-blue-300 dark:text-blue-300 scanning-line" />
                    
                    <!-- Digital circuit lines around eyes -->
                    <path d="M65,75 L60,75 L60,70" stroke="currentColor" stroke-width="1" class="text-blue-500 dark:text-blue-400 opacity-80" />
                    <path d="M65,85 L60,85 L60,90" stroke="currentColor" stroke-width="1" class="text-blue-500 dark:text-blue-400 opacity-80" />
                    <path d="M115,75 L120,75 L120,70" stroke="currentColor" stroke-width="1" class="text-blue-500 dark:text-blue-400 opacity-80" />
                    <path d="M115,85 L120,85 L120,90" stroke="currentColor" stroke-width="1" class="text-blue-500 dark:text-blue-400 opacity-80" />
                    
                    <!-- Mouth -->
                    <path d="M75,110 Q90,120 105,110" fill="none" stroke="currentColor" stroke-width="2" class="text-blue-600 dark:text-blue-400" />
                    <path d="M75,110 Q90,115 105,110" fill="none" stroke="currentColor" stroke-width="0.5" class="text-blue-400 dark:text-blue-300 opacity-70" />
                    
                    <!-- Audio wave pattern near mouth -->
                    <path d="M65,100 L65,120" stroke="currentColor" stroke-width="0.5" class="text-blue-500 dark:text-blue-400 opacity-70 audio-wave" />
                    <path d="M68,103 L68,117" stroke="currentColor" stroke-width="0.5" class="text-blue-500 dark:text-blue-400 opacity-70 audio-wave" style="animation-delay: 0.1s" />
                    <path d="M71,106 L71,114" stroke="currentColor" stroke-width="0.5" class="text-blue-500 dark:text-blue-400 opacity-70 audio-wave" style="animation-delay: 0.2s" />
                    
                    <path d="M115,100 L115,120" stroke="currentColor" stroke-width="0.5" class="text-blue-500 dark:text-blue-400 opacity-70 audio-wave" />
                    <path d="M112,103 L112,117" stroke="currentColor" stroke-width="0.5" class="text-blue-500 dark:text-blue-400 opacity-70 audio-wave" style="animation-delay: 0.1s" />
                    <path d="M109,106 L109,114" stroke="currentColor" stroke-width="0.5" class="text-blue-500 dark:text-blue-400 opacity-70 audio-wave" style="animation-delay: 0.2s" />
                    
                    <!-- Data points -->
                    <circle cx="50" cy="65" r="2" fill="currentColor" class="text-blue-500 dark:text-blue-400 data-point" />
                    <circle cx="130" cy="65" r="2" fill="currentColor" class="text-blue-500 dark:text-blue-400 data-point" />
                    <circle cx="50" cy="115" r="2" fill="currentColor" class="text-blue-500 dark:text-blue-400 data-point" />
                    <circle cx="130" cy="115" r="2" fill="currentColor" class="text-blue-500 dark:text-blue-400 data-point" />
                    
                    <circle cx="60" cy="60" r="1.5" fill="currentColor" class="text-blue-400 dark:text-blue-400 data-point-small" />
                    <circle cx="120" cy="60" r="1.5" fill="currentColor" class="text-blue-400 dark:text-blue-400 data-point-small" />
                    <circle cx="60" cy="120" r="1.5" fill="currentColor" class="text-blue-400 dark:text-blue-400 data-point-small" />
                    <circle cx="120" cy="120" r="1.5" fill="currentColor" class="text-blue-400 dark:text-blue-400 data-point-small" />
                    
                    <!-- Binary digits -->
                    <text x="40" y="60" font-family="monospace" font-size="5" class="text-blue-500 dark:text-blue-400">1</text>
                    <text x="40" y="67" font-family="monospace" font-size="5" class="text-blue-500 dark:text-blue-400">0</text>
                    <text x="40" y="74" font-family="monospace" font-size="5" class="text-blue-500 dark:text-blue-400">1</text>
                    
                    <text x="135" y="60" font-family="monospace" font-size="5" class="text-blue-500 dark:text-blue-400">0</text>
                    <text x="135" y="67" font-family="monospace" font-size="5" class="text-blue-500 dark:text-blue-400">1</text>
                    <text x="135" y="74" font-family="monospace" font-size="5" class="text-blue-500 dark:text-blue-400">0</text>
                    
                    <!-- Animated pulse circles -->
                    <circle cx="90" cy="90" r="85" fill="none" stroke="currentColor" stroke-width="0.5" class="text-blue-400 dark:text-blue-600 opacity-20 pulse-circle" />
                    <circle cx="90" cy="90" r="92" fill="none" stroke="currentColor" stroke-width="0.5" class="text-blue-400 dark:text-blue-600 opacity-15 pulse-circle-delayed" />
                  </svg>
                  
                  <!-- Animated dots and particles -->
                  <div class="absolute top-0 left-0 w-full h-full overflow-hidden">
                    <!-- Static connection lines that appear in background -->
                    <div class="connection-line" style="top: 30%; left: 15%; width: 40px; transform: rotate(45deg);"></div>
                    <div class="connection-line" style="top: 60%; left: 20%; width: 30px; transform: rotate(-20deg);"></div>
                    <div class="connection-line" style="top: 25%; right: 20%; width: 35px; transform: rotate(-45deg);"></div>
                    <div class="connection-line" style="top: 65%; right: 18%; width: 25px; transform: rotate(30deg);"></div>
                    
                    <!-- Floating dots with different sizes and speeds -->
                    <div class="floating-dot" style="top: 20%; left: 25%; animation-duration: 4.5s;"></div>
                    <div class="floating-dot" style="top: 15%; left: 60%; animation-duration: 3.2s;"></div>
                    <div class="floating-dot" style="top: 70%; left: 20%; animation-duration: 5s;"></div>
                    <div class="floating-dot" style="top: 75%; left: 70%; animation-duration: 4s;"></div>
                    <div class="floating-dot" style="top: 40%; left: 85%; animation-duration: 4.7s;"></div>
                    <div class="floating-dot" style="top: 60%; left: 40%; animation-duration: 3.6s;"></div>
                    <div class="floating-dot small" style="top: 35%; left: 30%; animation-duration: 3s;"></div>
                    <div class="floating-dot small" style="top: 25%; left: 75%; animation-duration: 3.8s;"></div>
                    <div class="floating-dot small" style="top: 80%; left: 35%; animation-duration: 4.2s;"></div>
                    <div class="floating-dot small" style="top: 50%; left: 80%; animation-duration: 3.4s;"></div>
                    
                    <!-- Digital data streams -->
                    <div class="data-stream" style="top: 15%; left: 20%;"></div>
                    <div class="data-stream" style="top: 75%; left: 22%; animation-delay: 0.5s;"></div>
                    <div class="data-stream" style="top: 20%; right: 20%; animation-delay: 1s;"></div>
                    <div class="data-stream" style="top: 70%; right: 22%; animation-delay: 1.5s;"></div>
                  </div>
                </div>
                <h3 class="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">Welcome to Promasidor Knowledge Assistant</h3>
                <p class="text-lg mb-6 text-gray-600 dark:text-gray-300 mx-auto max-w-lg">Ask anything about Promasidor, our products, or policies etc..</p>
              </div>
            </div>
          </template>
          
          <div v-else>
            <ChatMessage 
              v-for="(message, index) in messages" 
              :key="index" 
              :message="message" 
              :is-last="index === messages.length - 1"
            />
          </div>
        </div>
          
        <!-- Typing indicator -->
        <div v-if="isLoading" class="px-4 py-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div class="max-w-3xl lg:max-w-4xl mx-auto flex items-center">
            <div aria-label="Bot is thinking" class="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mr-3 loader-bot-avatar" style="background: linear-gradient(135deg, #2563eb 60%, #3b82f6 100%); box-shadow: 0 2px 16px 0 rgba(37,99,235,0.25), 0 0 0 4px rgba(59,130,246,0.10); animation: loader-bot-pulse 1.5s infinite alternate;">
              <!-- Robot avatar SVG (copied from chat bot avatar) -->
              <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill="url(#bot-avatar-gradient)"/>
                <g>
                  <rect x="11" y="13" width="18" height="14" rx="5" fill="#fff" fill-opacity="0.95"/>
                  <rect x="11" y="13" width="18" height="14" rx="5" stroke="#2563eb" stroke-width="1.5"/>
                  <rect x="18.25" y="9.5" width="3.5" height="4" rx="1.75" fill="#fff" stroke="#2563eb" stroke-width="1.5"/>
                  <circle cx="15.5" cy="20" r="1.5" fill="#2563eb"/>
                  <circle cx="24.5" cy="20" r="1.5" fill="#2563eb"/>
                  <rect x="16.5" y="23" width="7" height="1.2" rx="0.6" fill="#2563eb" fill-opacity="0.7"/>
                  <rect x="16.5" y="25" width="7" height="1.2" rx="0.6" fill="#2563eb" fill-opacity="0.5"/>
                  <rect x="16.5" y="27" width="7" height="1.2" rx="0.6" fill="#2563eb" fill-opacity="0.3"/>
                  <rect x="9.5" y="17.5" width="2" height="3" rx="1" fill="#fff" stroke="#2563eb" stroke-width="1"/>
                  <rect x="28.5" y="17.5" width="2" height="3" rx="1" fill="#fff" stroke="#2563eb" stroke-width="1"/>
                </g>
                <defs>
                  <linearGradient id="bot-avatar-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2563eb"/>
                    <stop offset="1" stop-color="#3b82f6"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div class="flex flex-col">
              <div class="flex space-x-1.5">
                <div class="h-2.5 w-2.5 bg-blue-400 dark:bg-blue-500 rounded-full animate-bounce"></div>
                <div class="h-2.5 w-2.5 bg-blue-400 dark:bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                <div class="h-2.5 w-2.5 bg-blue-400 dark:bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
              </div>
              <div v-if="isLongWait" class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                This is taking longer than expected. The n8n server might be processing a complex request...
              </div>
            </div>
          </div>
        </div>
          
        <!-- Input area -->
        <div class="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <form @submit.prevent="sendMessage" class="max-w-3xl lg:max-w-4xl mx-auto px-4 py-3">
            <div class="flex gap-2 items-end">
              <div class="flex-grow relative rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
                <textarea
                  v-model="newMessage"
                  @keydown.enter.prevent="sendMessage"
                  placeholder="Type a message..."
                  class="block w-full h-[56px] resize-none bg-white dark:bg-gray-800 border-0 pl-3 pr-24 py-3 text-gray-900 dark:text-white focus:ring-0 focus:outline-none text-sm sm:text-base placeholder-gray-500 dark:placeholder-gray-400"
                  rows="1"
                  ref="messageInput"
                  :style="isDarkMode ? 'color: white;' : ''"
                ></textarea>
                <div class="absolute right-3 bottom-[10px] flex space-x-2">
                  <button 
                    type="button" 
                    @click="themeStore.toggleTheme()" 
                    class="hidden sm:block p-1.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors hover:bg-gray-200 dark:hover:bg-gray-600"
                    title="Toggle theme"
                  >
                    <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                    </svg>
                  </button>
                  <button 
                    type="button" 
                    @click="toggleSpeechRecognition" 
                    class="hidden sm:block p-1.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors hover:bg-gray-200 dark:hover:bg-gray-600"
                    :class="{'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30': isListening}"
                    title="Voice input"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                    </svg>
                  </button>
                  <button
                    type="submit"
                    class="p-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-colors"
                    :disabled="!newMessage.trim() || isLoading"
                    title="Send message"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                      <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Connection troubleshooter button - only shown on mobile -->
            <div v-if="isMobile" class="mt-2 text-center">
              <button 
                type="button" 
                @click="showConnectionInfo"
                class="text-xs text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
              >
                Having connection issues?
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
    
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch, onBeforeMount } from 'vue';
import { useThemeStore } from '../stores/theme';
import Header from '../components/layout/Header.vue';
import Footer from '../components/layout/Footer.vue';
import ChatMessage from '../components/chat/ChatMessage.vue';
import { sendMessageToN8n, n8nConfig, testConnection } from '../services/n8nService';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

// Add type declarations for the Web Speech API
declare global {
  interface Window {
    webkitSpeechRecognition: new () => any;
    SpeechRecognition: new () => any;
  }
}

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const themeStore = useThemeStore();
const isDarkMode = computed(() => themeStore.isDark);

const messages = ref<Message[]>([]);
const newMessage = ref('');
const isLoading = ref(false);
const isLongWait = ref(false);
const messageContainer = ref<HTMLElement | null>(null);
const messageInput = ref<HTMLTextAreaElement | null>(null);
const isListening = ref(false);
let recognition: any = null;
let longWaitTimer: number | null = null;
const user = ref<User | null>(null);

// Define a constant for the default textarea height to maintain consistency
const DEFAULT_TEXTAREA_HEIGHT = '56px';

// Function to reset textarea height to default
const resetTextareaHeight = () => {
  if (messageInput.value) {
    // Hard reset the height
    messageInput.value.style.height = DEFAULT_TEXTAREA_HEIGHT;
    
    // Force a reflow to ensure the height is applied
    messageInput.value.getBoundingClientRect();
  }
};

const sendMessage = async () => {
  const content = newMessage.value.trim();
  if (!content || isLoading.value) return;
  
  // Add user message
  const userMessage: Message = {
    id: Date.now(),
    content,
    sender: 'user',
    timestamp: new Date()
  };
  
  messages.value.push(userMessage);
  newMessage.value = '';
  
  // Force a reset of textarea height
  await nextTick();
  resetTextareaHeight();
  
  // Scroll to bottom
  scrollToBottom();
  
  // Set loading state
  isLoading.value = true;
  isLongWait.value = false;
  
  // Set timer for long-waiting responses
  if (longWaitTimer) clearTimeout(longWaitTimer);
  longWaitTimer = window.setTimeout(() => {
    isLongWait.value = true;
  }, 30000); // Show "taking a while" message after 10 seconds
  
  try {
    // Call n8n webhook using the service
    const result = await sendMessageToN8n(content);
    
    // Clear the long wait timer
    if (longWaitTimer) {
      clearTimeout(longWaitTimer);
      longWaitTimer = null;
    }
    
    // Debug the response
    console.log('N8n response:', result);
    
    if (result.success) {
      // Extract the response content from the n8n result
      let responseContent = '';
      
      // Check for response in different possible locations
      if (result.response) {
        responseContent = result.response;
      } else if (result.message) {
        responseContent = result.message;
      } else if (result.data && result.data.response) {
        responseContent = result.data.response;
      } else if (result.data && result.data.message) {
        responseContent = result.data.message;
      } else if (result.data && typeof result.data === 'string') {
        responseContent = result.data;
      } else if (result.data) {
        // If data exists but none of the above formats match, stringify it
        responseContent = JSON.stringify(result.data);
      } else {
        responseContent = "I'm sorry, I couldn't process your request.";
      }
      
      // Add assistant response
      const assistantMessage: Message = {
        id: Date.now(),
        content: responseContent,
        sender: 'assistant',
        timestamp: new Date()
      };
      
      messages.value.push(assistantMessage);
      // Store in Supabase messages table
      if (user.value?.id) {
        await supabase.from('messages').insert([
          {
            chat_room_id: user.value.id,
            send: content,
            respond: responseContent
          }
        ]);
      }
    } else {
      // Handle error case with more detailed message
      let errorContent = result.error || "I'm sorry, I couldn't connect to the knowledge base right now. Please try again later.";
      
      // Add troubleshooting tips for network errors
      if (errorContent.includes('Network Error')) {
        errorContent += `

### Troubleshooting Tips:
1. Make sure your n8n server is running
2. Ensure your phone is connected to the same WiFi network as your computer
3. Update the IP address in the n8nService.ts file to match your computer's IP address
4. Make sure no firewall is blocking the connection
5. Try accessing the n8n server directly in your phone's browser: \`${n8nConfig.baseUrl}\``;
      }
      
      messages.value.push({
        id: Date.now(),
        content: errorContent,
        sender: 'assistant',
        timestamp: new Date()
      });
    }
    
    // Scroll to bottom after adding the new message
    await nextTick();
    scrollToBottom();
  } catch (error) {
    // Clear the long wait timer
    if (longWaitTimer) {
      clearTimeout(longWaitTimer);
      longWaitTimer = null;
    }
    
    console.error('Error in chat message handling:', error);
    
    // Add error message
    messages.value.push({
      id: Date.now(),
      content: "I'm sorry, I couldn't connect to the knowledge base right now. Please try again later.",
      sender: 'assistant',
      timestamp: new Date()
    });
    
    await nextTick();
    scrollToBottom();
  } finally {
    isLoading.value = false;
    isLongWait.value = false;
  }
};

const scrollToBottom = () => {
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
  }
};

// Auto-resize textarea as user types
watch(newMessage, () => {
  if (messageInput.value) {
    if (newMessage.value === '') {
      // If empty, set to default height
      resetTextareaHeight();
    } else {
      // Otherwise adjust to content - first reset to auto to get proper scrollHeight
      messageInput.value.style.height = DEFAULT_TEXTAREA_HEIGHT;
      messageInput.value.style.height = `${Math.max(parseInt(DEFAULT_TEXTAREA_HEIGHT), messageInput.value.scrollHeight)}px`;
    }
  }
});

// Update speech recognition for mobile compatibility
const initSpeechRecognition = () => {
  try {
    if ('webkitSpeechRecognition' in window) {
      recognition = new window.webkitSpeechRecognition();
    } else if ('SpeechRecognition' in window) {
      recognition = new (window as any).SpeechRecognition();
    } else {
      console.warn('Speech recognition not supported by this browser');
      return;
    }
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US'; // Set language explicitly for better mobile support
    
    recognition.onstart = () => {
      isListening.value = true;
    };
    
    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('');
      
      newMessage.value = transcript;
      
      // Adjust textarea height
      if (messageInput.value) {
        messageInput.value.style.height = DEFAULT_TEXTAREA_HEIGHT;
        messageInput.value.style.height = `${Math.max(parseInt(DEFAULT_TEXTAREA_HEIGHT), messageInput.value.scrollHeight)}px`;
      }
    };
    
    recognition.onend = () => {
      isListening.value = false;
    };
    
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      isListening.value = false;
    };
  } catch (error) {
    console.error('Error initializing speech recognition:', error);
  }
};

const toggleSpeechRecognition = () => {
  try {
    if (!recognition) {
      initSpeechRecognition();
    }
    
    if (recognition) {
      if (isListening.value) {
        recognition.stop();
      } else {
        recognition.start();
      }
    }
  } catch (error) {
    console.error('Error toggling speech recognition:', error);
    isListening.value = false;
  }
};

// Calculate and set header and footer heights for proper sizing
onBeforeMount(() => {
  // Default values
  document.documentElement.style.setProperty('--header-height', '56px');
  document.documentElement.style.setProperty('--footer-height', '64px');
});

// Detect if on mobile
const isMobile = ref(false);

onMounted(async () => {
  const { data } = await supabase.auth.getUser();
  user.value = data.user;

  // Load previous messages if user is logged in
  if (user.value?.id) {
    const { data: dbMessages } = await supabase
      .from('messages')
      .select('*')
      .eq('chat_room_id', user.value.id)
      .order('created_at', { ascending: true });
    if (dbMessages && dbMessages.length > 0) {
      messages.value = dbMessages.map((msg: any) => ({
        id: Date.parse(msg.created_at) || Date.now(),
        content: msg.send,
        sender: 'user',
        timestamp: new Date(msg.created_at)
      })).flatMap((userMsg: any, idx: number) => [
        userMsg,
        dbMessages[idx].respond ? {
          id: Date.parse(dbMessages[idx].created_at) + 1 || Date.now() + 1,
          content: dbMessages[idx].respond,
          sender: 'assistant',
          timestamp: new Date(dbMessages[idx].created_at)
        } : null
      ]).filter(Boolean);
    }
  }

  if (messageInput.value) {
    messageInput.value.focus();
  }
  
  // Initialize speech recognition
  initSpeechRecognition();
  
  // Measure actual header and footer heights
  setTimeout(() => {
    const headerElement = document.querySelector('header');
    const footerElement = document.querySelector('footer');
    
    if (headerElement) {
      const headerHeight = `${headerElement.offsetHeight}px`;
      document.documentElement.style.setProperty('--header-height', headerHeight);
    }
    
    if (footerElement) {
      const footerHeight = `${footerElement.offsetHeight}px`;
      document.documentElement.style.setProperty('--footer-height', footerHeight);
    }
    
    // Adjust on resize
    const updateHeights = () => {
      if (headerElement) {
        document.documentElement.style.setProperty('--header-height', `${headerElement.offsetHeight}px`);
      }
      if (footerElement) {
        document.documentElement.style.setProperty('--footer-height', `${footerElement.offsetHeight}px`);
      }
    };
    
    window.addEventListener('resize', updateHeights);
    return () => window.removeEventListener('resize', updateHeights);
  }, 100);
  
  // Check if on mobile
  isMobile.value = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth < 768;

  // Auto-scroll to bottom after loading messages
  await nextTick();
  scrollToBottom();
});

// Auto-scroll to bottom whenever messages change
watch(messages, async () => {
  await nextTick();
  scrollToBottom();
});

// Function to show connection info
const showConnectionInfo = async () => {
  // Test the connection first
  const connectionTest = await testConnection();
  
  // Add a system message with connection details and test results
  messages.value.push({
    id: Date.now(),
    content: `## Connection Troubleshooting

Connection test result: **${connectionTest.success ? '✅ Success' : '❌ Failed'}**
${connectionTest.message}

Current connection settings:
- n8n URL: \`${n8nConfig.baseUrl}\`
- Webhook: \`${n8nConfig.fullWebhookUrl}\`
- Health check URL: \`${connectionTest.url}\`
${connectionTest.pingTime ? `- Response time: ${connectionTest.pingTime}ms` : ''}

### Common Issues:
1. **Different Network**: Your phone must be on the same WiFi network as the computer running n8n
2. **Wrong IP Address**: The IP address in the app might not match your computer's actual IP
3. **Firewall/Security**: Your computer's firewall might be blocking external connections
4. **n8n Not Running**: Make sure the n8n server is running
5. **Timeout**: For complex queries, n8n might be taking longer than the connection timeout

### How to Fix:
1. Find your computer's IP address:
   - On Windows: Open Command Prompt and type \`ipconfig\`
   - On Mac: Open System Preferences > Network
   - On Linux: Open Terminal and type \`hostname -I\`
2. Update the IP address in the n8nService.ts file
3. Make sure n8n is running and accessible
4. For timeout issues, try breaking your query into smaller parts

Try opening the n8n URL in your phone's browser to check if you can reach it directly.`,
    sender: 'assistant',
    timestamp: new Date()
  });
  
  // Scroll to this message
  nextTick(() => {
    scrollToBottom();
  });
};
</script>

<style scoped>
@media (max-width: 640px) {
  :deep(.max-w-\[85\%\]) {
    max-width: 90% !important;
  }
}

@media (min-width: 1280px) {
  .max-w-7xl {
    max-width: 100%;
    width: 100%;
  }
  
  main {
    max-width: 100%;
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

@media (min-width: 1536px) {
  .max-w-7xl {
    max-width: 100%;
    width: 100%;
  }
}

/* Dark mode textarea fix */
:deep(.dark textarea) {
  color: white !important;
  background-color: #1f2937 !important;
  caret-color: white;
}

/* Ensure chat container fills available space */
.chat-messages {
  height: calc(100% - var(--chat-header-height, 48px) - var(--chat-input-height, 68px));
  background-color: rgba(249, 250, 251, 0.8);
  background-image: none;
}

.dark .chat-messages {
  background-color: rgba(31, 41, 55, 0.8);
  background-image: none;
}

.chat-header {
  height: var(--chat-header-height, 48px);
  background: linear-gradient(to right, #3b82f6, #2563eb);
  color: white;
  border-radius: 8px 8px 0 0;
}

.chat-header h2 {
  color: white !important;
  font-weight: 600;
  letter-spacing: 0.01em;
}

.chat-header button {
  color: rgba(255, 255, 255, 0.8) !important;
}

.chat-header button:hover {
  color: white !important;
}

.chat-input {
  height: var(--chat-input-height, 68px);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  border-radius: 0 0 8px 8px;
}

/* Fill available screen space */
.min-h-screen {
  min-height: 100vh;
}

main {
  width: 100%;
  padding-left: 0;
  padding-right: 0;
}

.max-w-full {
  max-width: 100% !important;
}

/* Enhanced text visibility */
:deep(.text-gray-900) {
  color: #111827;
  font-weight: 500;
}

:deep(.dark .text-white) {
  color: #f9fafb;
  font-weight: 500;
}

:deep(.text-gray-700) {
  color: #374151;
}

:deep(.dark .text-gray-300) {
  color: #d1d5db;
}

/* Enhanced chat bubble styling */
:deep(.bg-blue-100) {
  background-color: #dbeafe;
  border: 1px solid #bfdbfe;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

:deep(.dark .bg-blue-900) {
  background-color: #1e40af;
  border: 1px solid #1e3a8a;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

:deep(.bg-gray-100) {
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

:deep(.dark .bg-gray-700) {
  background-color: #374151;
  border: 1px solid #4b5563;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Input styling */
:deep(.input) {
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 0.75rem;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

:deep(.dark .input) {
  border-color: #4b5563;
  background-color: #1f2937;
  color: #f9fafb;
}

:deep(.input:focus) {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  outline: none;
}

/* Button styling */
:deep(.btn-primary) {
  background: linear-gradient(to right, #3b82f6, #2563eb);
  border: none;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
  transition: transform 0.1s, box-shadow 0.1s;
}

:deep(.btn-primary:hover) {
  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.4);
  transform: translateY(-1px);
}

:deep(.btn-primary:active) {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(59, 130, 246, 0.2);
}

/* Welcome container and suggestions styling */
.welcome-container {
  background: transparent;
  border-radius: 0;
  box-shadow: none;
  transition: all 0.3s ease;
  padding: 1.5rem;
  margin: 0.5rem;
  width: calc(100% - 1rem);
  max-width: 800px;
}

.dark .welcome-container {
  background: transparent;
  box-shadow: none;
}

@media (min-width: 640px) {
  .welcome-container {
    background: white;
    border-radius: 1rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    padding: 2rem;
    margin: 1rem;
    width: calc(100% - 2rem);
  }
  
  .dark .welcome-container {
    background: #1f2937;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }
}

@media (min-width: 768px) {
  .welcome-container {
    padding: 2.5rem 3rem;
    margin: 1.5rem;
    width: calc(100% - 3rem);
  }
}

@media (min-width: 1024px) {
  .welcome-container {
    padding: 3rem 4rem;
    margin: 2rem;
    width: calc(100% - 4rem);
  }
}

.welcome-icon {
  background: linear-gradient(45deg, #3b82f6, #2563eb);
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);
}

.welcome-icon svg {
  color: white;
}

.suggestions-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 1rem;
}

.suggestion-button {
  padding: 0.875rem 1.25rem;
  text-align: left;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
  background: white;
  color: #1f2937;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.suggestion-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(to bottom, #3b82f6, #2563eb);
  transition: width 0.2s ease;
  z-index: 1;
}

.suggestion-button:hover {
  border-color: #bfdbfe;
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.15);
  transform: translateY(-1px);
}

.suggestion-button:hover::before {
  width: 100%;
  background: linear-gradient(to right, #3b82f6, #2563eb);
}

.suggestion-button:hover {
  color: white;
  border-color: transparent;
}

.dark .suggestion-button {
  background: #1f2937;
  color: #e5e7eb;
  border-color: #4b5563;
}

.dark .suggestion-button:hover {
  border-color: #3b82f6;
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.2);
}

/* Fix for iOS Safari height issues */
@supports (-webkit-touch-callout: none) {
  .min-h-screen {
    min-height: -webkit-fill-available;
  }
  
  main {
    height: calc(100vh - var(--header-height) - var(--footer-height));
    height: calc(-webkit-fill-available - var(--header-height) - var(--footer-height));
  }
}

/* Advanced Robot AI face styling */
.ai-face-container {
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* Pulse effect for eyes */
.pulse-animation {
  animation: pulse 2.5s infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
}

/* Rotating circles */
.rotating-circle {
  animation: rotate 20s linear infinite;
  transform-origin: center;
  stroke-dasharray: 30 10;
}

.rotating-circle-reverse {
  animation: rotate-reverse 15s linear infinite;
  transform-origin: center;
  stroke-dasharray: 20 10;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes rotate-reverse {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}

/* Scanning line across eyes */
.scanning-line {
  animation: scan 2s linear infinite;
  opacity: 0;
}

@keyframes scan {
  0% {
    opacity: 0;
    transform: translateY(-3px);
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
    transform: translateY(3px);
  }
}

/* Audio wave animation */
.audio-wave {
  animation: wave 1s ease-in-out infinite;
  transform-origin: center;
}

@keyframes wave {
  0%, 100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.6);
  }
}

/* Blinking line animation */
.blinking-line {
  animation: blink 2s ease-in-out infinite;
}

@keyframes blink {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
}

/* Data point pulsing */
.data-point {
  animation: data-pulse 3s infinite;
}

.data-point-small {
  animation: data-pulse 2s infinite;
  animation-delay: 1s;
}

@keyframes data-pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.5);
  }
}

/* Expanding circles animation */
.pulse-circle {
  animation: pulse-expand 4s infinite;
  transform-origin: center;
}

.pulse-circle-delayed {
  animation: pulse-expand 4s infinite;
  animation-delay: 2s;
  transform-origin: center;
}

@keyframes pulse-expand {
  0% {
    transform: scale(0.85);
    opacity: 0.1;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    transform: scale(1.1);
    opacity: 0.05;
  }
}

/* Floating dots */
.floating-dot {
  position: absolute;
  width: 4px;
  height: 4px;
  background-color: #3b82f6;
  border-radius: 50%;
  opacity: 0.2;
  animation: float 4s infinite ease-in-out;
}

.floating-dot.small {
  width: 2px;
  height: 2px;
  opacity: 0.1;
}

.dark .floating-dot {
  background-color: #60a5fa;
  opacity: 0.5;
}

.dark .floating-dot.small {
  opacity: 0.35;
}

@keyframes float {
  0% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-10px) translateX(5px);
  }
  50% {
    transform: translateY(-5px) translateX(10px);
  }
  75% {
    transform: translateY(8px) translateX(3px);
  }
  100% {
    transform: translateY(0) translateX(0);
  }
}

/* Connection lines */
.connection-line {
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg, transparent, #3b82f6, transparent);
  opacity: 0.25;
}

.dark .connection-line {
  background: linear-gradient(90deg, transparent, #60a5fa, transparent);
  opacity: 0.3;
}

/* Data streams animation */
.data-stream {
  position: absolute;
  width: 2px;
  height: 15px;
  background-color: #3b82f6;
  opacity: 0.3;
  animation: data-flow 3s infinite linear;
}

.dark .data-stream {
  background-color: #60a5fa;
  opacity: 0.4;
}

@keyframes data-flow {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
    transform: translateY(20px);
  }
}

/* Chat messages container mobile optimization */
@media (max-width: 639px) {
  .chat-messages {
    background-color: transparent;
  }
  
  .dark .chat-messages {
    background-color: transparent;
  }
  
  .ai-face-container {
    width: 160px;
    height: 160px;
  }
  
  .welcome-container h3 {
    font-size: 1.5rem;
    line-height: 1.3;
  }
  
  .welcome-container p {
    font-size: 1rem;
    line-height: 1.5;
  }
}

.loader-bot-avatar {
  transition: box-shadow 0.2s, transform 0.2s;
}
@keyframes loader-bot-pulse {
  0% {
    box-shadow: 0 2px 16px 0 rgba(37,99,235,0.25), 0 0 0 4px rgba(59,130,246,0.10);
    transform: scale(1);
  }
  100% {
    box-shadow: 0 4px 24px 0 rgba(37,99,235,0.35), 0 0 0 8px rgba(59,130,246,0.13);
    transform: scale(1.07);
  }
}
</style> 