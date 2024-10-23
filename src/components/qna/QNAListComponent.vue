<template>
  <!-- 리스트 -->
  <div>
    <table>
      <thead>
        <tr>
          <th>질문</th>
          <th>글쓴이</th>
          <th>답변 여부</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="qna in qnaList.dtoList" :key="qna.qno">
          <td>{{ qna.qno }}</td>
          <td><RouterLink :to="`/qna/${qna.qno}`">{{ qna.title }}</RouterLink></td>
          <td>{{ qna.writer }}</td>
          <td v-if="qna.answered">답변 완료</td>
          <td v-if="!qna.answered">답변 미완료</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!--  페이지네이션  -->
  <div>
    <button v-if="qnaList.prev" @click="handleClickPage(qnaList.prevPage)">이전</button>
    <button v-for="page in qnaList.pageNumList" :key="page"
            @click="handleClickPage(page)"
    >
      {{ page }}
    </button>
    <button v-if="qnaList.next" @click="handleClickPage(qnaList.nextPage)">다음</button>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {getQNAList} from "../../apis/qnaApi.js";
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();

// 로딩
const loading = ref(false);
const refresh = ref(false);

const selectedPage = ref(1);

const qnaList = ref({
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: {
    page: 0,
    size: 10,
  },
});

// 데이터 가져옴
const fetchQNAList  = async (page) => {
  loading.value = true;
  const data = await getQNAList(page);
  qnaList.value = data;
  loading.value = false;
};

// 페이지네이션 클릭 시 이벤트
const handleClickPage = (pageNum) => {
  selectedPage.value = pageNum;
  router.push({ query: { page: pageNum } });
};

onMounted(() => {
  fetchQNAList(route.query.page || 1);
});

watch(refresh, () => {
  fetchQNAList(route.query.page || 1);
});

onBeforeRouteUpdate((to, from, next) => {
  fetchQNAList(to.query.page || 1);
  next();
});
</script>

<style scoped>

</style>