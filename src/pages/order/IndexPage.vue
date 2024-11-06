<template>
  <div class="order-layout">
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h2>주문내역 리스트</h2>
    </div>
    <router-view />
  </div>
</template>

<script setup>
</script>

<style scoped>
.order-layout {
  padding: 20px;
}

h2 {
  font-size: 1.8rem;
  font-weight: 600;
}
</style>
