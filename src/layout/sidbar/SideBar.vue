<!--<template>-->
<!--  <nav class="sidebar sidebar-offcanvas" id="sidebar">-->
<!--    <ul class="nav">-->
<!--      &lt;!&ndash; 공통 메뉴 &ndash;&gt;-->
<!--      <li class="nav-item">-->
<!--        <a class="nav-link" href="index.html">-->
<!--          <i class="mdi mdi-grid-large menu-icon"></i>-->
<!--          <span class="menu-title">Dashboard</span>-->
<!--        </a>-->
<!--      </li>-->

<!--      &lt;!&ndash; Admin 전용 메뉴 &ndash;&gt;-->
<!--      <template v-if="role === 'ROLE_ADMIN'">-->
<!--        &lt;!&ndash; 게시판 관리 &ndash;&gt;-->
<!--        <li class="nav-item nav-category">게시판 관리</li>-->
<!--        <li class="nav-item">-->
<!--          <a class="nav-link" data-bs-toggle="collapse" href="#admin-board" aria-expanded="false" aria-controls="admin-board">-->
<!--            <i class="menu-icon mdi mdi-help-circle"></i>-->
<!--            <span class="menu-title">게시판 관리</span>-->
<!--            <i class="menu-arrow"></i>-->
<!--          </a>-->
<!--          <div class="collapse" id="admin-board">-->
<!--            <ul class="nav flex-column sub-menu">-->
<!--              <li class="nav-item">-->
<!--                <RouterLink to="/faq/list" class="nav-link">FAQ 관리</RouterLink>-->
<!--              </li>-->
<!--              <li class="nav-item">-->
<!--                <RouterLink to="/qna/list" class="nav-link">QnA 관리</RouterLink>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </div>-->
<!--        </li>-->

<!--        &lt;!&ndash; 주문 관리 &ndash;&gt;-->
<!--        <li class="nav-item nav-category">주문 관리</li>-->
<!--        <li class="nav-item">-->
<!--          <a class="nav-link" data-bs-toggle="collapse" href="#admin-order" aria-expanded="false" aria-controls="admin-order">-->
<!--            <i class="menu-icon mdi mdi-cart"></i>-->
<!--            <span class="menu-title">주문 관리</span>-->
<!--            <i class="menu-arrow"></i>-->
<!--          </a>-->
<!--          <div class="collapse" id="admin-order">-->
<!--            <ul class="nav flex-column sub-menu">-->
<!--              <li class="nav-item">-->
<!--                <RouterLink to="/order/list/in-progress" class="nav-link">주문 내역</RouterLink>-->
<!--              </li>-->
<!--              <li class="nav-item">-->
<!--                <RouterLink to="/order/list/canceled" class="nav-link">취소/교환/환불</RouterLink>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </div>-->
<!--        </li>-->

<!--        &lt;!&ndash; 상품 관리 &ndash;&gt;-->
<!--        <li class="nav-item nav-category">상품 관리</li>-->
<!--        <li class="nav-item">-->
<!--          <a class="nav-link" href="#">-->
<!--            <i class="menu-icon mdi mdi-package-variant"></i>-->
<!--            <RouterLink to="/product/list" class="menu-title">상품 조회</RouterLink>-->
<!--          </a>-->
<!--        </li>-->
<!--      </template>-->

<!--      &lt;!&ndash; Seller 전용 메뉴 &ndash;&gt;-->
<!--      <template v-if="role === 'ROLE_SELLER'">-->
<!--        &lt;!&ndash; 상품 관리 &ndash;&gt;-->
<!--        <li class="nav-item nav-category">상품 관리</li>-->
<!--        <li class="nav-item">-->
<!--          <a class="nav-link" data-bs-toggle="collapse" href="#seller-product" aria-expanded="false" aria-controls="seller-product">-->
<!--            <i class="menu-icon mdi mdi-package-variant"></i>-->
<!--            <span class="menu-title">상품 관리</span>-->
<!--            <i class="menu-arrow"></i>-->
<!--          </a>-->
<!--          <div class="collapse" id="seller-product">-->
<!--            <ul class="nav flex-column sub-menu">-->
<!--              <li class="nav-item">-->
<!--                <RouterLink to="/product/list" class="nav-link">상품 리스트</RouterLink>-->
<!--              </li>-->
<!--              <li class="nav-item">-->
<!--                <RouterLink to="/product/register" class="nav-link">상품 등록</RouterLink>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </div>-->
<!--        </li>-->

<!--        &lt;!&ndash; 주문 관리 &ndash;&gt;-->
<!--        <li class="nav-item nav-category">주문 관리</li>-->
<!--        <li class="nav-item">-->
<!--          <a class="nav-link" data-bs-toggle="collapse" href="#seller-order" aria-expanded="false" aria-controls="seller-order">-->
<!--            <i class="menu-icon mdi mdi-cart"></i>-->
<!--            <span class="menu-title">주문 관리</span>-->
<!--            <i class="menu-arrow"></i>-->
<!--          </a>-->
<!--          <div class="collapse" id="seller-order">-->
<!--            <ul class="nav flex-column sub-menu">-->
<!--              <li class="nav-item">-->
<!--                <RouterLink to="/order/list/in-progress" class="nav-link">주문 내역</RouterLink>-->
<!--              </li>-->
<!--              <li class="nav-item">-->
<!--                <RouterLink to="/order/list/canceled" class="nav-link">취소/교환/환불</RouterLink>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </div>-->
<!--        </li>-->

<!--        &lt;!&ndash; 게시판 조회 &ndash;&gt;-->
<!--        <li class="nav-item nav-category">게시판</li>-->
<!--        <li class="nav-item">-->
<!--          <a class="nav-link" data-bs-toggle="collapse" href="#seller-board" aria-expanded="false" aria-controls="seller-board">-->
<!--            <i class="menu-icon mdi mdi-help-circle"></i>-->
<!--            <span class="menu-title">게시판</span>-->
<!--            <i class="menu-arrow"></i>-->
<!--          </a>-->
<!--          <div class="collapse" id="seller-board">-->
<!--            <ul class="nav flex-column sub-menu">-->
<!--              <li class="nav-item">-->
<!--                <RouterLink to="/faq/list" class="nav-link">FAQ 조회</RouterLink>-->
<!--              </li>-->
<!--              <li class="nav-item">-->
<!--                <RouterLink to="/qna/list" class="nav-link">QnA 등록</RouterLink>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </div>-->
<!--        </li>-->
<!--      </template>-->
<!--    </ul>-->
<!--  </nav>-->
<!--</template>-->

<!--<script setup>-->
<!--import { useAuthStore } from "../stores/useAuthStore";-->

<!--const authStore = useAuthStore();-->
<!--const role = authStore.role;-->
<!--</script>-->

<!--<style scoped>-->
<!--/* 스타일을 추가할 필요가 있다면 여기에 작성하세요 */-->
<!--</style>-->

<template>
  <nav>
    <AdminSideBar v-if="role === 'ROLE_ADMIN'" />
    <SellerSideBar v-else-if="role === 'ROLE_SELLER'" />
  </nav>
</template>

<script setup>
import { useAuthStore } from "../../stores/useAuthStore.js";
import AdminSideBar from "./AdminSideBar.vue";
import SellerSideBar from "./SellerSideBar.vue";

const authStore = useAuthStore();
const role = authStore.role;
</script>

<style scoped>
/* 공통 스타일 */
</style>

