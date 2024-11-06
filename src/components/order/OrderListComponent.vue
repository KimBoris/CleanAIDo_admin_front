<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">주문 목록</h4>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
          <tr>
            <th>주문 번호</th>
            <th>제품 번호</th>
            <th>고객 ID</th>
            <th>전화 번호</th>
            <th>배송 주소</th>
            <th>총 가격</th>
            <th>주문 날짜</th>
            <th>송장 번호</th>
            <th>상태</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="order in orderList.content" :key="order.orderNumber">
            <td>{{ order.orderNumber }}</td>
            <td>{{ order.productNumber }}</td>
            <td>{{ order.customerId }}</td>
            <td>{{ order.phoneNumber }}</td>
            <td>{{ order.deliveryAddress }}</td>
            <td>{{ order.totalPrice }}</td>
            <td>{{ new Date(order.orderDate).toLocaleString() }}</td>
            <td>{{ order.trackingNumber }}</td>
            <td>{{ order.orderStatus }}</td>
          </tr>
          </tbody>
        </table>

        <!-- 페이지네이션 -->
        <div class="d-flex justify-content-center mt-4">
          <button
              class="btn btn-outline-secondary me-2"
              :disabled="!orderList.pageable.pageNumber"
              @click="fetchOrders(orderList.pageable.pageNumber - 1)"
          >
            이전
          </button>
          <button
              v-for="page in pageNumbers"
              :key="page"
              class="btn"
              :class="{ 'btn-primary': page === currentPage, 'btn-outline-secondary': page !== currentPage }"
              @click="fetchOrders(page - 1)"
          >
            {{ page }}
          </button>
          <button
              class="btn btn-outline-secondary ms-2"
              :disabled="orderList.last"
              @click="fetchOrders(orderList.pageable.pageNumber + 1)"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getOrderList } from '../../apis/orderApi';

const orderList = ref({
  content: [], // 주문 데이터 리스트
  pageable: {
    pageNumber: 0,
    pageSize: 10,
  },
  totalPages: 1,
  totalElements: 0,
  last: true,
});

const currentPage = ref(1);

// 페이지 번호 목록 생성
const pageNumbers = computed(() => {
  return Array.from({ length: orderList.value.totalPages }, (_, i) => i + 1);
});

// 주문 데이터를 가져오는 함수
const fetchOrders = async (page = 0) => {
  try {
    const response = await getOrderList(page, orderList.value.pageable.pageSize);
    orderList.value = response.data;
    currentPage.value = page + 1;
  } catch (error) {
    console.error('Error fetching order list:', error);
  }
};

// 컴포넌트가 마운트되면 주문 데이터를 가져옴
onMounted(() => {
  fetchOrders();
});
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

th {
  background-color: #f5f5f5;
}

.btn {
  margin: 0 5px;
}
</style>
