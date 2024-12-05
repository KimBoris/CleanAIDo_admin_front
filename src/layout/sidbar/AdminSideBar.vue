<template>
    <ul class="nav">
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="collapse" href="#form-elements" aria-expanded="false" aria-controls="form-elements">
          <i class="menu-icon mdi mdi-cart"></i>
          <span class="menu-title">주문 관리</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="form-elements">
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
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="collapse" href="#charts" aria-expanded="false" aria-controls="charts">
          <i class="menu-icon mdi mdi-account-circle"></i>
          <span class="menu-title">판매자 관리</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="charts">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item">
              <RouterLink to="/user/list" class="nav-link">판매자 조회</RouterLink>
              <RouterLink to="/user/request" class="nav-link">판매자 입점요청</RouterLink>
              <RouterLink to="" class="nav-link">판매자 탈퇴요청</RouterLink>
            </li>
          </ul>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="collapse" href="#tables" aria-expanded="false" aria-controls="tables">
          <i class="menu-icon mdi mdi-account-supervisor-circle"></i>
          <span class="menu-title">고객 관리</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="tables">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item">
              <RouterLink to="/customer/list" class="nav-link">고객 관리</RouterLink>
            </li>
          </ul>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="collapse" href="#icons" aria-expanded="false" aria-controls="icons">
          <i class="menu-icon mdi mdi-package-variant"></i>
          <span class="menu-title">상품 관리</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="icons">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item">
              <RouterLink to="/category" class="nav-link">카테고리 관리</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/product/list" class="nav-link">상품 조회</RouterLink>
            </li>
          </ul>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
          <i class="menu-icon mdi mdi-help-circle"></i>
          <span class="menu-title">게시판 관리</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="ui-basic">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item"><RouterLink to="/faq/list" class="nav-link">FAQ 관리</RouterLink></li>
            <li class="nav-item"><RouterLink to="/qna/list" class="nav-link">QnA 관리</RouterLink></li>
          </ul>
        </div>
      </li>
    </ul>
</template>

<script setup>
  $(document).ready(function () {
    // 모든 collapse 메뉴 닫기
    $('.collapse').removeClass('show');
    $('.nav-link[data-bs-toggle="collapse"]').attr('aria-expanded', 'false');
  });
</script>
