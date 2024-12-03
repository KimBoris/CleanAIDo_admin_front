<template>
  <div>
    <!-- 탭 메뉴 -->
    <div class="d-sm-flex align-items-center justify-content-between border-bottom mb-4">
      <div class="ms-auto">
        <Share />
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
                  <option value="username">이름</option>
                  <option value="email">이메일</option>
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
                  <th style="width: 35%;">ID</th>
                  <th style="width: 15%;">이름</th>
                  <th style="width: 20%;">이메일</th>
                  <th style="width: 10%;">가입일</th>
                  <th style="width: 10%;">상태</th>
                  <th style="width: 10%;">등록일/수정일</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="user in userList.dtoList" :key="user.userId" class="pe-auto">
                  <td class="cursor-pointer">{{ user.userId }}</td>
                  <td>{{ user.ownerName }}</td>
                  <td>{{ user.businessName }}</td>
                  <td>{{ user.businessLicenseNum }}</td>
                  <td>{{ user.businessStatus }}</td>
                  <td>
                    {{ user.createDate }} / {{ user.updateDate }}
                  </td>
                </tr>
                </tbody>
              </table>

              <!-- 페이지네이션 -->
              <div class="d-flex justify-content-center mt-5">
                <div class="btn-group" role="group" aria-label="Basic example">
                  <button type="button" class="btn btn-outline-secondary py-3 px-3" v-if="userList.prev" @click="handleClickPage(userList.prevPage)">
                    이전
                  </button>
                  <button type="button" class="btn btn-outline-secondary py-3 px-3" v-for="page in userList.pageNumList" :key="page" @click="handleClickPage(page)">
                    {{ page }}
                  </button>
                  <button type="button" class="btn btn-outline-secondary py-3 px-3" v-if="userList.next" @click="handleClickPage(userList.nextPage)">
                    다음
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';
import {useAuthStore} from '../../stores/useAuthStore'; // Pinia 스토어 가져오기
import {getUserList} from '../../apis/userApi.js'; // 사용자 목록 API
import {useRoute, useRouter} from 'vue-router';
import Share from "../../layout/Share.vue";
import LoadingComponent from "../common/LoadingComponent.vue";

const route = useRoute();
const router = useRouter();

// AuthStore 사용
const authStore = useAuthStore();
const role = computed(() => authStore.role); // role을 Pinia에서 가져옴

// 리스트 데이터 관리
const userList = ref({
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
const fetchUserList = async (page, type = '', keyword = '') => {
  isLoading.value = true;
  const data = await getUserList(page || 1, 10, type, keyword);

  // 날짜 포맷 변환 (LocalDateTime -> YYYY-MM-DD HH:mm:ss)
  data.dtoList.forEach(user => {
    if (user.createDate) user.createDate = new Date(user.createDate).toLocaleString();
    if (user.updateDate) user.updateDate = new Date(user.updateDate).toLocaleString();
  });

  userList.value = data;
  isLoading.value = false;
};


// 페이지네이션 클릭 시 이벤트 처리
const handleClickPage = (pageNum) => {
  router.push({query: {page: pageNum, type: searchData.value.type, keyword: searchData.value.keyword}});
  fetchUserList(pageNum, searchData.value.type, searchData.value.keyword);
};

// 컴포넌트가 마운트될 때 리스트 가져오기
onMounted(() => {
  searchData.value.type = route.query.type || '';
  searchData.value.keyword = route.query.keyword || '';
  fetchUserList(route.query.page || 1, searchData.value.type, searchData.value.keyword);
});

const handleSearch = () => {
  searchData.value.type = selectedOption.value;
  searchData.value.keyword = keyword.value;
  router.push({
    path: '/user/list',
    query: {page: 1, type: searchData.value.type, keyword: searchData.value.keyword}
  });
  fetchUserList(1, searchData.value.type, searchData.value.keyword);
};
</script>

<style scoped>
/* 스타일링은 필요에 맞게 수정 */
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
