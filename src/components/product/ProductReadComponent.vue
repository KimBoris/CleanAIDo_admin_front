<template>
  <div class="container mt-4">
    <div class="card p-4 shadow">
      <h2 class="text-center mb-4">상품 수정</h2>

      <!-- 등록된 카테고리 목록 -->
      <div class="mb-4">
        <label class="input-group-text w-25" for="category">카테고리</label>
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
          <input class="form-control w-25" type="text" v-model="searchData.keyword" placeholder="카테고리를 검색하세요" />
          <button class="btn btn-primary" @click="handleSearch">검색</button>
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

      <!-- 상품 정보 -->
      <div class="input-group mb-3">
        <label class="input-group-text w-25" for="pname">상품명</label>
        <input type="text" id="pname" class="form-control" v-model="editData.pname" placeholder="상품명을 입력하세요">
      </div>
      <div class="input-group mb-3">
        <label class="input-group-text w-25" for="price">판매가</label>
        <input type="text" id="price" class="form-control" v-model="editData.price" placeholder="판매가를 입력하세요">
      </div>
      <div class="input-group mb-3">
        <label class="input-group-text w-25" for="pcode">자사품번</label>
        <input type="text" id="pcode" class="form-control" v-model="editData.pcode" placeholder="자사품번을 입력하세요">
      </div>
      <div class="input-group mb-3">
        <label class="input-group-text w-25" for="quantity">수량</label>
        <input type="number" id="quantity" class="form-control" v-model="editData.quantity" placeholder="수량을 입력하세요">
      </div>
      <div class="input-group mb-3">
        <label class="input-group-text w-25" for="ptags">태그</label>
        <input type="text" id="ptags" class="form-control" v-model="editData.ptags" placeholder="태그를 입력하세요">
      </div>
      <div class="mb-3">
        <h5>상태 선택</h5>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" id="selling" value="selling" v-model="editData.pstatus">
          <label class="form-check-label" for="selling">판매중</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" id="soon" value="soon" v-model="editData.pstatus">
          <label class="form-check-label" for="soon">출시예정</label>
        </div>
      </div>
      <div class="input-group mb-3" v-if="editData.pstatus === 'soon'">
        <label class="input-group-text w-25" for="releasedAt">출시예정일</label>
        <input type="datetime-local" id="releasedAt" class="form-control" v-model="editData.releasedAt">
      </div>

      <!-- 이미지 수정 및 업로드 -->
      <div class="mb-4">
        <label class="input-group-text w-25" for="imageFiles">이미지 수정</label>
        <input type="file" id="imageFiles" class="form-control" multiple @change="handleImageUpload('imageFiles', $event)">
        <div v-if="editData.imageFiles && editData.imageFiles.length > 0" class="mt-2">
          <div v-for="(image, index) in editData.imageFiles" :key="index" class="d-inline-block me-2">
            <img :src="image" alt="이미지 미리보기" width="100" height="100" class="border rounded">
          </div>
        </div>
      </div>

      <div class="mb-4">
        <label class="input-group-text w-25" for="detailImageFiles">상세 이미지 수정</label>
        <input type="file" id="detailImageFiles" class="form-control" multiple @change="handleImageUpload('detailImageFiles', $event)">
        <div v-if="editData.detailImageFiles && editData.detailImageFiles.length > 0" class="mt-2">
          <div v-for="(image, index) in editData.detailImageFiles" :key="index" class="d-inline-block me-2">
            <img :src="image" alt="상세 이미지 미리보기" width="100" height="100" class="border rounded">
          </div>
        </div>
      </div>

      <div class="mb-4">
        <label class="input-group-text w-25" for="usageImageFiles">사용 이미지 수정</label>
        <input type="file" id="usageImageFiles" class="form-control" multiple @change="handleImageUpload('usageImageFiles', $event)">
        <div v-if="editData.usageImageFiles && editData.usageImageFiles.length > 0" class="mt-2">
          <div v-for="(image, index) in editData.usageImageFiles" :key="index" class="d-inline-block me-2">
            <img :src="image" alt="사용 이미지 미리보기" width="100" height="100" class="border rounded">
          </div>
        </div>
      </div>

      <!-- 수정 버튼 -->
      <button class="btn btn-primary w-100 mt-3" type="button" @click="handleClickUpdate">수정하기</button>
      <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getProductById, updateProduct, getCategoryList } from "../../apis/productApi.js";

const router = useRouter();
const route = useRoute();
const error = ref(null);
const pno = route.params.pno

const editData = ref({
  pname: '',
  price: '',
  pcode: '',
  quantity: '',
  pstatus: '판매중',
  releasedAt: '',
  ptags: '',
  imageFiles: [],
  detailImageFiles: [],
  usageImageFiles: []
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

// 상품 데이터 불러오기
const fetchProductData = async () => {
  console.log(pno)
  const product = await getProductById(pno);

  editData.value = {
    pname: product.pname,
    price: product.price,
    pcode: product.pcode,
    quantity: product.quantity,
    pstatus: product.pstatus,
    releasedAt: product.releasedAt,
    ptags: product.tags,
    imageFiles: product.imageFiles || [],
    detailImageFiles: product.detailImageFiles || [],
    usageImageFiles: product.usageImageFiles || []
  };

  categoryData.value.categoryList = product.categories || [];
};

// 카테고리 데이터 가져오기
const fetchCateGoryList = async (keyword = '') => {
  categoryList.value.dtoList = await getCategoryList(keyword);
};

const handleSearch = () => {
  fetchCateGoryList(searchData.value.keyword);
};

const handleRegistCategory = (category) => {
  const exists = categoryData.value.categoryList.some((item) => item.cno === category.cno);
  if (!exists) {
    categoryData.value.categoryList.push(category);
  }
};

const handleRemoveCategory = (index) => {
  categoryData.value.categoryList.splice(index, 1);
};

const handleImageUpload = (field, event) => {
  const files = event.target.files;
  const images = [];
  for (let i = 0; i < files.length; i++) {
    images.push(URL.createObjectURL(files[i]));
  }
  editData.value[field] = images; // 지정된 필드에 이미지 URL 업데이트
};

const handleClickUpdate = async () => {
  const formData = new FormData();
  formData.append('pname', editData.value.pname);
  formData.append('price', editData.value.price);
  formData.append('pcode', editData.value.pcode);
  formData.append('quantity', editData.value.quantity);
  formData.append('pstatus', editData.value.pstatus);
  formData.append('releasedAt', editData.value.releasedAt);
  formData.append('ptags', editData.value.ptags);

  categoryData.value.categoryList.forEach(category => formData.append('categoryList', category.cno));

  // 이미지 처리
  editData.value.imageFiles.forEach((image) => formData.append('imageFiles', image));
  editData.value.detailImageFiles.forEach((image) => formData.append('detailImageFiles', image));
  editData.value.usageImageFiles.forEach((image) => formData.append('usageImageFiles', image));

  try {
    await updateProduct(route.params.pno, formData);
    router.replace('/product/list');
  } catch (err) {
    error.value = err.response.data.message;
  }
};

onMounted(() => {
  fetchProductData();
  fetchCateGoryList();
});
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
