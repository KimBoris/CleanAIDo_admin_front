<template>
  <nav class="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex align-items-top flex-row">
    <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
      <div class="me-3">
        <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-bs-toggle="minimize">
          <span class="icon-menu"></span>
        </button>
      </div>
      <div>
        <a class="navbar-brand brand-logo" href="index.html">
          <img src="/assets/images/logo.svg" alt="logo" />
        </a>
        <a class="navbar-brand brand-logo-mini" href="index.html">
          <img src="/assets/images/logo-mini.svg" alt="logo" />
        </a>
      </div>
    </div>
    <div class="navbar-menu-wrapper d-flex align-items-top">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item dropdown d-none d-lg-block user-dropdown">
          <a class="nav-link" id="UserDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
            <img class="img-xs rounded-circle" src="/assets/images/faces/face8.jpg" alt="Profile image"> </a>
          <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="UserDropdown">
            <div class="dropdown-header text-center">
              <img class="img-md rounded-circle" src="/assets/images/faces/face8.jpg" alt="Profile image">
              <!-- 이름과 역할 출력 -->
              <p class="mb-1 mt-3 fw-semibold">{{ ownerName }} {{ role === 'ROLE_ADMIN' ? '관리자님' : '판매자님' }}</p>
              <!-- 이메일 출력 -->
              <p class="fw-light text-muted mb-0">{{ userId }}</p>
            </div>

            <a class="dropdown-item"><i class="dropdown-item-icon mdi mdi-account-outline text-primary me-2"></i> My Profile <span class="badge badge-pill badge-danger">1</span></a>
            <a class="dropdown-item"><i class="dropdown-item-icon mdi mdi-message-text-outline text-primary me-2"></i> Messages</a>
            <a class="dropdown-item"><i class="dropdown-item-icon mdi mdi-calendar-check-outline text-primary me-2"></i> Activity</a>
            <a class="dropdown-item"><i class="dropdown-item-icon mdi mdi-help-circle-outline text-primary me-2"></i> FAQ</a>
            <a class="dropdown-item" @click="handleLogout"><i class="dropdown-item-icon mdi mdi-power text-primary me-2"></i> Sign Out</a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from "../stores/useAuthStore";
import { useRouter } from "vue-router";
import { computed } from "vue";

const authStore = useAuthStore();
const router = useRouter();

const ownerName = computed( () =>authStore.ownerName); // 사용자 이름
const userId = computed( () =>authStore.userId); // 사용자 이메일
const role = computed( () =>authStore.role); // 사용자 역할 (ROLE_ADMIN, ROLE_SELLER)

const handleLogout = () => {
  authStore.setLogout();
  router.push("/auth/login"); // 로그아웃 후 로그인 화면으로 이동
};
</script>
