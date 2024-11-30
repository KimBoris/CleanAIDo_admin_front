<template>
  <div class="auth-layout">
    <router-view /> <!-- 자식 컴포넌트를 렌더링 -->
  </div>
</template>

<script setup>
// AuthLayout은 인증 관련 컴포넌트를 감싸는 단순 레이아웃입니다.
</script>

<style scoped>
.auth-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 화면 전체를 차지 */
  background-color: #f4f5f7; /* 배경 색상 */
}
</style>
