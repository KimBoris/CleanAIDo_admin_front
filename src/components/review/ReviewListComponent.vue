<template>
  <div>
    <div class="d-sm-flex align-items-center justify-content-between border-bottom mb-4">
      <div class="ms-auto">
        <Share/>
      </div>
    </div>

    <div>
      <div v-if="isLoading" class="flex items-center justify-center h-screen">
        <LoadingComponent/>
      </div>
      <div v-else>
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">리뷰 리스트</h4>

            <!-- 검색 필터 -->
            <div class="form-group d-flex justify-content-end">
              <div class="input-group w-auto">
                <select style="height: 36px;" v-model="searchParams.type">
                  <option value="" disabled>------</option>
                  <option value="customerId">아이디</option>
                  <option value="customerName">이름</option>
                </select>
                <input
                    type="text"
                    v-model="searchParams.keyword"
                    placeholder="검색어를 입력하세요"
                />
                <button
                    @click="handleSearch"
                    class="btn btn-primary text-light px-2 py-1"
                    type="button"
                    style="height: 36px;"
                >
                  <i class="fa fa-search"></i>
                </button>
              </div>
            </div>

            <!-- 테이블 -->
            <div class="table-responsive mt-3">
              <table class="table table-hover">
                <thead>
                <tr>
                  <th>리뷰 번호</th>
                  <th>리뷰 내용</th>
                  <th>작성일</th>
                  <th>평점</th>
                  <th>고객 ID</th>
                  <th>고객명</th>
                  <th>상품명</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="review in reviewList.dtoList" :key="review.reviewNumber">
                  <td>{{ review.reviewNumber }}</td>
                  <td>{{ review.reviewContent }}</td>
                  <td>{{ review.createDate }}</td>
                  <td>{{ review.score }}</td>
                  <td>{{ review.customerId }}</td>
                  <td>{{ review.customerName }}</td>
                  <td>{{ review.productName }}</td>
                </tr>
                </tbody>
              </table>
            </div>

            <!-- 페이징 -->
            <div class="d-flex justify-content-center mt-5">
              <div class="btn-group">
                <button
                    type="button"
                    class="btn btn-outline-secondary"
                    v-if="reviewList.prev"
                    @click="handleClickPage(reviewList.prevPage)"
                >
                  이전
                </button>
                <button
                    type="button"
                    class="btn btn-outline-secondary"
                    v-for="page in reviewList.pageNumList"
                    :key="page"
                    @click="handleClickPage(page)"
                >
                  {{ page }}
                </button>
                <button
                    type="button"
                    class="btn btn-outline-secondary"
                    v-if="reviewList.next"
                    @click="handleClickPage(reviewList.nextPage)"
                >
                  다음
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, computed} from "vue";
import {useAuthStore} from "../../stores/useAuthStore";
import {getReviewList} from "../../apis/reviewApi.js";
import {useRoute, useRouter} from "vue-router";
import Share from "../../layout/Share.vue";
import LoadingComponent from "../common/LoadingComponent.vue";

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();
const role = computed(() => authStore.role);

const reviewList = ref({
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: {
    page: 0,
    size: 10,
  },
});

const searchParams = ref({
  type: route.query.type || '',
  keyword: route.query.keyword || '',
});

const isLoading = ref(true);

const fetchReviewList = async (page, type = '', keyword = '') => {
  isLoading.value = true;
  const data = await getReviewList(page, 10, type, keyword);

  data.dtoList.forEach(review => {
    if (review.createDate) review.createDate = new Date(review.createDate).toLocaleString();
    if (review.updateDate) review.updateDate = new Date(review.updateDate).toLocaleString();
  });

  reviewList.value = data;
  isLoading.value = false;
};

const handleClickPage = (pageNum) => {
  router.push({
    query: {page: pageNum, type: searchParams.value.type, keyword: searchParams.value.keyword},
  });
  fetchReviewList(pageNum, searchParams.value.type, searchParams.value.keyword);
};

const handleSearch = () => {
  router.push({
    path: "/review/list",
    query: {page: 1, type: searchParams.value.type, keyword: searchParams.value.keyword},
  });
  fetchReviewList(1, searchParams.value.type, searchParams.value.keyword);
};

onMounted(() => {
  fetchReviewList(route.query.page || 1, searchParams.value.type, searchParams.value.keyword);
});
</script>

<style scoped>
textarea {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}

td {
  padding: 1em;
}

button {
  margin: 0 !important;
}

.review-info p {
  font-size: 1rem;
  color: #555;
  margin-top: 25px;
  margin-bottom: 20px;
}

.review-info strong {
  color: #222;
}

.review-edit textarea {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
}

.review-edit button {
  background-color: #007bff;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
