<template>
  <!-- 탭 메뉴 -->
  <div class="d-sm-flex align-items-center justify-content-between border-bottom mb-4">
    <div class="ms-auto">
      <Share/>
    </div>
  </div>

  <div class="card">
    <div class="card-body">
      <h4 class="card-title">주문 상세 조회</h4>
      <!-- 로딩 -->
      <div v-if="isLoading" class="flex items-center justify-center h-screen">
        <LoadingComponent></LoadingComponent>
      </div>

      <!-- 리스트 -->
      <div v-else>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th style="width: 20%;">자사품번</th>
                <th style="width: 25%;">상품명</th>
                <th style="width: 20%;">판매가</th>
                <th style="width: 15%;">수량</th>
                <th style="width: 20%;">판매금액</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orderDetailList.dtoList" :key="order.pcode">
                <td>{{order.pcode}}</td>
                <td>{{order.pname}}</td>
                <td>{{order.price}}</td>
                <td>{{order.quantity}}</td>
                <td>{{order.price * order.quantity}}</td>
              </tr>
            </tbody>
          </table>
          <!-- 페이지네이션 -->
          <div class="d-flex justify-content-center mt-5">
            <div class="btn-group" role="group" aria-label="Basic example">
              <button
                  type="button"
                  class="btn btn-outline-secondary py-3 px-3"
                  v-if="orderDetailList.prev" @click="handleClickPage(orderDetailList.prevPage)"
              >이전
              </button>
              <button
                  type="button"
                  class="btn btn-outline-secondary py-3 px-3"
                  v-for="page in orderDetailList.pageNumList" :key="page" @click="handleClickPage(page)"
              >{{ page }}
              </button>
              <button
                  type="button"
                  class="btn btn-outline-secondary py-3 px-3"
                  v-if="orderDetailList.next" @click="handleClickPage(orderDetailList.nextPage)"
              >다음
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {getOrderDetailList} from "../../apis/orderApi.js";
import Share from "../../layout/Share.vue";
import LoadingComponent from "../common/LoadingComponent.vue";

const isLoading = ref(false);
const route = useRoute();
const router = useRouter();

const orderNumber = route.params.orderNum;

const orderDetailList = ref({
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
})

const fetchOrderDetailList = async (page, size, orderNumber) => {
  isLoading.value = true;
  console.log(orderNumber)
  await getOrderDetailList(page, size, orderNumber).then((res) => {
    console.log(res);
    orderDetailList.value = res;
    isLoading.value = false;
  })
}

// 페이지네이션 클릭 시 이벤트 처리
const handleClickPage = (pageNum) => {
  router.push({query: {page: pageNum}});
  fetchOrderDetailList(pageNum, 10, orderNumber);
};

onMounted(() => {
  fetchOrderDetailList(route.query.page || 1, route.query.size || 10, orderNumber);
})


</script>

<style scoped>

</style>