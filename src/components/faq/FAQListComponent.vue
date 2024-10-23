<template>
  <div class="faq-list">
    <table>
      <!-- 테이블 헤더 -->
      <thead>
      <tr>
        <th>번호</th>
        <th>질문</th>
      </tr>
      </thead>
      <!-- 테이블 바디 (FAQ 리스트 출력) -->
      <tbody>
      <tr v-for="faq in faqList.dtoList" :key="faq.fno">
        <td>{{ faq.fno }}</td>
        <td>
          <RouterLink :to="`/faq/read/${faq.fno}`">
            {{ faq.question }}
          </RouterLink>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

    <!-- 페이지네이션 영역과 작성 버튼 -->
    <div class="pagination-container d-flex justify-content-center align-items-center" style="height: 200px;">
      <ul class="pagination">
        <!-- 이전 버튼 -->
        <li v-if="faqList.prev" class="page-item">
          <a class="page-link" @click="handleClickPage(faqList.prevPage)">Prev</a>
        </li>
        <!-- 페이지 번호 리스트 -->
        <li :class="`page-item ${page == faqList.current ? 'active' : ''}`" v-for="page in faqList.pageNumList" :key="page">
          <a class="page-link" @click="handleClickPage(page)">{{ page }}</a>
        </li>
        <!-- 다음 버튼 -->
        <li v-if="faqList.next" class="page-item">
          <a class="page-link" @click="handleClickPage(faqList.nextPage)">Next</a>
        </li>
      </ul>
      <!-- 작성 버튼 -->
      <button @click="goToRegister" class="register-btn">작성</button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getFAQList } from '../../apis/faqApi';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';

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

// FAQ 작성 페이지로 이동하는 함수
const goToRegister = () => {
  router.push('/faq/register');
};

// FAQ 리스트 데이터를 가져오는 함수
const fetchFAQs = async (page) => {
  const data = await getFAQList(page);
  console.log("Fetched FAQ List:", data);
  faqList.value = data;
};

// 페이지 클릭 시 호출되는 함수
const handleClickPage = (pageNum) => {
  const currentQueryPage = parseInt(route.query.page || 1);
  if (currentQueryPage === pageNum) {
    fetchFAQs(pageNum); // 같은 페이지 클릭 시 데이터 다시 로드
  } else {
    router.push({ path: '/faq/list', query: { page: pageNum } }); // 다른 페이지 클릭 시 라우터 변경
  }
};

// 컴포넌트가 마운트되었을 때 FAQ 리스트를 가져옴
onMounted(() => {
  const page = route.query.page || 1;
  fetchFAQs(page);
});

// 라우트 변경 시 FAQ 리스트를 다시 로드
onBeforeRouteUpdate(async (to, from, next) => {
  await fetchFAQs(to.query.page);
  next();
});
</script>

<style scoped>

table {
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
/* 페이지네이션 중앙 정렬 */
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}

.pagination {
  display: flex;
  list-style: none;
  padding: 0;
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
</style>
