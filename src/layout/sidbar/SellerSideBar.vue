<template>
  <nav class="sidebar sidebar-offcanvas" id="sidebar">
    <ul class="nav">
      <!-- 상품 관리 -->
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="collapse" href="#seller-product" aria-expanded="false" aria-controls="seller-product">
          <i class="menu-icon mdi mdi-package-variant"></i>
          <span class="menu-title">상품 관리</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="seller-product">
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

      <!-- 주문 관리 -->
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="collapse" href="#seller-order" aria-expanded="false" aria-controls="seller-order">
          <i class="menu-icon mdi mdi-cart"></i>
          <span class="menu-title">주문 관리</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="seller-order">
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

      <!-- 게시판 -->
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="collapse" href="#seller-board" aria-expanded="false" aria-controls="seller-board">
          <i class="menu-icon mdi mdi-help-circle"></i>
          <span class="menu-title">게시판</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="seller-board">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item">
              <RouterLink to="/faq/list" class="nav-link">FAQ 조회</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/qna/list" class="nav-link">QnA 등록</RouterLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script setup>
</script>

<style scoped>
/* 추가 스타일 */
</style>
