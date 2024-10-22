<template>
  <div class="faq-list">
    <!-- FAQ 항목 반복 렌더링 -->
    <div class="faq-item" v-for="faq in faqList" :key="faq.fno">
      <h2>
        <!-- FAQ 항목 클릭 시 Read 페이지로 이동 -->
        <RouterLink :to="`/faq/read/${faq.fno}`">{{ faq.question }}</RouterLink>
      </h2>
    </div>

    <!-- 페이지네이션 부분 -->
    <div class="d-flex justify-content-center align-items-center" style="height: 100px;">
      <ul class="pagination">
        <li :class="`page-item ${page == faqData.number + 1 ? 'active' : ''}`" v-for="{ page, label } in pageNums" :key="page">
          <a class="page-link" @click="handleClickPage(page)">{{ label }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted , ref } from 'vue';
import { getFAQList } from '../../apis/faqApi';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';

const serverData = ref({
  content: [],  // FAQ 목록을 저장할 배열
  number: 0,    // 현재 페이지 번호
  size: 0,      // 한 페이지에 표시할 항목 수
  totalPages: 0 // 전체 페이지 수
})

const router = useRouter();
const route = useRoute();

// 페이지 클릭 핸들러
const handleClickPage = (pageNum) => {
  const currentQueryPage = parseInt(route.query.page || 1);

  console.log('handleClickPage ' + pageNum + " : " + route.query.page);

  if (currentQueryPage === pageNum) {
    console.log("동일 페이지 클릭");

    // 동일한 페이지를 클릭했을 때도 데이터를 갱신
    getFAQList(pageNum).then(res => serverData.value = res);
  } else {
    console.log("다른 페이지 클릭");
    // 라우팅을 통해 페이지 번호 업데이트
    router.push({ path: '/faq/list', query: { page: pageNum } });
  }
}

// 페이지네이션 계산
const pageNums = computed(() => {
  const current = serverData.value.number + 1;

  let lastPageNum = Math.ceil(current / 10.0) * 10;
  const startPageNum = lastPageNum - 9;
  const prev = startPageNum !== 1;
  let next = true;

  if (serverData.value.totalPages <= lastPageNum) {
    lastPageNum = serverData.value.totalPages;
    next = false;
  }

  const arr = [];
  if (prev) {
    arr.push({ page: startPageNum - 1, label: "Prev" });
  }
  for (let i = startPageNum; i <= lastPageNum; i++) {
    arr.push({ page: i, label: i });
  }
  if (next) {
    arr.push({ page: lastPageNum + 1, label: "Next" });
  }
  return arr;
})

// 컴포넌트가 마운트되었을 때 FAQ 목록을 불러옴
onMounted(async () => {
  const page = route.query.page || 1;
  const result = await getFAQList(page);  // 서버에서 해당 페이지 FAQ 목록을 가져옴
  serverData.value = result;

  console.log(serverData.value);
})

// 라우터가 변경될 때마다 데이터를 갱신
onBeforeRouteUpdate(async (to, from, next) => {
  console.log('onBeforeRouteUpdate');

  const result = await getFAQList(to.query.page);
  serverData.value = result;

  next();
})

</script>

<style lang="scss" scoped>

</style>
