<template>
    <div>
<!--      <div class="input-group w-auto">-->
<!--        <h4>카테고리</h4>-->
<!--        <input type="text">-->
<!--      </div>-->
      <div class="input-group w-auto">
        <h4>상품명</h4>
        <input type="text" v-model="registData.pname">
      </div>
      <div class="input-group w-auto">
        <h4>판매가</h4>
        <input type="text" v-model="registData.price">
      </div>
      <div class="input-group w-auto">
        <h4>자사품번</h4>
        <input type="text" v-model="registData.pcode">
      </div>
      <div class="input-group w-auto">
        <h4>수량</h4>
        <input type="number" v-model="registData.quantity">
      </div>
      <div class="input-group w-auto">
        <h4>태그</h4>
        <input type="text" v-model="registData.ptags">
      </div>
      <div class="input-group w-auto">
        <h4>상태 선택</h4>
        <div>
          <label>
            <input type="radio" name="status" value="selling" v-model="registData.pstatus">
            판매중
          </label>
        </div>
        <div>
          <label>
            <input type="radio" name="status" value="soon" v-model="registData.pstatus">
            출시예정
          </label>
        </div>
      </div>
      <div class="input-group w-auto" v-if="registData.pstatus === 'soon'">
        <h4>출시예정일</h4>
        <input type="datetime-local" v-model="registData.releasedAt">
      </div>
<!--      <div class="input-group w-auto">-->
<!--        <h4>상품 이미지</h4>-->
<!--        <input type="file" accept="image/*" multiple>-->
<!--      </div>-->
<!--      <div class="input-group w-auto">-->
<!--        <h4>상품 상세 이미지</h4>-->
<!--        <input type="file" accept="image/*" multiple>-->
<!--      </div>-->
<!--      <div class="input-group w-auto">-->
<!--        <h4>사용처</h4>-->
<!--        <input type="file" accept="image/*" multiple>-->
<!--      </div>-->
      <button class="btn btn-primary text-light px-2 py-1"
              type="button" style="height: 36px;" @click="handleClickRegister">
        등록
      </button>
    </div>
</template>

<script setup>
import {ref, watch} from "vue";
import {useRouter} from "vue-router";
import {postProduct} from "../../apis/productApi.js";

const router = useRouter();
const error = ref(null);

const registData = ref({
  pname: '',
  price: '',
  pcode: '',
  quantity: '',
  pstatus: 'selling',
  releasedAt: '',
  ptags: '',
      }
  )
const files =  ref([]);

// pstatus가 'selling'으로 변경될 때 releasedAt을 현재 시간으로 설정
watch(() => registData.value.pstatus, (newStatus) => {
  if (newStatus === 'selling') {
    const now = new Date();
    const formattedNow = now.toISOString().slice(0, 16); // 'YYYY-MM-DDTHH:MM' 형식
    registData.value.releasedAt = formattedNow;
  }
});

const handleClickRegister = async () =>{
  if (!registData.value.releasedAt) {
    const now = new Date();
    const formattedNow = now.toISOString().slice(0, 16); // 'YYYY-MM-DDTHH:MM' 형식
    registData.value.releasedAt = formattedNow;
  }

  const formData = new FormData();
  formData.append('pname', registData.value.pname);
  formData.append('price', registData.value.price);
  formData.append('pcode', registData.value.pcode);
  formData.append('quantity', registData.value.quantity);
  formData.append('pstatus', registData.value.pstatus);
  formData.append('releasedAt', registData.value.releasedAt);
  formData.append('ptags', registData.value.ptags);
  formData.append('sellerId', "phj")

  if (files.value.length === 0) {
    formData.append('files', new Blob([])); // 빈 Blob 객체 추가
  } else {
    // 실제 파일을 추가
    files.value.forEach(file => {
      formData.append('files', file);
    });
  }

  try {
    await postProduct(formData);
    router.replace('/product/list');
  }catch (err){
    error.value = err.response.data.message;
  }
}

</script>


<style scoped>

</style>