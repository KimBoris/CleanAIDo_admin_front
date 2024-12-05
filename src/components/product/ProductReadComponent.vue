<template>
  <div class="container mt-4">
    <div class="card p-4 shadow">
      <h2 class="text-center mb-4">상품 수정</h2>
      <div class="mb-4">
        <label class="input-group-text w-25" for="category">카테고리</label>
        <br/>
        <!-- 등록된 카테고리 -->
        <div v-if="selectedCategory.category" class="d-flex justify-content-between align-items-center m-1 p-1 border rounded">
          <div class="text-truncate">{{ selectedCategory.category.parentName }} / {{ selectedCategory.category.cname }}</div>
          <button class="btn btn-danger btn-sm" @click="handleRemoveCategory" style="font-size: 0.7rem; padding: 0.25rem 0.5rem;">X</button>
        </div>
        <div v-else class="text-muted">카테고리를 선택하세요</div>

        <!-- 검색 기능 -->
        <div class="input-group mb-3">
          <input class="form-control w-25" type="text" id="keyword" v-model="searchData.keyword" placeholder="카테고리를 검색하세요" />
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
        <label class="input-group-text w-25" for="ptags">사용처</label>
        <input type="text" id="ptags" class="form-control" v-model="editData.puseCase" placeholder="사용처를 입력하세요">
      </div>
      <div class="input-group mb-3">
        <label class="input-group-text w-25" for="ptags">사용물품</label>
        <input type="text" id="ptags" class="form-control" v-model="editData.pusedItem" placeholder="사용물품 입력하세요">
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
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" id="stop" value="stop" v-model="editData.pstatus">
          <label class="form-check-label" for="soon">판매중지</label>
        </div>
      </div>
      <div class="input-group mb-3" v-if="editData.pstatus === 'soon'">
        <label class="input-group-text w-25" for="releasedAt">출시예정일</label>
        <input type="datetime-local" id="releasedAt" class="form-control" v-model="editData.releasedAt">
      </div>

      <!-- 기존 이미지 삭제 -->
      <div class="mb-4">
        <label class="input-group-text w-25" for="imageFiles">이미지 수정</label>
        <input type="file" id="imageFiles" class="form-control" multiple @change="handleImageUpload('imageFiles', $event)">
        <div v-if="oldFiles.imageFiles && oldFiles.imageFiles.length > 0" class="mt-2">
          <div v-for="(image, index) in oldFiles.imageFiles" :key="index" class="d-inline-block me-2">
            <img :src="'http://localhost:8080/api/v1/images/'+image" alt="이미지 미리보기" width="100" height="100" class="border rounded">
            <button @click="clickDelete('imageFiles',image)">x</button>
          </div>
        </div>
      </div>

      <div class="mb-4">
        <label class="input-group-text w-25" for="detailImageFiles">상세 이미지 수정</label>
        <input type="file" id="detailImageFiles" class="form-control" multiple @change="handleImageUpload('detailImages', $event)">
        <div v-if="oldFiles.detailImageFiles && oldFiles.detailImageFiles.length > 0" class="mt-2">
          <div v-for="(image, index) in oldFiles.detailImageFiles" :key="index" class="d-inline-block me-2">
            <img :src="'http://localhost:8080/api/v1/images/'+image" alt="상세 이미지 미리보기" width="100" height="100" class="border rounded">
            <button @click="clickDelete('detailImageFiles',image)">x</button>
          </div>
        </div>
      </div>

      <div class="mb-4">
        <label class="input-group-text w-25" for="usageImageFiles">사용 이미지 수정</label>
        <input type="file" id="usageImageFiles" class="form-control" multiple @change="handleImageUpload('usageImages', $event)">
        <div v-if="oldFiles.usageImageFiles && oldFiles.usageImageFiles.length > 0" class="mt-2">
          <div v-for="(image, index) in oldFiles.usageImageFiles" :key="index" class="d-inline-block me-2">
            <img :src="'http://localhost:8080/api/v1/images/'+image" alt="사용 이미지 미리보기" width="100" height="100" class="border rounded">
            <button @click="clickDelete('usageImageFiles',image)">x</button>
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

const selectedCategory = ref({
  category: '',
});

const searchData = ref({
  keyword: ''
});

const categoryList = ref({
  dtoList: [],
});

const oldFiles = ref({
  imageFiles: [],
  detailImageFiles: [],
  usageImageFiles: []
})

const newFiles = ref({
  imageFiles: [],
  detailImages: [],
  usageImages: []
});

// 상품 데이터 불러오기
const fetchProductData = async () => {
  try {
    console.log(pno);
    const product = await getProductById(pno);
    console.log(product);

    // editData 초기화
    editData.value = {
      pname: product.pname || '',
      price: product.price || '',
      pcode: product.pcode || '',
      quantity: product.quantity || '',
      pstatus: product.pstatus || '판매중',
      releasedAt: product.releasedAt || '',
      puseCase: product.puseCase || '',
      pusedItem: product.pusedItem || '',
      ptags: product.tags || '',
    };

    // files 초기화
    oldFiles.value = {
      imageFiles: product.imageFiles || [],
      detailImageFiles: product.detailImageFiles || [],
      usageImageFiles: product.usageImageFiles || [],
    };
    console.log(typeof(oldFiles.value.imageFiles[0]))
    selectedCategory.value.category = product.category || null;
  } catch (error) {
    console.error("Failed to fetch product data:", error);
    error.value = "상품 데이터를 불러오는 데 실패했습니다.";
  }
};

// 카테고리 데이터 가져오기
const fetchCateGoryList = async (keyword = '') => {
  categoryList.value.dtoList = await getCategoryList(keyword);
};

const handleSearch = () => {
  searchData.value.keyword = keyword.value;
  fetchCateGoryList(searchData.value.keyword);
};

// 카테고리 선택
const handleRegistCategory = (category) => {
  selectedCategory.value.category = category;
};

// 카테고리 제거
const handleRemoveCategory = () => {
  selectedCategory.value.category = null;
};

const handleImageUpload = (type, event) => {
  newFiles.value[type] = Array.from(event.target.files);
  console.log(type+"is"+newFiles.value[type])
};

const handleClickUpdate = async () => {
  const formData = new FormData();
  formData.append('pname', editData.value.pname);
  formData.append('price', editData.value.price);
  formData.append('pcode', editData.value.pcode);
  formData.append('quantity', editData.value.quantity);
  formData.append('pstatus', editData.value.pstatus);
  formData.append('releasedAt', editData.value.releasedAt);
  formData.append('puseCase', editData.value.puseCase);
  formData.append('pusedItem', editData.value.pusedItem);
  formData.append('ptags', editData.value.ptags);
  formData.append("categoryId", selectedCategory.value.category.cno);
  // 이미지 처리
  if (oldFiles.value.imageFiles.length > 0) {
    oldFiles.value.imageFiles.forEach(file => formData.append('oldImageFiles', file));
  }
  if (oldFiles.value.detailImageFiles.length > 0) {
    oldFiles.value.detailImageFiles.forEach(file => formData.append('oldDetailFiles', file));
  }
  if (oldFiles.value.usageImageFiles.length > 0) {
    oldFiles.value.usageImageFiles.forEach(file => formData.append('oldUsageFiles', file));
  }
  if (newFiles.value.imageFiles.length > 0) {
    newFiles.value.imageFiles.forEach(file => formData.append('imageFiles', file));
  } else {
    formData.append('imageFiles', new Blob([]));
  }
  if (newFiles.value.detailImages.length > 0) {
    newFiles.value.detailImages.forEach(file => formData.append('detailImageFiles', file));
  } else {
    formData.append('detailImageFiles', new Blob([]));
  }
  if (newFiles.value.usageImages.length > 0) {
    newFiles.value.usageImages.forEach(file => formData.append('usageImageFiles', file));
  } else {
    formData.append('usageImageFiles', new Blob([]));
  }

  try {
    const res = await updateProduct(formData, pno);
    console.log(res)
    router.replace('/product/list');
  } catch (err) {
    error.value = err.response.data.message;
  }
};

const clickDelete = async (type, fileName) => {
  oldFiles.value[type] = oldFiles.value[type].filter(file => file !== fileName);
  console.log(oldFiles.value[type])
}

onMounted(() => {
  fetchProductData();
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
