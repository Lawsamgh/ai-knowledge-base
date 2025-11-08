<template>
  <Toast 
    :message="toastService.message.value"
    :type="toastService.type.value"
    :visible="toastService.visible.value"
    @close="toastService.hideToast"
  />
</template>

<script setup lang="ts">
import Toast from './Toast.vue';
import toastService from '../../services/toastService';
</script> 