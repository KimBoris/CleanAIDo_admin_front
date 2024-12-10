<template>
  <div v-if="isModalOpen" class="modal fade show" tabindex="-1" role="dialog"
       style="display: block; background: rgba(0, 0, 0, 0.5); transition: all 0.3s ease;">
    <div class="modal-dialog mt-5" role="document">
      <div class="modal-content shadow-lg rounded-4" style="background: #ffffff; border-radius: 15px;">
        <!-- Close Button -->
        <div class="modal-header border-0">
          <h5 class="modal-title" style="font-size: 1.5rem; font-weight: 600;">고객 정보</h5>
          <button type="button" class="btn-close" @click="closeModal" style="color: #ff4c4c; border: none;"></button>
        </div>

        <!-- Modal Body -->
        <div class="modal-body">
          <!-- 로딩 중 상태 -->
          <div v-if="isLoading" class="d-flex justify-content-center align-items-center" style="height: 200px;">
            <LoadingComponent/>
          </div>

          <!-- 로딩 완료 후 데이터 표시 -->
          <div v-else>
            <div class="d-flex align-items-start">
              <!-- Profile Image Section (좌측 상단에 위치) -->
              <div class="me-4">
                <!--                    src='/public/assets/images/logo-mini.svg'-->
                <img
                    :src="selectedCustomer.value.profileImageUrl"
                    alt="프로필 사진"
                    class="img-thumbnail"
                    style="width: 120px; height: 120px; object-fit: cover; border-radius: 50%; border: 4px solid #f1f1f1; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);"
                />
              </div>

              <!-- Customer Information -->
              <div class="ms-3">
                <div class="mb-3">
                  <h6 class="text-muted" style="font-size: 1.1rem;">유저 이름</h6>
                  <p class="fw-bold" style="font-size: 1.2rem;">{{ selectedCustomer.value.customerName }}</p>
                </div>

                <div class="mb-3">
                  <h6 class="text-muted" style="font-size: 1.1rem;">유저 아이디</h6>
                  <p class="fw-bold" style="font-size: 1.2rem;">{{ selectedCustomer.value.customerId }}</p>
                </div>

                <div class="mb-3">
                  <h6 class="text-muted" style="font-size: 1.1rem;">전화 번호</h6>
                  <p class="fw-bold" style="font-size: 1.2rem;">{{ selectedCustomer.value.phoneNumber }}</p>
                </div>

                <div class="mb-3">
                  <h6 class="text-muted" style="font-size: 1.1rem;">생년월일</h6>
                  <p class="fw-bold" style="font-size: 1.2rem;">{{ selectedCustomer.value.birthDate }}</p>
                </div>
              </div>
            </div>

            <!-- 거래 내역, QNA, 리뷰, 게시글을 일정 간격으로 가로 정렬 -->
            <div class="d-flex justify-content-between mt-4">
              <div class="text-center flex-fill">
                <h6 class="text-muted" style="font-size: 1.1rem;">거래 내역</h6>
                <p class="fw-bold" style="font-size: 1.2rem;">{{ selectedCustomer.value.orderCount }}</p>
              </div>
              <div class="text-center flex-fill">
                <h6 class="text-muted" style="font-size: 1.1rem;">QNA</h6>
                <p class="fw-bold" style="font-size: 1.2rem;">{{ selectedCustomer.value.qnaCount }}</p>
              </div>
              <div class="text-center flex-fill">
                <h6 class="text-muted" style="font-size: 1.1rem;">리뷰</h6>
                <p class="fw-bold" style="font-size: 1.2rem;">{{ selectedCustomer.value.reviewCount }}</p>
              </div>
              <div class="text-center flex-fill">
                <h6 class="text-muted" style="font-size: 1.1rem;">게시글</h6>
                <p class="fw-bold" style="font-size: 1.2rem;">{{ selectedCustomer.value.postCount }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-secondary" @click="closeModal"
                  style="padding: 8px 20px; font-size: 1rem;">닫기
          </button>
        </div>
      </div>
    </div>
  </div>


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
              <tr v-for="customer in customerList.dtoList"
                  :key="customer.customerId"
                  class="pe-auto"
                  @contextmenu.prevent="showContextMenu($event, customer.customerId)">
                <td>{{ customer.customerId }}</td>
                <td>{{ customer.customerName }}</td>
                <td>{{ customer.birthDate }}</td>
                <td>{{ customer.createDate }}</td>
                <td>{{ customer.phoneNumber }}</td>
                <td>{{ customer.address }}</td>
              </tr>
              </tbody>
            </table>
            <div v-if="isContextMenuVisible"
                 :style="{ top: `${contextMenuPosition.y}px`, left: `${contextMenuPosition.x}px` }"
                 class="context-menu">
              <ul>
                <li @click="showTransactionHistory">거래 내역</li>
                <li>QNA</li>
                <li>리뷰</li>
                <li>게시글</li>
              </ul>
            </div>


            <div class="d-flex justify-content-center mt-5">
              <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-outline-secondary py-3 px-3" v-if="customerList.prev"
                        @click="handleClickPage(customerList.prevPage)">
                  이전
                </button>
                <button type="button" class="btn btn-outline-secondary py-3 px-3"
                        v-for="page in customerList.pageNumList"
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

</template>

<script setup>
import {ref, onMounted, computed} from 'vue';
import {useAuthStore} from '../../stores/useAuthStore';
import {useRoute, useRouter} from 'vue-router';
import Share from "../../layout/Share.vue";
import LoadingComponent from "../common/LoadingComponent.vue";
import {getCustomerList, getCustomerOne} from "../../apis/customerAPI.js";
import customer from "../../routers/customer.js";

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();
const role = computed(() => authStore.role);

const isContextMenuVisible = ref(false);
const contextMenuPosition = ref({x: 0, y: 0});

const  hoveredCustomerId = null;

const showContextMenu = (event, customerId) => {
  contextMenuPosition.value = {
    x: event.clientX + window.scrollX,
    y: event.clientY + window.scrollY
  };
  selectedCustomer.value.customerId = customerId; // 선택된 고객 ID 저장
  console.log('CustomerId:', selectedCustomer.value.customerId); // 디버깅용 로그
  isContextMenuVisible.value = true;
};

const handleContextMenuClick = (event) => {
  const customerId = event.target.getAttribute('data-customerId');
  if (customerId) {
    console.log('선택한 customerId:', customerId);
    // 고객 ID에 따라 처리할 로직 추가
  }
  this.isContextMenuVisible = false;  // context menu 닫기
};
const showTransactionHistory = () => {
  if (selectedCustomer.value.customerId) {
    router.push(`/order/${selectedCustomer.value.customerId}`); // 해당 경로로 이동
    isContextMenuVisible.value = false; // context menu 닫기
  } else {
    console.error('No customer ID selected');
  }
};

const customerList = ref({
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: {
    page: 0,
    size: 10,
  },
});

const isModalOpen = ref(false);
const selectedCustomer = ref({
  customerName: '',
  customerId: '',
  birthDate: '',
  phoneNumber: '',
  address: '',
  profileImageUrl: '',
  orderCount: '',
});
const selectedOption = ref('');
const keyword = ref('');
const isLoading = ref(true);

const searchData = ref({
  type: '',
  keyword: ''
});

const fetchCustomerList = async (page, type = '', keyword = '') => {
  try {
    isLoading.value = true;
    const data = await getCustomerList(page || 1, 10, type, keyword);

    if (data && data.dtoList) {
      data.dtoList.forEach(customer => {
        if (customer.createDate) customer.createDate = new Date(customer.createDate).toLocaleString();
        if (customer.updateDate) customer.updateDate = new Date(customer.updateDate).toLocaleString();
      });

      customerList.value = data;
    }
  } catch (error) {
    console.error('Failed to fetch customer list:', error);
  } finally {
    isLoading.value = false; // 로딩 종료
  }
};


const handleClickPage = (pageNum) => {
  router.push({query: {page: pageNum, type: searchData.value.type, keyword: searchData.value.keyword}});
  fetchCustomerList(pageNum, searchData.value.type, searchData.value.keyword);
};

const openModal = async (customerId) => {
  try {
    isLoading.value = true; // 로딩 시작
    const customerData = await getCustomerOne(customerId);

    if (customerData != null) {
      selectedCustomer.value = customerData;
    } else {
      console.warn("No data received for customer ID:", customerId);
    }
  } catch (error) {
    console.error('Failed to fetch Customer data:', error);
  } finally {
    isLoading.value = false; // 로딩 종료
    isModalOpen.value = true;
  }
};


const closeModal = () => {
  isModalOpen.value = false;
  selectedCustomer.value = null;
};


onMounted(async () => {
  try {
    searchData.value.type = route.query.type || '';
    searchData.value.keyword = route.query.keyword || '';
    await fetchCustomerList(route.query.page || 1, searchData.value.type, searchData.value.keyword);
  } catch (error) {
    console.error('Error during initial fetch:', error);
  } finally {
    isLoading.value = false; // 로딩 종료
  }
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

.customer-info {
  margin-bottom: 20px;
}

.customer-info p {
  font-size: 1rem;
  color: #555;
  margin-top: 25px;
  margin-bottom: 20px;
}

.customer-info strong {
  color: #222;
}

.customer-contents {
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 4px;
  white-space: pre-wrap;
  color: #333;
  margin-top: 8px;
}

.customer-edit {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.customer-edit textarea {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
}

.customer-edit button {
  background-color: #007bff;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.context-menu {
  position: absolute;
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.context-menu ul {
  list-style: none;
  padding: 5px 0;
  margin: 0;
}

.context-menu li {
  padding: 10px;
  cursor: pointer;
}

.context-menu li:hover {
  background-color: #f0f0f0;
}
</style>
