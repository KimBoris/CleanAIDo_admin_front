<template>
  <div>

    <div class="d-sm-flex align-items-center justify-content-between border-bottom mb-4">
      <div class="ms-auto">
        <Share/>
      </div>
    </div>

    <div>

      <div v-if="isLoading" class="flex items-center justify-center h-screen">
        <LoadingComponent></LoadingComponent>
      </div>

      <div v-else>

        <div class="card">
          <div class="card-body">
            <h4 class="card-title"></h4>
            <p class="card-description"></p>

            <div class="form-group d-flex justify-content-end">

              <div class="input-group w-auto">
                <select style="height: 36px;" v-model="selectedOption">
                  <option value="" disabled>------</option>
                  <option value="customerId">아이디</option>
                  <option value="customerName">고객명</option>
                </select>
                <input type="text" v-model="keyword" placeholder="검색어를 입력하세요"/>
                <button @click="handleSearch" class="btn btn-primary text-light px-2 py-1" type="button"
                        style="height: 36px;">
                  <i class="fa fa-search"></i>
                </button>
              </div>
            </div>

            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                <tr>
                  <th style="width: 10%;">고객 아이디</th>
                  <th style="width: 10%;">고객명</th>
                  <th style="width: 5%;">생년월일</th>
                  <th style="width: 5%;">생성일자</th>
                  <th style="width: 5%;">전화번호</th>
                  <th style="width: 10%;">주소</th>

                </tr>
                </thead>
                <tbody>
                <tr v-for="customer in customerList.dtoList" :key="customer.customerId" class="pe-auto">
                  <td class="cursor-pointer">{{ customer.customerId }}</td>
                  <td>{{ customer.customerName }}</td>
                  <td>{{ customer.birthDate }}</td>
                  <td>{{ customer.createDate}}</td>
                  <td>{{ customer.phoneNumber }}</td>
                  <td>{{ customer.address }}</td>


                </tr>
                </tbody>
              </table>
              <div class="d-flex justify-content-center mt-5">
                <div class="btn-group" role="group" aria-label="Basic example">
                  <button type="button" class="btn btn-outline-secondary py-3 px-3" v-if="customerList.prev"
                          @click="handleClickPage(customerList.prevPage)">
                    이전
                  </button>
                  <button type="button" class="btn btn-outline-secondary py-3 px-3" v-for="page in customerList.pageNumList"
                          :key="page" @click="handleClickPage(page)">
                    {{ page }}
                  </button>
                  <button type="button" class="btn btn-outline-secondary py-3 px-3" v-if="customerList.next"
                          @click="handleClickPage(customerList.nextPage)">
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
import {useAuthStore} from '../../stores/useAuthStore';
import {useRoute, useRouter} from 'vue-router';
import Share from "../../layout/Share.vue";
import LoadingComponent from "../common/LoadingComponent.vue";
import {getCustomerList} from "../../apis/customerAPI.js";

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();
const role = computed(() => authStore.role);

const customerList = ref({
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

const fetchCustomerList = async (page, type = '', keyword = '') => {
  isLoading.value = true;
  const data = await getCustomerList(page || 1, 10, type, keyword);

  data.dtoList.forEach(customer => {
    if (customer.createDate) customer.createDate = new Date(customer.createDate).toLocaleString();
    if (customer.updateDate) customer.updateDate = new Date(customer.updateDate).toLocaleString();
  });


  customerList.value = data;
  isLoading.value = false;
};


const handleClickPage = (pageNum) => {
  router.push({query: {page: pageNum, type: searchData.value.type, keyword: searchData.value.keyword}});
  fetchCustomerList(pageNum, searchData.value.type, searchData.value.keyword);
};


onMounted(() => {
  searchData.value.type = route.query.type || '';
  searchData.value.keyword = route.query.keyword || '';
  fetchCustomerList(route.query.page || 1, searchData.value.type, searchData.value.keyword);
});

const handleSearch = () => {
  searchData.value.type = selectedOption.value;
  searchData.value.keyword = keyword.value;
  router.push({
    path: '/customer/list',
    query: {page: 1, type: searchData.value.type, keyword: searchData.value.keyword}
  });
  fetchCustomerList(1, searchData.value.type, searchData.value.keyword);
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

.review-info {
  margin-bottom: 20px;
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

.product-contents {
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 4px;
  white-space: pre-wrap;
  color: #333;
  margin-top: 8px;
}

.review-edit {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
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
