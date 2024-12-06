<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">주문 내역</h4>

      <!-- 검색창 -->
      <div class="form-group d-flex justify-content-end">
        <select v-model="searchType" class="form-select me-2" style="width: 13rem;">
          <option value="orderNumber">주문 번호</option>
          <option value="productNumber">상품 번호</option>
          <option value="customerId">고객 ID</option>
          <option value="phoneNumber">전화 번호</option>
          <option value="trackingNumber">송장 번호</option>
        </select>
        <input v-model="keyword" type="text" class="form-control me-2" style="width: 20rem;" placeholder="검색어 입력" />
        <button @click="handleSearch" class="btn-primary text-white border-0 rounded-1 px-3">검색</button>
      </div>

      <!-- 로딩 -->
      <div v-if="isLoading" class="flex items-center justify-center h-screen">
        <LoadingComponent></LoadingComponent>
      </div>

      <!-- 주문 목록 테이블 -->
      <div v-else-if="!isLoading">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>주문 번호</th>
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
                <td class="cursor-pointer text-primary" @click="goToDetailPage(order.orderNumber)">
                  <i class="fa fa-shopping-cart me-2"></i>
                  {{ order.orderNumber }}
                </td>
                <td>{{ order.customerId }}</td>
                <td>{{ order.phoneNumber }}</td>
                <td>{{ order.deliveryAddress }}</td>
                <td>{{ order.totalPrice }}</td>
                <td>{{ new Date(order.orderDate).toLocaleString() }}</td>
                <td>
                  <!-- trackingNumber가 있을 경우 값을 출력 -->
                  <span v-if="order.trackingNumber">{{ order.trackingNumber }}</span>
                  <!-- trackingNumber가 없을 경우 input -->
                  <div v-else class="d-flex">
                    <input
                        class="form-control py-0 h-auto me-1"
                        placeholder="송장번호 입력"
                        v-model="trackingNumbers[order.orderNumber]"
                    />
                    <button class="btn-light px-1 py-2 border-0 rounded-1"
                            @click="handleClickSend"
                            :data-order-number="order.orderNumber">
                      단일 발송
                    </button>
                  </div>
                </td>
                <td>{{ order.orderStatus }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 페이지네이션 -->
        <div class="d-flex justify-content-center mt-5">
          <div class="btn-group" role="group" aria-label="Basic example">
            <button
                type="button"
                class="btn btn-outline-secondary py-3 px-3"
                v-if="orderList.prev" @click="handleClickPage(orderList.prevPage)"
            >이전
            </button>
            <button
                type="button"
                class="btn btn-outline-secondary py-3 px-3"
                v-for="page in orderList.pageNumList" :key="page" @click="handleClickPage(page)"
            >{{ page }}
            </button>
            <button
                type="button"
                class="btn btn-outline-secondary py-3 px-3"
                v-if="orderList.next" @click="handleClickPage(orderList.nextPage)"
            >다음
            </button>
          </div>
        </div>
        <!-- //페이지네이션 -->
        <div class="d-flex justify-content-end mt-3">
          <button class="btn-primary py-2 px-4 text-white border-0 rounded-1" @click="handleClickAllSend">일괄 발송</button>
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
  import {getInProgressOrders, putOrserDelivery} from '../../apis/orderApi';
  import LoadingComponent from "../common/LoadingComponent.vue";

  const isLoading = ref(false);
  const route = useRoute();
  const router = useRouter();

  const trackingNumbers = ref({});

  const orderList = ref({
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: {
      page: 0,
      size: 10,
    },
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
      isLoading.value = true;
      const response = await getInProgressOrders(page, 10, searchType.value, keyword.value);
      orderList.value = response.data;
      currentPage.value = page;
      isLoading.value = false;
    } catch (error) {
      console.error('Error fetching order list:', error);
    }
  };

  // 검색 버튼 클릭 시
  const handleSearch = () => {
    router.push({path: route.path, query: {page: 1, type: searchType.value, keyword: keyword.value}});
    fetchOrders(1);
  };

  // 페이지네이션 버튼 클릭 시
  const handleClickPage = (pageNum) => {
    router.push({path: route.path, query: {page: pageNum, type: searchType.value, keyword: keyword.value}});
    fetchOrders(pageNum);
  };

  // 컴포넌트가 마운트될 때 목록 불러오기
  onMounted(() => {
    fetchOrders(currentPage.value);
  });

  // 주문번호 클릭 시 detail로 이동
  const goToDetailPage = (orderNumber) => {
    router.push({path: `/order/detail/${orderNumber}`});
  }

  const handleClickAllSend = async () => {
    const result = Object.entries(trackingNumbers.value)
        .filter(([_, value]) => value) // 값이 비어있지 않은 것만 필터링
        .map(([orderNumber, trackingNumber]) => ({
          orderNumber,
          trackingNumber,
        }));
    console.log(result);
    await putOrserDelivery(result).then((res) => {
      console.log(res);
    });
  }

  const handleClickSend = async (e) => {
    const orderNum = e.currentTarget.dataset.orderNumber;
    console.log(orderNum);
    const trackingNumber = trackingNumbers.value[orderNum];
    console.log(trackingNumber);
    const result = [
      {
        orderNumber: orderNum,
        trackingNumber: trackingNumber,
      },
    ];
    await putOrserDelivery(result).then((res) => {
      console.log(res);
    });
  }

  // 라우트 변경 시 목록 다시 불러오기
  onBeforeRouteUpdate((to, from, next) => {
    searchType.value = to.query.type || '';
    keyword.value = to.query.keyword || '';
    currentPage.value = parseInt(to.query.page) || 1;
    fetchOrders(currentPage.value);
    next();
  });


</script>

<style scoped>

.table-responsive {
  overflow-x: auto;
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
}

.page-item {
margin-right: 10px;
}

.page-item a {
  text-decoration: none;
  color: #007bff;
  cursor: pointer;
}

.page-item.active a {
  font-weight: bold;
  color: #000;
}

td {
  padding: 1em;
}

button {
  margin: 0 !important;
}

.cursor-pointer {
  cursor: pointer !important;
}
</style>
