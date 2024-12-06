<template>
  <!-- 탭 메뉴 -->
  <div class="d-sm-flex align-items-center justify-content-between border-bottom mb-4">
    <div class="ms-auto">
      <Share/>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">판매자 입점요청</h4>

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
              <th style="width: 5%;">판매자 ID</th>
              <th style="width: 10%;">스토어명</th>
              <th style="width: 5%;">사업자유형</th>
              <th style="width: 5%;">대표자명</th>
              <th style="width: 5%;">상호명</th>
              <th style="width: 10%;">가입일</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="userRequest in userRequestList.dtoList" :key="userRequest.userId" class="pe-auto">
                <td class="cursor-pointer text-primary" @click="goToReadPage(userRequest.userId)">
                  <i class="fa fa-user-o"></i>
                  {{ userRequest.userId }}</td>
                <td>{{ userRequest.storeName }}</td>
                <td v-if="userRequest.businessType === '47925'">개인</td>
                <td v-else>법인</td>
                <td>{{ userRequest.ownerName }}</td>
                <td>{{ userRequest.businessName }}</td>
                <td>{{ userRequest.createDate }}</td>
              </tr>
            </tbody>
          </table>
          <!-- 페이지네이션 -->
          <div class="d-flex justify-content-center mt-5">
            <div class="btn-group" role="group" aria-label="Basic example">
              <button
                  type="button"
                  class="btn btn-outline-secondary py-3 px-3"
                  v-if="userRequestList.prev" @click="handleClickPage(userRequestList.prevPage)"
              >이전
              </button>
              <button
                  type="button"
                  class="btn btn-outline-secondary py-3 px-3"
                  v-for="page in userRequestList.pageNumList" :key="page" @click="handleClickPage(page)"
              >{{ page }}
              </button>
              <button
                  type="button"
                  class="btn btn-outline-secondary py-3 px-3"
                  v-if="userRequestList.next" @click="handleClickPage(userRequestList.nextPage)"
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
  import {getUserRequestList} from "../../apis/userApi.js";
  import Share from "../../layout/Share.vue";
  import LoadingComponent from "../common/LoadingComponent.vue";
  import {useRoute, useRouter} from "vue-router";
  import user from "../../routers/user.js";

  const isLoading = ref(false);
  const route = useRoute();
  const router = useRouter();

  const userRequestList = ref({
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
    totalPage: 0,
    current: 1
  });

  // 데이터 호출 함수
  const fetchUserRequestList = async (page) => {
    isLoading.value = true;
    const data = await getUserRequestList(page, 10);
    console.log(data);
    userRequestList.value = data;
    isLoading.value = false;
  }

  // 페이지네이션 클릭 시 이벤트 처리
  const handleClickPage = (pageNum) => {
    router.push({query: {page: pageNum}});
    fetchUserRequestList(pageNum, );
  };

  // userId 클릭 시 read로 이동
  const goToReadPage = (userId) => {
    router.push({path: `/user/request/${userId}`});
  }

  // 페이지가 마운팅될 때 데이터 호출
  onMounted(() => {
    fetchUserRequestList(route.query.page || 1)
  })

</script>

<style scoped>

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