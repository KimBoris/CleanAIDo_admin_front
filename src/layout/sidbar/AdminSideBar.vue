<template>
  <nav class="sidebar sidebar-offcanvas" id="sidebar">
    <ul class="nav">
      <!-- 게시판 관리 -->
      <li class="nav-item nav-category">게시판 관리</li>
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="collapse" href="#admin-board" aria-expanded="false" aria-controls="admin-board">
          <i class="menu-icon mdi mdi-help-circle"></i>
          <span class="menu-title">게시판 관리</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="admin-board">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item">
              <RouterLink to="/faq/list" class="nav-link">FAQ 관리</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/qna/list" class="nav-link">QnA 관리</RouterLink>
            </li>
          </ul>
        </div>
      </li>

      <!-- 주문 관리 -->
      <li class="nav-item nav-category">주문 관리</li>
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="collapse" href="#admin-order" aria-expanded="false" aria-controls="admin-order">
          <i class="menu-icon mdi mdi-cart"></i>
          <span class="menu-title">주문 관리</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="admin-order">
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

      <li class="nav-item nav-category">사용자 관리</li>
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="collapse" href="#admin-order" aria-expanded="false" aria-controls="admin-order">
          <i class="menu-icon mdi mdi-cart"></i>
          <span class="menu-title">사용자 관리</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="admin-order">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item">
              <RouterLink to="/user/list" class="nav-link">판매자 관리</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/customer/list" class="nav-link">고객 관리</RouterLink>
            </li>
          </ul>
        </div>
      </li>

      <!-- 상품 관리 -->
      <li class="nav-item nav-category">상품 관리</li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          <i class="menu-icon mdi mdi-package-variant"></i>
          <RouterLink to="/product/list" class="menu-title">상품 조회</RouterLink>
        </a>
        <RouterLink to="/category" class="menu-title">카테고리 관리</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
</script>

<style scoped>
/* 추가 스타일 */
</style>
