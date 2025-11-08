<template>
  <div 
    class="py-4 px-4 md:px-6 transition-opacity" 
    :class="[
      isLast && message.sender === 'assistant' ? 'animate-fade-in' : ''
    ]"
  >
    <div class="max-w-3xl lg:max-w-4xl mx-auto">
      <div class="flex items-start" :class="message.sender === 'user' ? 'justify-end' : 'justify-start'">
        <!-- Assistant avatar -->
        <div v-if="message.sender === 'assistant'" class="h-8 w-8 rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center mr-3 robot-avatar">
          <div class="h-full w-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center relative">
            <!-- Robot face SVG -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6 text-white robot-svg">
              <!-- Circuit board background -->
              <path d="M4 8h1m2 4h1m4-6h1m4 8h1m-8 2h1" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" class="circuit-line"/>
              
              <!-- Robot head shape -->
              <rect x="5" y="3" width="14" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.5" class="head-outline"/>
              
              <!-- Antenna -->
              <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" class="antenna"/>
              <circle cx="12" cy="1" r="0.7" fill="currentColor" class="antenna-tip"/>
              
              <!-- Eyes -->
              <circle cx="9" cy="8" r="1.5" fill="currentColor" class="robot-eye"/>
              <circle cx="15" cy="8" r="1.5" fill="currentColor" class="robot-eye"/>
              
              <!-- Digital pupils -->
              <circle cx="9" cy="8" r="0.5" fill="#164e63" class="robot-pupil"/>
              <circle cx="15" cy="8" r="0.5" fill="#164e63" class="robot-pupil"/>
              
              <!-- Mouth grid -->
              <line x1="8" y1="12.5" x2="16" y2="12.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" class="mouth-line"/>
              <line x1="8" y1="14.5" x2="16" y2="14.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" class="mouth-line"/>
              <line x1="10" y1="11.5" x2="10" y2="15.5" stroke="currentColor" stroke-width="0.7" stroke-linecap="round" class="mouth-grid"/>
              <line x1="14" y1="11.5" x2="14" y2="15.5" stroke="currentColor" stroke-width="0.7" stroke-linecap="round" class="mouth-grid"/>
              
              <!-- Face Details/Tech points -->
              <circle cx="5" cy="5" r="0.5" fill="currentColor" class="tech-point"/>
              <circle cx="19" cy="5" r="0.5" fill="currentColor" class="tech-point"/>
              <circle cx="5" cy="15" r="0.5" fill="currentColor" class="tech-point"/>
              <circle cx="19" cy="15" r="0.5" fill="currentColor" class="tech-point"/>
              
              <!-- Ear shapes -->
              <rect x="3" y="7" width="2" height="4" rx="1" fill="none" stroke="currentColor" stroke-width="1.2" class="ear"/>
              <rect x="19" y="7" width="2" height="4" rx="1" fill="none" stroke="currentColor" stroke-width="1.2" class="ear"/>
            </svg>
            
            <!-- Subtle glow effect -->
            <div class="absolute inset-0 bg-gradient-to-t from-blue-400/10 to-transparent robot-glow"></div>
          </div>
        </div>

        <!-- Message content -->
        <div 
          class="prose dark:prose-invert prose-sm sm:prose-base rounded-xl px-4 py-3 shadow-sm max-w-[80%] message-bubble relative group"
          :class="[
            message.sender === 'user' 
              ? 'bg-white text-gray-900 border border-gray-200 dark:border-gray-700 user-message' 
              : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 assistant-message'
          ]"
        >
          <div class="markdown-content leading-relaxed" v-html="formattedContent"></div>
          <div class="text-xs mt-2 text-right flex items-center justify-end gap-2" 
               :class="message.sender === 'user' ? 'text-gray-500 dark:text-white' : 'text-gray-500 dark:text-gray-400'">
            {{ formatTime(message.timestamp) }}
            <!-- Copy button - shown on both desktop and mobile -->
            <button 
              @click="copyMessageToClipboard" 
              class="copy-button p-1.5 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-300"
              :class="{ 'copied': copied }"
              title="Copy to clipboard"
            >
              <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500 dark:text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- User avatar -->
        <div v-if="message.sender === 'user'" class="h-8 w-8 rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center ml-3">
          <div class="h-full w-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, watch, nextTick } from 'vue';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import Prism from 'prismjs';
import { showSuccessToast, showErrorToast } from '../../services/toastService';
// Import basic Prism themes and languages
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-python';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const props = defineProps<{
  message: Message;
  isLast?: boolean;
}>();

const formattedContent = ref('');
const copied = ref(false);

// Detect if user is on mobile
const isMobile = ref(false);

const formatTime = (timestamp: Date) => {
  if (!(timestamp instanceof Date)) {
    timestamp = new Date(timestamp);
  }
  return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const formatMessage = (content: string) => {
  // Pre-process the content to improve formatting
  let processedContent = content;
  
  // Check if content is from n8n response
  if (props.message.sender === 'assistant') {
    // Add proper line breaks between paragraphs if they don't exist
    processedContent = processedContent.replace(/([^\n])\n([^\n])/g, '$1\n\n$2');
    
    // Convert plain text numbered lists to markdown format
    processedContent = processedContent.replace(/^(\d+)[\.\)]\s+(.+)$/gm, '$1. $2');
    
    // Convert plain text bullet points to markdown format
    processedContent = processedContent.replace(/^[\*\-\•]\s+(.+)$/gm, '* $1');
    
    // Format sections with headers
    processedContent = processedContent.replace(/^(.*?):\s*$/gm, '### $1');
    
    // Highlight important information
    processedContent = processedContent.replace(/\*\*([^*]+)\*\*/g, '**$1**');
    processedContent = processedContent.replace(/IMPORTANT:/gi, '**IMPORTANT:**');
    processedContent = processedContent.replace(/NOTE:/gi, '**NOTE:**');
    
    // Convert URLs to clickable links if not already formatted
    processedContent = processedContent.replace(
      /(?<!["\(\[])(https?:\/\/[^\s]+)(?!["\)\]])/g, 
      '[$1]($1)'
    );
    
    // Format product names and code references
    processedContent = processedContent.replace(/`([^`]+)`/g, '`$1`');
    
    // Detect and format tables if they have consistent column separators
    if (processedContent.includes('|') && /\|.*\|/.test(processedContent)) {
      const lines = processedContent.split('\n');
      let tableFound = false;
      let tableLines: string[] = [];
      let formattedLines: string[] = [];
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes('|') && line.split('|').length > 2) {
          if (!tableFound) {
            tableFound = true;
            // Start collecting table lines
            tableLines.push(line);
            
            // Add header separator row if this looks like a header
            if (i + 1 < lines.length && !lines[i + 1].includes('---')) {
              const columns = line.split('|').length - 1;
              let separator = '|';
              for (let j = 0; j < columns; j++) {
                separator += ' --- |';
              }
              tableLines.push(separator);
            }
          } else {
            tableLines.push(line);
          }
        } else {
          if (tableFound) {
            // End of table found, add an extra line break
            formattedLines = formattedLines.concat(tableLines);
            formattedLines.push('');
            tableLines = [];
            tableFound = false;
          }
          formattedLines.push(line);
        }
      }
      
      if (tableFound) {
        formattedLines = formattedLines.concat(tableLines);
      }
      
      processedContent = formattedLines.join('\n');
    }
  }
  
  // Configure marked options
  marked.setOptions({
    breaks: true,
    gfm: true
  });
  
  // Process markdown
  let htmlContent = marked.parse(processedContent) as string;
  
  // Sanitize HTML
  htmlContent = DOMPurify.sanitize(htmlContent, {
    ADD_ATTR: ['target']
  });
  
  // Make external links open in new tab
  htmlContent = htmlContent.replace(/<a href="http/g, '<a target="_blank" rel="noopener noreferrer" href="http');
  
  return htmlContent;
};

const copyMessageToClipboard = () => {
  console.log('Copy button clicked');
  
  // Get raw text content without HTML formatting
  const tempElement = document.createElement('div');
  tempElement.innerHTML = props.message.content;
  const textToCopy = tempElement.textContent || props.message.content;
  
  // For debugging
  console.log('Text to copy:', textToCopy.substring(0, 50) + '...');
  
  // For mobile devices, try fallback if clipboard API fails
  if (isMobile.value) {
    try {
      // Use modern clipboard API
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          console.log('Copy successful via Clipboard API');
          copied.value = true;
          showSuccessToast('Message copied to clipboard');
          setTimeout(() => {
            copied.value = false;
          }, 2000);
        })
        .catch(err => {
          console.error('Clipboard API error:', err);
          // Try fallback for mobile
          mobileCopyFallback(textToCopy);
        });
    } catch (err) {
      console.error('Error in clipboard operation:', err);
      mobileCopyFallback(textToCopy);
    }
  } else {
    // Desktop flow remains unchanged
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        console.log('Copy successful on desktop');
        copied.value = true;
        showSuccessToast('Message copied to clipboard');
        setTimeout(() => {
          copied.value = false;
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to copy text:', err);
        showErrorToast('Failed to copy text');
      });
  }
};

// Fallback for mobile devices
const mobileCopyFallback = (text: string) => {
  console.log('Attempting mobile fallback copy method');
  
  // Create temporary textarea element
  const textarea = document.createElement('textarea');
  textarea.value = text;
  
  // Set non-editable to avoid focus and move outside of view
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  
  document.body.appendChild(textarea);
  
  // Check if the device is iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  if (isIOS) {
    // iOS workaround
    const range = document.createRange();
    range.selectNodeContents(textarea);
    
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
      textarea.setSelectionRange(0, 999999);
    }
  } else {
    // Other mobile devices
    textarea.focus();
    textarea.select();
  }
  
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      console.log('Fallback copy successful');
      copied.value = true;
      showSuccessToast('Message copied to clipboard');
    } else {
      console.error('Fallback copy failed');
      showErrorToast('Could not copy text');
    }
  } catch (err) {
    console.error('Fallback copy error:', err);
    showErrorToast('Failed to copy text');
  }
  
  // Cleanup
  document.body.removeChild(textarea);
  
  setTimeout(() => {
    copied.value = false;
  }, 2000);
};

// Apply syntax highlighting after the content is rendered
const highlightCode = async () => {
  await nextTick();
  Prism.highlightAll();
};

// Process content initially
formattedContent.value = formatMessage(props.message.content);

// Apply Prism highlighting when DOM updates
onMounted(() => {
  // Detect mobile device
  isMobile.value = window.innerWidth < 768;
  
  // Listen for window resize events
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 768;
  });
  
  // Apply syntax highlighting
  highlightCode();
});

// Watch for content changes to reapply highlighting
watch(() => props.message.content, (newContent) => {
  formattedContent.value = formatMessage(newContent);
  highlightCode();
});
</script>

<style>
.prose {
  color: #374151;
  line-height: 1.6;
}

.dark .prose {
  color: #e5e7eb;
}

/* Enhanced list styling */
.prose ul {
  list-style-type: disc;
  padding-left: 1.5em;
  margin: 1em 0;
}

.prose ol {
  list-style-type: decimal;
  padding-left: 1.5em;
  margin: 1em 0;
}

.prose li {
  margin-bottom: 0.5em;
}

.prose li:last-child {
  margin-bottom: 0;
}

/* Enhance table styling */
.prose table {
  border-collapse: collapse;
  width: 100%;
  margin: 1.5em 0;
  font-size: 0.9em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  overflow: hidden;
}

.dark .prose table {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.prose th {
  background-color: #f3f4f6;
  color: #1f2937;
  font-weight: 600;
  text-align: left;
  padding: 0.75em 1em;
  border-bottom: 2px solid #e5e7eb;
}

.dark .prose th {
  background-color: #374151;
  color: #f9fafb;
  border-bottom: 2px solid #4b5563;
}

.prose td {
  padding: 0.75em 1em;
  border-bottom: 1px solid #e5e7eb;
}

.dark .prose td {
  border-bottom: 1px solid #4b5563;
}

.prose tr:last-child td {
  border-bottom: none;
}

.prose tr:nth-child(even) {
  background-color: #f9fafb;
}

.dark .prose tr:nth-child(even) {
  background-color: #1f2937;
}

/* Better blockquote styling */
.prose blockquote {
  border-left: 4px solid #3b82f6;
  padding-left: 1em;
  margin: 1.5em 0;
  color: #4b5563;
  font-style: italic;
  background-color: #f3f4f6;
  padding: 0.75em 1em;
  border-radius: 0 4px 4px 0;
}

.dark .prose blockquote {
  border-left: 4px solid #60a5fa;
  color: #9ca3af;
  background-color: #1f2937;
}

/* Better heading styling */
.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
  margin-top: 1.5em;
  margin-bottom: 0.75em;
  font-weight: 600;
  line-height: 1.3;
  color: #111827;
}

.dark .prose h1, .dark .prose h2, .dark .prose h3, 
.dark .prose h4, .dark .prose h5, .dark .prose h6 {
  color: #f9fafb;
}

.prose h1 {
  font-size: 1.875em;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.25em;
}

.prose h2 {
  font-size: 1.5em;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.25em;
}

.prose h3 {
  font-size: 1.25em;
}

.prose h4 {
  font-size: 1.125em;
}

.dark .prose h1, .dark .prose h2 {
  border-bottom: 1px solid #4b5563;
}

/* Enhance code blocks and inline code */
.prose code:not([class*="language-"]) {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.875em;
  background-color: #f3f4f6;
  color: #b91c1c;
  padding: 0.2em 0.4em;
  border-radius: 3px;
}

.dark .prose code:not([class*="language-"]) {
  background-color: #374151;
  color: #f87171;
}

/* Message bubble styling */
.message-bubble {
  position: relative;
  overflow: hidden;
}

/* User message styling */
.message-bubble.user-message {
  border-bottom-right-radius: 0.25rem !important;
}

.message-bubble.user-message::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: -0.75rem;
  width: 0.75rem;
  height: 1rem;
  background: linear-gradient(to bottom right, transparent 50%, #ffffff 50%);
  border-bottom-left-radius: 0.25rem;
}

/* Assistant message styling */
.message-bubble.assistant-message {
  border-bottom-left-radius: 0.25rem !important;
}

.message-bubble.assistant-message::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: -0.75rem;
  width: 0.75rem;
  height: 1rem;
  background: linear-gradient(to bottom left, transparent 50%, #ffffff 50%);
  border-bottom-right-radius: 0.25rem;
}

.dark .message-bubble.assistant-message::after {
  background: linear-gradient(to bottom left, transparent 50%, #1f2937 50%);
}

/* Override Prism styling for better integration */
pre[class*="language-"] {
  margin: 1em 0;
  border-radius: 6px;
  padding: 1em;
  overflow: auto;
  background: #282c34;
}

.dark pre[class*="language-"] {
  background: #1a1d23;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

code[class*="language-"] {
  text-shadow: none;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.875em;
}

/* Add a subtle header to code blocks */
pre[class*="language-"]::before {
  content: attr(class);
  text-transform: uppercase;
  font-size: 0.7em;
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.2em 0.6em;
  color: rgba(255, 255, 255, 0.6);
  border-bottom-left-radius: 4px;
  text-shadow: none;
  background: rgba(0, 0, 0, 0.3);
}

/* Robot avatar animation styles */
.robot-avatar {
  position: relative;
  z-index: 1;
}

.robot-svg {
  z-index: 2;
  position: relative;
}

.robot-eye {
  animation: blink 4s infinite;
}

@keyframes blink {
  0%, 96%, 98% {
    transform: scaleY(1);
    opacity: 1;
  }
  97% {
    transform: scaleY(0.1);
    opacity: 0.8;
  }
}

/* Make the robot eye animations offset from each other */
.robot-eye:nth-child(4) {
  animation-delay: 0.5s;
}

/* Pupils scanning movement */
.robot-pupil {
  animation: scan 3s ease-in-out infinite alternate;
}

@keyframes scan {
  0% { transform: translateX(-0.5px); }
  100% { transform: translateX(0.5px); }
}

/* Antenna pulsing */
.antenna {
  animation: pulse 2s infinite;
  transform-origin: bottom center;
}

.antenna-tip {
  animation: glow 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(1.05); }
}

@keyframes glow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

/* Circuit lines animation */
.circuit-line {
  opacity: 0.4;
  animation: circuit 5s linear infinite;
  stroke-dasharray: 1;
  stroke-dashoffset: 10;
}

@keyframes circuit {
  to { stroke-dashoffset: 0; }
}

/* Tech points blinking randomly */
.tech-point:nth-child(9) {
  animation: techBlink 3s infinite;
}

.tech-point:nth-child(10) {
  animation: techBlink 2.5s infinite 0.7s;
}

.tech-point:nth-child(11) {
  animation: techBlink 4s infinite 1.5s;
}

.tech-point:nth-child(12) {
  animation: techBlink 3.5s infinite 1s;
}

@keyframes techBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

/* Mouth line subtle animation */
.mouth-line {
  animation: talk 1s ease-in-out infinite alternate;
  animation-play-state: paused;
}

.message-bubble.assistant-message:hover .mouth-line {
  animation-play-state: running;
}

@keyframes talk {
  0% { transform: scaleX(1); }
  100% { transform: scaleX(0.95); }
}

/* Ear subtle pulsing */
.ear {
  animation: earPulse 3s ease-in-out infinite alternate;
}

@keyframes earPulse {
  0% { opacity: 0.8; }
  100% { opacity: 1; }
}

/* Subtle glow effect */
.robot-glow {
  animation: glowEffect 4s ease-in-out infinite alternate;
}

@keyframes glowEffect {
  0% { opacity: 0.3; }
  100% { opacity: 0.7; }
}
</style>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* User message in dark mode */
.dark .message-bubble.user-message::after {
  background: linear-gradient(to bottom right, transparent 50%, #1f2937 50%);
}

/* For dark mode, user message bubble has the same background as assistant messages */
.dark .message-bubble.user-message {
  background: #1f2937;
  color: white;
  border-color: #4b5563;
}

.dark .message-bubble.user-message :deep(p),
.dark .message-bubble.user-message :deep(h1),
.dark .message-bubble.user-message :deep(h2),
.dark .message-bubble.user-message :deep(h3),
.dark .message-bubble.user-message :deep(h4),
.dark .message-bubble.user-message :deep(h5),
.dark .message-bubble.user-message :deep(h6),
.dark .message-bubble.user-message :deep(ul),
.dark .message-bubble.user-message :deep(ol),
.dark .message-bubble.user-message :deep(li) {
  color: white;
}

/* Copy button styling */
.copy-button {
  z-index: 10;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.copy-button.copied {
  background-color: #f0fff4;
}

.dark .copy-button.copied {
  background-color: #064e3b;
}

/* Make desktop dark mode match mobile dark mode for copy button */
.dark .copy-button {
  background-color: rgba(55, 65, 81, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .copy-button {
    padding: 4px;
    touch-action: manipulation;
    min-width: 28px;
    min-height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  .dark .copy-button {
    background-color: rgba(55, 65, 81, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .copy-button svg {
    width: 16px;
    height: 16px;
  }
}
</style> 