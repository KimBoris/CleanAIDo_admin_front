<template>
  <nav class="sidebar sidebar-offcanvas" id="sidebar">
    <AdminSideBar v-if="role === 'ROLE_ADMIN'" />
    <SellerSideBar v-else-if="role === 'ROLE_SELLER'" />
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "../../stores/useAuthStore.js";
import AdminSideBar from "./AdminSideBar.vue";
import SellerSideBar from "./SellerSideBar.vue";

const authStore = useAuthStore();
const role = computed(() => authStore.role);
</script>
