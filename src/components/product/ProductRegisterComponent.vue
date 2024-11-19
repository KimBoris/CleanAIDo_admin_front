<template>
  <div class="container mt-4">
    <div class="card p-4 shadow">
      <h2 class="text-center mb-4">상품 등록</h2>
      <div class="input-group mb-4">
        <label class="input-group-text w-25" for="category">카테고리</label>
        <br />
        <!-- 등록된 카테고리 목록 -->
        <div class="d-flex align-items-center m-1 p-1 border rounded"
             style="height: auto; width: 800px; flex-wrap: wrap;">
          <div v-for="(category, index) in categoryData.categoryList" :key="category.cno"
               class="d-flex justify-content-between align-items-center m-1 p-1 border rounded"
               style="font-size: 0.6rem; height: auto; max-width: 100%;">
            <div class="text-truncate" style="max-width: 60%">{{ category.parentName }} / {{ category.cname }}</div>
            <button class="btn btn-danger btn-sm" @click="handleRemoveCategory(index)" style="font-size: 0.7rem; padding: 0.25rem 0.5rem;">X</button>
          </div>
        </div>

        <!-- 검색 기능 -->
        <div class="input-group mb-3">
          <input class="w-25 h-75 form-control" type="text" id="keyword" v-model="searchData.keyword" placeholder="상품명을 입력하세요" />
          <button class="btn btn-primary w- h-75" type="button" @click="handleSearch">검색</button>
        </div>
        <!-- 카테고리 목록 테이블 -->
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
            <tr>
              <th>상위 카테고리</th>
              <th>카테고리명</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="category in categoryList.dtoList" :key="category.cno" @click="handleRegistCategory(category)" class="cursor-pointer">
              <td>{{ category.parentName }}</td>
              <td>{{ category.cname }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="input-group mb-3">
        <label class="input-group-text w-25" for="pname">상품명</label>
        <input type="text" id="pname" class="form-control" v-model="registData.pname" placeholder="상품명을 입력하세요">
      </div>
      <div class="input-group mb-3">
        <label class="input-group-text w-25" for="price">판매가</label>
        <input type="text" id="price" class="form-control" v-model="registData.price" placeholder="판매가를 입력하세요">
      </div>
      <div class="input-group mb-3">
        <label class="input-group-text w-25" for="pcode">자사품번</label>
        <input type="text" id="pcode" class="form-control" v-model="registData.pcode" placeholder="자사품번을 입력하세요">
      </div>
      <div class="input-group mb-3">
        <label class="input-group-text w-25" for="quantity">수량</label>
        <input type="number" id="quantity" class="form-control" v-model="registData.quantity" placeholder="수량을 입력하세요">
      </div>
      <div class="input-group mb-3">
        <label class="input-group-text w-25" for="ptags">태그</label>
        <input type="text" id="ptags" class="form-control" v-model="registData.ptags" placeholder="태그를 입력하세요">
      </div>
      <div class="mb-3">
        <h5>상태 선택</h5>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" id="selling" value="selling" v-model="registData.pstatus">
          <label class="form-check-label" for="selling">판매중</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" id="soon" value="soon" v-model="registData.pstatus">
          <label class="form-check-label" for="soon">출시예정</label>
        </div>
      </div>
      <div class="input-group mb-3" v-if="registData.pstatus === 'soon'">
        <label class="input-group-text w-25" for="releasedAt">출시예정일</label>
        <input type="datetime-local" id="releasedAt" class="form-control" v-model="registData.releasedAt">
      </div>
      <div class="mb-3">
        <label for="imageFiles" class="form-label">상품 이미지</label>
        <input type="file" id="imageFiles" class="form-control" accept="image/*" @change="handleFileChange($event, 'imageFiles')" multiple>
      </div>
      <div class="mb-3">
        <label for="detailImages" class="form-label">상품 상세 이미지</label>
        <input type="file" id="detailImages" class="form-control" accept="image/*" @change="handleFileChange($event, 'detailImages')" multiple>
      </div>
      <div class="mb-3">
        <label for="usageImages" class="form-label">사용처</label>
        <input type="file" id="usageImages" class="form-control" accept="image/*" @change="handleFileChange($event, 'usageImages')" multiple>
      </div>
      <button class="btn btn-primary w-100 mt-3" type="button" @click="handleClickRegister">
        등록하기
      </button>
      <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import {getCategoryList, postProduct} from "../../apis/productApi.js";

const router = useRouter();
const error = ref(null);

const registData = ref({
  pname: '',
  price: '',
  pcode: '',
  quantity: '',
  pstatus: 'selling',
  releasedAt: '',
  ptags: ''
});

const categoryData = ref({
  categoryList: [],
});

const searchData = ref({
  keyword: ''
});

const categoryList = ref({
  dtoList: [],
});

const files = ref({
  imageFiles: [],
  detailImages: [],
  usageImages: []
});

// 페이지 데이터 가져오기
const fetchCateGoryList = async (keyword = '') => {
  categoryList.value.dtoList = await getCategoryList(keyword);
};

const handleSearch = () => {
  searchData.value.keyword = keyword.value;
  router.push({
    path: '/product/register',
    query: {keyword: searchData.value.keyword}
  });
  fetchCateGoryList(searchData.value.keyword);
};

const handleRegistCategory = (category) => {
  // 카테고리 리스트에 이미 존재하는지 확인
  const exists = categoryData.value.categoryList.some(
      (item) => item.cno === category.cno
  );

  // 중복이 아닐 때만 push
  if (!exists) {
    categoryData.value.categoryList.push(category);
    console.log("enroll clear");
  } else {
    console.log("Category already exists in the list");
  }
  console.log(categoryData.value.categoryList);
};

const handleRemoveCategory = (index) => {
  categoryData.value.categoryList.splice(index, 1);
  console.log("Category removed");
  console.log(categoryData.value.categoryList);
};


watch(() => registData.value.pstatus, (newStatus) => {
  if (newStatus === 'selling') {
    const now = new Date();
    registData.value.releasedAt = now.toISOString().slice(0, 16);
  }
});

const handleFileChange = (event, fileType) => {
  files.value[fileType] = Array.from(event.target.files);
};

const handleClickRegister = async () => {
  if (!registData.value.releasedAt) {
    const now = new Date();
    registData.value.releasedAt = now.toISOString().slice(0, 16);
  }

  const formData = new FormData();
  formData.append('pname', registData.value.pname);
  formData.append('price', registData.value.price);
  formData.append('pcode', registData.value.pcode);
  formData.append('quantity', registData.value.quantity);
  formData.append('pstatus', registData.value.pstatus);
  formData.append('releasedAt', registData.value.releasedAt);
  formData.append('ptags', registData.value.ptags);
  formData.append('sellerId', "phj");

  if (categoryData.value.categoryList.length > 0) {
    categoryData.value.categoryList.forEach(category => formData.append('categoryList', category.cno));
  } else {
    formData.append('categoryList', new Blob([]));
  }

  if (files.value.imageFiles.length > 0) {
    files.value.imageFiles.forEach(file => formData.append('imageFiles', file));
  } else {
    formData.append('imageFiles', new Blob([]));
  }

  if (files.value.detailImages.length > 0) {
    files.value.detailImages.forEach(file => formData.append('detailImageFiles', file));
  } else {
    formData.append('detailImageFiles', new Blob([]));
  }
  if (files.value.usageImages.length > 0) {
    files.value.usageImages.forEach(file => formData.append('usageImageFiles', file));
  } else {
    formData.append('usageImageFiles', new Blob([]));
  }

  try {
    await postProduct(formData);
    router.replace('/product/list');
  } catch (err) {
    error.value = err.response.data.message;
  }
};
</script>

<style scoped>
.container {
  max-width: 700px;
}
.input-group-text {
  background-color: #f8f9fa;
  font-weight: bold;
}
.card {
  border-radius: 12px;
  background-color: #ffffff;
}
h2 {
  color: #007bff;
}
.btn {
  border-radius: 8px;
}
</style>
