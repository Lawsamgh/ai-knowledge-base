import { ref } from 'vue';

interface ToastOptions {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
}

// Default options
const DEFAULT_DURATION = 3000; // 3 seconds

// Toast state
const visible = ref(false);
const message = ref('');
const type = ref<'success' | 'error' | 'info'>('info');
const duration = ref(DEFAULT_DURATION);

/**
 * Show a toast notification
 */
export function showToast(options: ToastOptions) {
  // If a toast is already visible, hide it first
  if (visible.value) {
    hideToast();
    
    // Small delay to ensure transition completes
    setTimeout(() => {
      displayToast(options);
    }, 300);
  } else {
    displayToast(options);
  }
}

/**
 * Display the toast with the given options
 */
function displayToast(options: ToastOptions) {
  message.value = options.message;
  type.value = options.type || 'info';
  duration.value = options.duration || DEFAULT_DURATION;
  visible.value = true;
  
  // Auto-hide after duration
  setTimeout(() => {
    hideToast();
  }, duration.value);
}

/**
 * Hide the toast notification
 */
export function hideToast() {
  visible.value = false;
}

/**
 * Convenience method for success toast
 */
export function showSuccessToast(message: string, duration?: number) {
  showToast({
    message,
    type: 'success',
    duration
  });
}

/**
 * Convenience method for error toast
 */
export function showErrorToast(message: string, duration?: number) {
  showToast({
    message,
    type: 'error',
    duration
  });
}

/**
 * Convenience method for info toast
 */
export function showInfoToast(message: string, duration?: number) {
  showToast({
    message,
    type: 'info',
    duration
  });
}

export default {
  visible,
  message,
  type,
  duration,
  showToast,
  hideToast,
  showSuccessToast,
  showErrorToast,
  showInfoToast
}; 