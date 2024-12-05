<template>
  <!-- 헤더 -->
  <div class="header d-flex align-items-center justify-content-between border-bottom mb-4 py-3">
    <h2>카테고리 관리</h2>
    <Share />
  </div>

  <!-- 메인 콘텐츠 -->
  <div>
    <!-- 로딩 상태 -->
    <div v-if="isLoading" class="flex items-center justify-center h-screen bg-gray-100">
      <LoadingComponent />
    </div>

    <div v-else>
      <!-- 등록 카드 -->
      <div class="card shadow-sm mb-4">
        <div class="card-body">
          <h4 class="card-title">카테고리 등록</h4>
          <div class="form-group mb-3">
            <label for="parentCategory">부모 카테고리 입력</label>
            <div class="input-group">
              <input
                  type="text"
                  id="parentCategory"
                  v-model="registParentCname"
                  placeholder="부모 카테고리 입력"
                  class="form-control"
              />
              <button @click="handleClickAddParent" class="btn btn-primary">등록</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 카테고리 리스트 -->
      <div class="card shadow-sm">
        <div class="card-body">
          <h4 class="card-title">카테고리 목록</h4>

          <div v-for="parent in parentsList" :key="parent.cno" class="category-item">
            <!-- 부모 카테고리 -->
            <div class="d-flex justify-content-between align-items-center parent-category">
              <span>{{ parent.cname }}</span>
              <div>
                <button @click="readyAddChild(parent.cno)" class="btn btn-sm btn-outline-primary">+</button>
                <button @click="toggleChildList(parent.cno)" class="btn btn-sm btn-outline-secondary">
                  {{ expandedParentCno === parent.cno ? "닫기" : "보기" }}
                </button>
              </div>
            </div>

            <!-- 자식 카테고리 추가 -->
            <div v-if="expandedParentCno === parent.cno && readyToAddChild" class="child-category-form">
              <input
                  type="text"
                  v-model="registChildCname"
                  placeholder="자식 카테고리 입력"
                  class="form-control"
              />
              <button @click="handleClickAddChild(parent.cno)" class="btn btn-success btn-sm">완료</button>
              <button @click="readyToAddChild.value = false" class="btn btn-danger btn-sm">취소</button>
            </div>

            <!-- 자식 카테고리 리스트 -->
            <div v-if="expandedParentCno === parent.cno && childList.length > 0" class="child-category-list">
              <div
                  v-for="child in childList"
                  :key="child.cno"
                  class="child-category-item"
              >
                {{ child.cname }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import Share from "../../layout/Share.vue";
import LoadingComponent from "../common/LoadingComponent.vue";
import { onMounted, ref } from "vue";
import {addChild, addParent, getChildList, getParentList, removeCategory} from "../../apis/categoryApi.js";

const parentsList = ref([]);
const childList = ref([]);
const isLoading = ref(true);
const expandedParentCno = ref(null); //현재 자식컴포넌트를 보여주는 부모의 cno가 들어감
const readyToAddChild = ref(false);
const registChildCname = ref("");
const registParentCname = ref("");
const checkDelete = ref(false);

const fetchCategoryList = async () => {
  try {
    isLoading.value = true;
    const data = await getParentList();
    parentsList.value = data;
    console.log(parentsList.value);
  } catch (error) {
    console.error("Error fetching category list:", error);
  } finally {
    isLoading.value = false;
  }
};

//해당 부모의 자식 카테고리 들을 보여줌
const toggleChildList = async (cno) => {
  if (expandedParentCno.value === cno) {
    expandedParentCno.value = null;
    childList.value = [];
    return;
  }
  readyToAddChild.value = false;
  try {
    const data = await getChildList(cno);
    childList.value = data;
    expandedParentCno.value = cno;
    console.log(childList.value);
  } catch (error) {
    console.error("Error fetching child categories:", error);
  }
};

//+버튼을 누를떄
const readyAddChild = async (cno) => {
  expandedParentCno.value = cno;
  readyToAddChild.value = true;
};

const handleClickAddChild = async (cno) => {
  const formData = new FormData();
  formData.append("parent", cno);
  formData.append("cname", registChildCname.value);

  try {
    await addChild(formData);
    registChildCname.value = null;
    readyToAddChild.value = false;
    await toggleChildList(cno);
  } catch (err) {
    console.log(err);
  }
};
const handleClickAddParent = async () => {
  const formData = new FormData();
  formData.append("cname", registParentCname.value);

  try {
    await addParent(formData);
    await fetchCategoryList();
    registParentCname.value = null;
  } catch (err) {
    console.log(err);
  }
};

const handleClickRemove = async (parentCno,cno)=>{

  try{
    await removeCategory(cno);
    await fetchCategoryList();
    await toggleChildList(parentCno)
  }catch (err){
    console.log(err)
  }
}


onMounted(() => {
  fetchCategoryList();
});
</script>

<style scoped>
/* 부모 카테고리 스타일 */
.category-item {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 15px;
}
.parent-category {
  font-weight: bold;
  font-size: 1rem;
}
.child-category-form {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}
.child-category-list {
  margin-top: 10px;
  padding-left: 20px;
}
.child-category-item {
  padding: 5px 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 5px;
}
</style>

