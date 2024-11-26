<template>
  <AdminSideBar v-if="userRole === 'admin'"></AdminSideBar>
  <UserSideBar v-if="userRole === 'user'"></UserSideBar>
</template>

<script setup>
// Pinia store에서 role을 가져오기'
import AdminSideBar from './AdminSideBar.vue'
import UserSideBar from './UserSideBar.vue'
import useAuthStore from "../stores/useAuthStore.js";

// Pinia store를 가져와서 사용
const authStore = useAuthStore();

// userRole을 Pinia store의 role로 설정
const userRole = authStore.role
</script>

<style scoped>
</style>
