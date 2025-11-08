<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-50" :open="isOpen" static>
      <!-- Background overlay with transition -->
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500/75 backdrop-blur-sm" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <!-- Modal panel with transition -->
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
              <!-- Close button -->
              <div class="absolute right-4 top-4">
                <button
                  type="button"
                  class="rounded-full p-1.5 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:hover:text-gray-300"
                  @click="closeModal"
                >
                  <span class="sr-only">Close</span>
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Modal content -->
              <DialogTitle as="h3" class="text-2xl font-semibold leading-6 text-gray-900 dark:text-white mb-6">
                Login to Access AI Chat
              </DialogTitle>

              <!-- Error message -->
              <div v-if="loginError" class="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-400 text-sm">
                {{ loginError }}
              </div>

              <form @submit.prevent="handleLogin" class="space-y-6">
                <!-- Email input -->
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <div class="mt-1 relative">
                    <input
                      id="email"
                      v-model="email"
                      type="email"
                      required
                      autocomplete="email"
                      class="block w-full rounded-lg border-blue-400 dark:border-gray-600 shadow-sm focus:border-gray-700 dark:focus:border-blue-500 focus:ring-gray-700 dark:focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-base py-3 px-4 transition-colors"
                      placeholder="Enter your email"
                      :class="{ 'border-red-500': emailError }"
                    />
                    <div v-if="emailError" class="absolute -bottom-5 left-0 text-xs text-red-500">
                      {{ emailError }}
                    </div>
                  </div>
                </div>

                <!-- Password input -->
                <div>
                  <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                  <div class="mt-1 relative">
                    <input
                      id="password"
                      v-model="password"
                      :type="showPassword ? 'text' : 'password'"
                      required
                      autocomplete="current-password"
                      class="block w-full rounded-lg border-blue-400 dark:border-gray-600 shadow-sm focus:border-gray-700 dark:focus:border-blue-500 focus:ring-gray-700 dark:focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-base py-3 px-4 transition-colors"
                      placeholder="Enter your password"
                      :class="{ 'border-red-500': passwordError }"
                    />
                    <button
                      type="button"
                      class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                      @click="showPassword = !showPassword"
                    >
                      <span class="sr-only">{{ showPassword ? 'Hide password' : 'Show password' }}</span>
                      <svg v-if="showPassword" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                      <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                    <div v-if="passwordError" class="absolute -bottom-5 left-0 text-xs text-red-500">
                      {{ passwordError }}
                    </div>
                  </div>
                </div>

                <!-- Login button -->
                <div>
                  <button
                    type="submit"
                    :disabled="isLoading"
                    class="flex w-full justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ isLoading ? 'Signing in...' : 'Sign in' }}
                  </button>
                </div>
              </form>

              <!-- Sign up link -->
              
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <TransitionRoot appear :show="showNameModal" as="template">
    <Dialog as="div" class="relative z-50" :open="showNameModal" static>
      <div class="fixed inset-0 bg-gray-500/75 backdrop-blur-sm" />
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel class="w-full max-w-sm bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl">
          <DialogTitle as="h3" class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Set Your Chat Room Name
          </DialogTitle>
          <input
            v-model="chatRoomName"
            type="text"
            class="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 mb-4 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Enter your name"
            @keyup.enter="submitChatRoomName"
          />
          <button
            type="button"
            @click.prevent="submitChatRoomName"
            @touchstart.prevent="submitChatRoomName"
            class="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition active:bg-blue-800"
            :disabled="!chatRoomName.trim()"
          >
            Save
          </button>
        </DialogPanel>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { supabase } from '../lib/supabase';
import { useRouter } from 'vue-router';

const router = useRouter();
const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'login-success'): void;
}>();

defineProps<{
  isOpen: boolean;
}>();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const isLoading = ref(false);
const emailError = ref('');
const passwordError = ref('');
const loginError = ref('');
const showNameModal = ref(false);
const chatRoomName = ref('');
const currentUserId = ref('');

const closeModal = () => {
  emit('close');
};

const validateForm = () => {
  let isValid = true;
  emailError.value = '';
  passwordError.value = '';
  loginError.value = '';

  if (!email.value) {
    emailError.value = 'Email is required';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailError.value = 'Please enter a valid email';
    isValid = false;
  }

  if (!password.value) {
    passwordError.value = 'Password is required';
    isValid = false;
  } else if (password.value.length < 6) {
    passwordError.value = 'Password must be at least 6 characters';
    isValid = false;
  }

  return isValid;
};

const ensureChatRoomForUser = async (user: { id: string }) => {
  currentUserId.value = user.id;
  const { data: chatRoom } = await supabase
    .from('chat_room')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!chatRoom) {
    await supabase
      .from('chat_room')
      .insert([{ id: user.id, name: '' }]);
    showNameModal.value = true;
    return true;
  } else if (!chatRoom.name) {
    showNameModal.value = true;
    return true;
  }
  return false;
};

const submitChatRoomName = async () => {
  if (!chatRoomName.value.trim()) {
    console.log('Chat room name is empty');
    return;
  }
  
  try {
    console.log('Starting chat room name submission...');
    
    // Disable the button immediately to prevent double submission
    const saveButton = document.querySelector('button[type="button"]');
    if (saveButton) {
      saveButton.setAttribute('disabled', 'true');
    }
    
    // Get the current user to ensure we have the latest ID
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      console.error('Error getting user:', userError);
      return;
    }
    
    if (!user) {
      console.error('No user found when submitting chat room name');
      return;
    }
    
    console.log('User ID:', user.id);
    
    // First check if the chat room exists
    const { data: existingRoom, error: checkError } = await supabase
      .from('chat_room')
      .select('*')
      .eq('id', user.id)
      .single();
      
    if (checkError) {
      console.error('Error checking chat room:', checkError);
      return;
    }
    
    let updateSuccess = false;
    
    if (!existingRoom) {
      // If room doesn't exist, create it first
      const { error: insertError } = await supabase
        .from('chat_room')
        .insert([{ id: user.id, name: chatRoomName.value.trim() }]);
        
      if (insertError) {
        console.error('Error creating chat room:', insertError);
        return;
      }
      updateSuccess = true;
    } else {
      // Update existing room
      const { error: updateError } = await supabase
        .from('chat_room')
        .update({ name: chatRoomName.value.trim() })
        .eq('id', user.id);
        
      if (updateError) {
        console.error('Error updating chat room name:', updateError);
        return;
      }
      updateSuccess = true;
    }
    
    if (updateSuccess) {
      console.log('Chat room name updated successfully');
      
      // Verify the update
      const { data: verifyRoom, error: verifyError } = await supabase
        .from('chat_room')
        .select('name')
        .eq('id', user.id)
        .single();
        
      if (verifyError) {
        console.error('Error verifying update:', verifyError);
        return;
      }
      
      console.log('Verified chat room name:', verifyRoom.name);
      
      // Clear the form and close modal
      showNameModal.value = false;
      chatRoomName.value = '';
      closeModal();
      
      // Use setTimeout to ensure the modal is closed before navigation
      setTimeout(() => {
        router.push('/chat');
      }, 100);
    }
  } catch (error) {
    console.error('Error in submitChatRoomName:', error);
  } finally {
    // Re-enable the button
    const saveButton = document.querySelector('button[type="button"]');
    if (saveButton) {
      saveButton.removeAttribute('disabled');
    }
  }
};

const handleLogin = async () => {
  if (!validateForm()) return;

  try {
    isLoading.value = true;
    loginError.value = '';
    console.log('Attempting login with:', { email: email.value });

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    console.log('Login response:', { data, error });

    if (error) {
      console.error('Supabase login error:', error);
      throw error;
    }

    if (data?.user) {
      // Ensure chat_room exists and has a name
      const needsName = await ensureChatRoomForUser(data.user);
      emit('login-success');
      if (!needsName) {
        closeModal();
        router.push('/chat');
      }
      // else: wait for name modal to finish, then close/navigate in submitChatRoomName
    }
  } catch (error: any) {
    console.error('Login failed:', error);
    loginError.value = error.message || 'Failed to login. Please try again.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* Add any additional custom styles here */
</style> 