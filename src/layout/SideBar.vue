<template>
  <nav class="sidebar sidebar-offcanvas" id="sidebar">
    <ul class="nav">
      <!-- Dashboard -->
      <li class="nav-item">
        <a class="nav-link" href="index.html">
          <i class="mdi mdi-grid-large menu-icon"></i>
          <span class="menu-title">Dashboard</span>
        </a>
      </li>

      <!-- Admin 전용 메뉴 -->
      <template v-if="role === 'ROLE_ADMIN'">
        <!-- 문의 관리 -->
        <li class="nav-item nav-category">UI Elements</li>
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
            <i class="menu-icon mdi mdi-floor-plan"></i>
            <span class="menu-title">문의 관리</span>
            <i class="menu-arrow"></i>
          </a>
          <div class="collapse" id="ui-basic">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item">
                <RouterLink to="/faq/list" class="nav-link">자주 묻는 질문(FAQ)</RouterLink>
              </li>
              <li class="nav-item">
                <a class="nav-link">상품 문의</a>
              </li>
              <li class="nav-item">
                <RouterLink to="/qna/list" class="nav-link">사이트 문의</RouterLink>
              </li>
            </ul>
          </div>
        </li>

        <!-- 주문 관리 -->
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="collapse" href="#order-management" aria-expanded="false" aria-controls="order-management">
            <i class="menu-icon mdi mdi-cart"></i>
            <span class="menu-title">주문 관리</span>
            <i class="menu-arrow"></i>
          </a>
          <div class="collapse" id="order-management">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item">
                <RouterLink to="/order/list/in-progress" class="nav-link">주문 내역</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/order/list/canceled" class="nav-link">취소/교환/환불</RouterLink>
              </li>
            </ul>
          </div>
        </li>
      </template>

      <!-- Seller 전용 메뉴 -->
      <template v-if="role === 'ROLE_SELLER'">
        <!-- 상품 관리 -->
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="collapse" href="#product-management" aria-expanded="false" aria-controls="product-management">
            <i class="menu-icon mdi mdi-package-variant"></i>
            <span class="menu-title">상품 관리</span>
            <i class="menu-arrow"></i>
          </a>
          <div class="collapse" id="product-management">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item">
                <RouterLink to="/product/list" class="nav-link">상품 리스트</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/product/register" class="nav-link">상품 등록</RouterLink>
              </li>
            </ul>
          </div>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script setup>
import { useAuthStore } from "../stores/useAuthStore";

const authStore = useAuthStore();
const role = authStore.role;
</script>

<style scoped>
</style>
