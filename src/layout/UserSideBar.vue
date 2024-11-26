<script setup>

</script>

<template>
  <!-- SideBar -->
  <nav class="sidebar sidebar-offcanvas" id="sidebar">
    <ul class="nav">
      <li class="nav-item">
        <a class="nav-link" href="index.html">
          <i class="mdi mdi-grid-large menu-icon"></i>
          <span class="menu-title">Dashboard</span>
        </a>
      </li>
      <li class="nav-item nav-category">UI Elements</li>
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
          <i class="menu-icon mdi mdi-floor-plan"></i>
          <span class="menu-title">문의 관리를 할까말까</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="ui-basic">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item"><RouterLink to="/faq/list" class="nav-link">자주묻는질문(FAQ)</RouterLink></li>
            <li class="nav-item"><a class="nav-link">상품문의</a></li>
            <li class="nav-item"><RouterLink to="/qna/list" class="nav-link">사이트문의</RouterLink></li>
          </ul>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="collapse" href="#order-management" aria-expanded="false" aria-controls="order-management">
          <i class="menu-icon mdi mdi-cart"></i>
          <span class="menu-title">주문 관리</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="order-management">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item">
              <RouterLink to="/order/list/in-progress" class="nav-link">주문내역</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/order/list/canceled" class="nav-link">취소/교환/환불</RouterLink>
            </li>
          </ul>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="collapse" href="#charts" aria-expanded="false" aria-controls="charts">
          <i class="menu-icon mdi mdi-chart-line"></i>
          <span class="menu-title">Charts</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="charts">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item"> <a class="nav-link" href="#">ChartJs</a></li>
          </ul>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="collapse" href="#tables" aria-expanded="false" aria-controls="tables">
          <i class="menu-icon mdi mdi-table"></i>
          <span class="menu-title">Tables</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="tables">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item"> <a class="nav-link" href="#">Basic table</a></li>
          </ul>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="collapse" href="#icons" aria-expanded="false" aria-controls="icons">
          <i class="menu-icon mdi mdi-layers-outline"></i>
          <span class="menu-title">Icons</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="icons">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item"> <a class="nav-link" href="#">Font Awesome</a></li>
          </ul>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
          <i class="menu-icon mdi mdi-account-circle-outline"></i>
          <span class="menu-title">User Pages</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="auth">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item"> <a class="nav-link" href="#"> Blank Page </a></li>
            <li class="nav-item"> <a class="nav-link" href="#"> 404 </a></li>
            <li class="nav-item"> <a class="nav-link" href="#"> 500 </a></li>
            <li class="nav-item"> <a class="nav-link" href="#"> Login </a></li>
            <li class="nav-item"> <a class="nav-link" href="#"> Register </a></li>
          </ul>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          <i class="menu-icon mdi mdi-file-document"></i>
          <span class="menu-title">Documentation</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>

</style>