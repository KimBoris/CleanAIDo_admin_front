<template>
  <div class="d-sm-flex align-items-center justify-content-between border-bottom mb-4">
    <div class="ms-auto">
      <Share />
    </div>
  </div>
  <!-- 검색창 -->
  <div>
    <div v-if="isLoading" class="flex items-center justify-center h-screen">
      <!--로딩창-->
      <LoadingComponent></LoadingComponent>
    </div>
    <div v-else>
      <!--  리스트-->
      <div class="card">
        <div class="card-body">
          <h4 class="card-title"></h4>
          <p class="card-description">
          </p>
          <!-- 검색창 -->
          <div class="form-group d-flex justify-content-end">
            <div class="input-group w-auto">
              <input type="text" v-model="keyword" class="form-control px-2 py-1" placeholder="질문 검색" style="height: 36px;"/>
              <div class="input-group-append">
                <button @click="handleSearch" class="btn btn-primary text-light px-2 py-1" type="button" style="height: 36px;">
                  <i class="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
              <tr>
                <th>질문</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="faq in faqList.dtoList" :key="faq.fno" class="pe-auto">
                <td>
                  <RouterLink :to="`/faq/read/${faq.fno}`" class="text-decoration-none text-dark">
                    {{ faq.question }}
                  </RouterLink>
                </td>
              </tr>
              </tbody>
            </table>
            <!-- 페이지네이션 -->
            <div class="d-flex justify-content-center mt-5">
              <div class="btn-group" role="group" aria-label="Basic example">
                <button
                    type="button"
                    class="btn btn-outline-secondary py-3 px-3"
                    v-if="faqList.prev" @click="handleClickPage(faqList.prevPage)"
                >이전</button>
                <button
                    type="button"
                    class="btn btn-outline-secondary py-3 px-3"
                    v-for="page in faqList.pageNumList" :key="page" @click="handleClickPage(page)"
                >{{ page }}</button>
                <button
                    type="button"
                    class="btn btn-outline-secondary py-3 px-3"
                    v-if="faqList.next" @click="handleClickPage(faqList.nextPage)"
                >다음</button>
              </div>
              <button @click="goToRegister" class="btn btn-primary text-light ms-3">등록</button>
            </div>
          </div>
        </div>
      </div></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getFAQList } from '../../apis/faqApi';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
import Share from "../../layout/Share.vue";
import LoadingComponent from "../common/LoadingComponent.vue";

const faqList = ref({
  dtoList: [], // FAQ 목록 데이터
  pageNumList: [], // 페이지 번호 리스트
  prev: false, // 이전 페이지 존재 여부
  next: false, // 다음 페이지 존재 여부
  prevPage: 0, // 이전 페이지 번호
  nextPage: 0, // 다음 페이지 번호
  totalCount: 0, // 전체 항목 수
  totalPage: 0, // 전체 페이지 수
  current: 1 // 현재 페이지 번호
});

const route = useRoute();
const router = useRouter();
const keyword = ref('');
const isLoading = ref(true);

// FAQ 작성 페이지로 이동하는 함수
const goToRegister = () => {
  router.push('/faq/register');
};

// FAQ 리스트 데이터를 가져오는 함수
const fetchFAQs = async (page, keyword ='') => {
  isLoading.value = true;
  const data = await getFAQList(page,10, keyword);
  console.log("Fetched FAQ List:", data);
  faqList.value = data;
  isLoading.value = false;
};

// 페이지 클릭 시 호출되는 함수
const handleClickPage = (pageNum) => {
  const currentQueryPage = parseInt(route.query.page || 1);
  if (currentQueryPage === pageNum) {
    fetchFAQs(pageNum,keyword.value ||''); // 같은 페이지 클릭 시 데이터 다시 로드
  } else {
    router.push({ path: '/faq/list', query: { page: pageNum, keyword:keyword.value } }); // 다른 페이지 클릭 시 라우터 변경
  }
};

// 컴포넌트가 마운트되었을 때 FAQ 리스트를 가져옴
onMounted(() => {
  const page = route.query.page || 1;
  keyword.value = route.query.keyword || '';
  fetchFAQs(page, keyword.value);
});

// 라우트 변경 시 FAQ 리스트를 다시 로드
onBeforeRouteUpdate(async (to, from, next) => {
  keyword.value = to.query.keyword || '';
  await fetchFAQs(to.query.page || 1, keyword.value);
  next();
});

const handleSearch = () => {
  router.push({ path: '/faq/list', query: { page: 1, keyword: keyword.value } });
};
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

/* 작성 버튼 스타일 */
.register-btn {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.register-btn:hover {
  background-color: #0056b3;
}

td {
  padding: 1em;
}

button {
  margin: 0 !important;
}
</style>