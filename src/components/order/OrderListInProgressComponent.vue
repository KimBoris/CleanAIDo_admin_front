<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">배송 상태 주문 내역</h4>

      <!-- 검색창 -->
      <div class="form-group d-flex justify-content-end">
        <select v-model="searchType" class="form-select me-2" style="width: 200px;">
          <option value="orderNumber">주문 번호</option>
          <option value="productNumber">상품 번호</option>
          <option value="customerId">고객 ID</option>
          <option value="phoneNumber">전화 번호</option>
          <option value="trackingNumber">송장 번호</option>
        </select>
        <input v-model="keyword" type="text" class="form-control me-2" placeholder="검색어 입력" />
        <button @click="handleSearch" class="btn btn-primary">검색</button>
      </div>

      <!-- 주문 목록 테이블 -->
      <div class="table-responsive" v-if="orderList.dtoList && orderList.dtoList.length">
        <table class="table table-hover">
          <thead>
          <tr>
            <th>주문 번호</th>
            <th>상품 번호</th>
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
          <tr v-for="order in orderList.dtoList" :key="order.orderNumber">
            <td>{{ order.orderNumber }}</td>
            <td>{{ order.productNumbers.join(', ') }}</td> <!-- 모든 상품 번호 출력 -->
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

        <!-- 페이지네이션 버튼 -->
        <div class="d-flex justify-content-center mt-4">
          <button class="btn btn-outline-secondary me-2" v-if="orderList.prev" @click="handleClickPage(orderList.prevPage)">이전</button>
          <button v-for="page in orderList.pageNumList" :key="page" class="btn" :class="{ 'btn-primary': page === currentPage, 'btn-outline-secondary': page !== currentPage }" @click="handleClickPage(page)">
            {{ page }}
          </button>
          <button class="btn btn-outline-secondary ms-2" v-if="orderList.next" @click="handleClickPage(orderList.nextPage)">다음</button>
        </div>
      </div>
      <div v-else>
        <p>주문 목록이 없습니다.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
import { getInProgressOrders } from '../../apis/orderApi';

const route = useRoute();
const router = useRouter();

const orderList = ref({
  dtoList: [],
  pageNumList: [],
  prev: false,
  next: false,
  prevPage: 0,
  nextPage: 0,
  totalCount: 0,
  totalPage: 1,
  current: 1,
});

const searchType = ref(route.query.searchType || "orderNumber");
const keyword = ref(route.query.keyword || "");
const currentPage = ref(parseInt(route.query.page) || 1);

// 주문 목록을 가져오는 함수
const fetchOrders = async (page) => {
  try {
    const response = await getInProgressOrders(page, 10, searchType.value, keyword.value);
    orderList.value = response.data;
    currentPage.value = page;
  } catch (error) {
    console.error('Error fetching order list:', error);
  }
};

// 검색 버튼 클릭 시
const handleSearch = () => {
  router.push({path: route.path, query: {page: 1, searchType: searchType.value, keyword: keyword.value}});
  fetchOrders(1);
};

// 페이지네이션 버튼 클릭 시
const handleClickPage = (pageNum) => {
  router.push({path: route.path, query: {page: pageNum, searchType: searchType.value, keyword: keyword.value}});
  fetchOrders(pageNum);
};

// 컴포넌트가 마운트될 때 목록 불러오기
onMounted(() => {
  fetchOrders(currentPage.value);
});

// 라우트 변경 시 목록 다시 불러오기
onBeforeRouteUpdate((to, from, next) => {
  searchType.value = to.query.searchType || '';
  keyword.value = to.query.keyword || '';
  currentPage.value = parseInt(to.query.page) || 1;
  fetchOrders(currentPage.value);
  next();
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
