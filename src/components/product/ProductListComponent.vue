<template>
  <!-- 탭 메뉴 -->
  <div class="d-sm-flex align-items-center justify-content-between border-bottom mb-4">
    <div class="ms-auto">
      <Share/>
    </div>
  </div>
  <div>
    <!--로딩창-->
    <div v-if="isLoading" class="flex items-center justify-center h-screen">
      <LoadingComponent></LoadingComponent>
    </div>
    <div v-else>
      <!-- 리스트 -->
      <div class="card">
        <div class="card-body">
          <h4 class="card-title"></h4>
          <p class="card-description"></p>
          <div class="form-group d-flex justify-content-end">
            <!-- 검색창 -->
            <div class="input-group w-auto">
              <select style="height: 36px;" v-model="selectedOption">
                <option value="" disabled>------</option>
                <option value="pcode">코드</option>
                <option value="pname">제품명</option>
              </select>
              <input type="text" v-model="keyword" placeholder="검색어를 입력하세요"/>
              <button @click="handleSearch" class="btn btn-primary text-light px-2 py-1" type="button" style="height: 36px;">
                <i class="fa fa-search"></i>
              </button>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
              <tr>
                <th style="width: 10%;">품번</th>
                <th style="width: 10%;">제품명</th>
                <th style="width: 10%;">가격</th>
                <th style="width: 10%;">수량</th>
                <th style="width: 10%;">판매상태</th>
                <th style="width: 40%;">등록일/수정일</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="product in productList.dtoList" :key="product.pno" class="pe-auto">
                <td class="cursor-pointer">{{ product.pcode }}</td>
                <td>{{ product.pname }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.quantity }}</td>
                <td>{{product.pstatus}}</td>
                <td>
                  {{product.createdAt}}
                  /
                  {{product.updatedAt}}
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
                    v-if="productList.prev" @click="handleClickPage(productList.prevPage)"
                >이전
                </button>
                <button
                    type="button"
                    class="btn btn-outline-secondary py-3 px-3"
                    v-for="page in productList.pageNumList" :key="page" @click="handleClickPage(page)"
                >{{ page }}
                </button>
                <button
                    type="button"
                    class="btn btn-outline-secondary py-3 px-3"
                    v-if="productList.next" @click="handleClickPage(productList.nextPage)"
                >다음
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
import {ref, onMounted} from 'vue';
import {getProductList} from '../../apis/productApi.js';
import {useRoute, useRouter} from 'vue-router';
import Share from "../../layout/Share.vue";
import LoadingComponent from "../common/LoadingComponent.vue";

const route = useRoute();
const router = useRouter();

// 리스트 데이터 관리
const productList = ref({
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: {
    page: 0,
    size: 10,
  },
});

const selectedOption = ref('');
const keyword = ref('');
const isLoading = ref(true);

const searchData = ref({
  type: '',
  keyword: ''
});

// 페이지 데이터 가져오기
const fetchProductList = async (page, type = '', keyword = '') => {
  isLoading.value = true; // 로딩 시작
  const data = await getProductList(page || 1, 10, type, keyword);
  productList.value = data;
  isLoading.value = false;
};

// 페이지네이션 클릭 시 이벤트 처리
const handleClickPage = (pageNum) => {
  router.push({query: {page: pageNum, type: searchData.value.type, keyword: searchData.value.keyword}});
  fetchProductList(pageNum, searchData.value.type, searchData.value.keyword);
};

// 컴포넌트가 마운트될 때 리스트 가져오기
onMounted(() => {
  searchData.value.type = route.query.type || '';
  searchData.value.keyword = route.query.keyword || '';
  fetchProductList(route.query.page || 1, searchData.value.type, searchData.value.keyword);
});

const handleSearch = () => {
  searchData.value.type = selectedOption.value;
  searchData.value.keyword = keyword.value;
  router.push({
    path: '/product/list',
    query: {page: 1, type: searchData.value.type, keyword: searchData.value.keyword}
  });
  fetchProductList(1, searchData.value.type, searchData.value.keyword);
};
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

.product-info {

  margin-bottom: 20px;
}

.product-info p {
  font-size: 1rem;
  color: #555;
  margin-top: 25px;
  margin-bottom: 20px;
}


.product-info strong {
  color: #222;
}

.product-contents {
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 4px;
  white-space: pre-wrap;
  color: #333;
  margin-top: 8px;
}

.product-edit {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.product-edit textarea {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
}

.product-edit button {
  background-color: #007bff;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

</style>