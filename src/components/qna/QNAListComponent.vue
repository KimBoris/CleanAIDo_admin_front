<template>
  <!-- 탭 메뉴 -->
  <div class="d-sm-flex align-items-center justify-content-between border-bottom mb-4">
    <div class="ms-auto">
      <Share/>
    </div>
  </div>
  <!-- 검색창 -->

  <!-- 검색창 -->
  <div>
    <select v-model="selectedOption">
      <option value="" disabled>------</option>
      <option value="titleContents">제목+내용</option>
      <option value="writer">작성자</option>
    </select>
    <input type="text" v-model="keyword" placeholder="검색어를 입력하세요"/>
    <button @click="handleSearch">검색</button>
  </div>
  <div>
    <div v-if="isLoading" class="flex items-center justify-center h-screen">
      <!--로딩창-->
      <LoadingComponent></LoadingComponent>
    </div>
    <div v-else>
      <!-- 리스트 -->
      <div class="card">
        <div class="card-body">
          <h4 class="card-title"></h4>
          <p class="card-description"></p>
          <div class="form-group d-flex justify-content-end">
            <div class="input-group w-auto">
              <input type="text" v-model="keyword" class="form-control px-2 py-1" placeholder="질문 검색" style="height: 36px;"/>
              <div class="input-group-append">
                <button @click="handleSearch" class="btn btn-primary text-light px-2 py-1" type="button" style="height: 36px;">
                  <i class="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
              <tr>
                <th style="width: 60%;">제목</th>
                <th style="width: 30%;">글쓴이</th>
                <th style="width: 10%;">답변여부</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="qna in qnaList.dtoList" :key="qna.qno" class="pe-auto">
                <td class="cursor-pointer" @click="openModal(qna.qno, qna.answered)">{{ qna.title }}</td>
                <td>{{ qna.writer }}</td>
                <td>
                  <label :class="qna.answered ? 'badge badge-success' : 'badge badge-dark'">
                    {{ qna.answered ? '답변완료' : '미완료' }}
                  </label>
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
                    v-if="qnaList.prev" @click="handleClickPage(qnaList.prevPage)"
                >이전
                </button>
                <button
                    type="button"
                    class="btn btn-outline-secondary py-3 px-3"
                    v-for="page in qnaList.pageNumList" :key="page" @click="handleClickPage(page)"
                >{{ page }}
                </button>
                <button
                    type="button"
                    class="btn btn-outline-secondary py-3 px-3"
                    v-if="qnaList.next" @click="handleClickPage(qnaList.nextPage)"
                >다음
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 답변 완료된 질문 수정용 모달 -->
  <div v-if="isEditModalOpen" class="modal">
    <div class="modal-content">
      <button class="btn btn-close close-button" @click="closeModal"></button>
      <div>
        <div v-if="isLoading" class="flex items-center justify-center h-screen">
          <!--로딩창-->
          <LoadingComponent></LoadingComponent>
        </div>
        <div v-else>
          <div class="qna-info">
            <h4><strong>{{ selectedQna.title }} (수정 모드)</strong></h4>
          </div>
          <div class="qna-info">
            <div class="d-sm-flex align-items-center justify-content-between border-bottom mb-4">
            </div>
            <p><strong>작성자</strong>
              <div class="qna-contents">{{ selectedQna.writer }}</div>
            </p>
            <p><strong>문의 내용</strong>
              <div class="qna-contents">{{ selectedQna.contents }}</div>
            </p>
          </div>
          <!-- 답변 수정 -->
          <div>
            <label for="answer"><strong>답변 수정:</strong></label>
            <textarea id="answer" v-model="answerContent" rows="5" placeholder="답변을 수정하세요"></textarea>
            <div class="text-end">
              <button class="fs-6 text-white btn btn-primary" @click="submitAnswer(true)">수정</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
  <!-- 답변 없는 질문용 모달 -->
  <div v-if="isModalOpen" class="modal">
    <div class="modal-content">
      <button class="btn btn-close close-button" @click="closeModal"></button>
      <div>
        <div v-if="isLoading" class="flex items-center justify-center h-screen">
          <!--로딩창-->
          <LoadingComponent></LoadingComponent>
        </div>
        <div v-else>
          <div class="qna-info">
            <h4><strong>{{ selectedQna.title }}</strong></h4>
          </div>
          <div class="qna-info">
            <hr>
            <p><strong>작성자</strong>
              <div class="qna-contents"> {{ selectedQna.writer }}</div>
            </p>
            <p><strong>문의 내용</strong>
              <div class="qna-contents">{{ selectedQna.contents }}</div>
            </p>
          </div>
          <!-- 답변 작성 -->
          <div>
            <label for="answer"><strong>답변 작성:</strong></label>
            <textarea id="answer" v-model="answerContent" rows="5" placeholder="답변을 입력하세요"></textarea>
            <div class="text-end">
              <button class="fs-6 text-white btn btn-primary" @click="submitAnswer(false)">완료</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import {ref, onMounted} from 'vue';
import {getQNAList, getQNAOne, postQNAAnswer, putQNAAnswer} from '../../apis/qnaApi.js';
import {useRoute, useRouter} from 'vue-router';
import Share from "../../layout/Share.vue";
import LoadingComponent from "../common/LoadingComponent.vue";

const route = useRoute();
const router = useRouter();

// 리스트 데이터 관리
const qnaList = ref({
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: {
    page: 0,
    size: 10,
  },
});

// 모달 관련 상태 관리
const isModalOpen = ref(false); // 모달 상태
const isEditModalOpen = ref(false); // 수정 모달 상태
const selectedQna = ref(null);  // 선택된 질문
const answerContent = ref('');  // 입력된 답변
const selectedOption = ref('');
const keyword = ref('');
const isLoading = ref(true);

const searchData = ref({
  type: '',
  keyword: ''
});

// 페이지 데이터 가져오기
const fetchQNAList = async (page, type = '', keyword = '') => {
  isLoading.value = true; // 로딩 시작
  const data = await getQNAList(page || 1, 10, type, keyword);
  qnaList.value = data;
  isLoading.value = false;
};

// 페이지네이션 클릭 시 이벤트 처리
const handleClickPage = (pageNum) => {
  router.push({query: {page: pageNum, searchType: searchData.value.type, keyword: searchData.value.keyword}});
  fetchQNAList(pageNum, searchData.value.type, searchData.value.keyword);
};
// 모달 열기 (질문 데이터 가져오기)
const openModal = async (qno, answered) => {
  try {
    isLoading.value = true;
    const qnaData = await getQNAOne(qno); // 서버에서 질문/답변 데이터를 받아옴
    selectedQna.value = qnaData; // 받아온 질문 데이터를 모달에 적용
    answerContent.value = qnaData.answertext || ''; // 기존 답변이 있으면 표시, 없으면 빈 값

    if (answered) {
      isEditModalOpen.value = true; // 수정 모달 열기
    } else {
      isModalOpen.value = true; // 답변 모달 열기
    }
  } catch (error) {
    console.error('Failed to fetch QnA data:', error);
  } finally {
    isLoading.value = false;
  }
};

// 모달 닫기
const closeModal = () => {
  isModalOpen.value = false;
  isEditModalOpen.value = false;
  selectedQna.value = null;
  answerContent.value = '';
};

// 완료 또는 수정 버튼 이벤트 (답변 등록 또는 수정)
const submitAnswer = async (isEditing) => {
  if (selectedQna.value) {
    const answerData = {
      qno: selectedQna.value.qno,
      answerText: answerContent.value,
    };

    try {
      if (isEditing) {
        // 수정인 경우
        await putQNAAnswer(answerData);
      } else {
        // 신규 답변인 경우
        await postQNAAnswer(answerData);
      }

      // dtoList에서 해당 QnA 항목을 찾아서 answertext 업데이트
      const updatedItem = qnaList.value.dtoList.find(item => item.qno === selectedQna.value.qno);
      if (updatedItem) {
        updatedItem.answertext = answerContent.value;  // answertext 필드를 업데이트
        updatedItem.answered = true; // 답변 완료 상태로 변경
      }

      closeModal(); // 답변 완료 후 모달 닫기
    } catch (error) {
      console.error('Failed to submit the answer:', error);
    }
  }
};

// 컴포넌트가 마운트될 때 리스트 가져오기
onMounted(() => {
  searchData.value.type = route.query.searchType || '';
  searchData.value.keyword = route.query.keyword || '';
  fetchQNAList(route.query.page || 1, searchData.value.type, searchData.value.keyword);
});

const handleSearch = () => {
  searchData.value.type = selectedOption.value;
  searchData.value.keyword = keyword.value;
  router.push({
    path: '/qna/list',
    query: {page: 1, searchType: searchData.value.type, keyword: searchData.value.keyword}
  });
  fetchQNAList(1, searchData.value.type, searchData.value.keyword);
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  position: relative;
  background: white;
  padding: 30px;
  width: 600px;
  border-radius: 8px;
}

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

.close-button {
  position: absolute;
  top: 35px;
  right: 35px;
  border: none;
  font-size: 20px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
}


.qna-modal-content {
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  font-family: Arial, sans-serif;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
  border-bottom: 2px solid #ddd;
  padding-bottom: 8px;
}

.qna-info {

  margin-bottom: 20px;
}

.qna-info p {
  font-size: 1rem;
  color: #555;
  margin-top: 25px;
  margin-bottom: 20px;
}


.qna-info strong {
  color: #222;
}

.qna-contents {
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 4px;
  white-space: pre-wrap;
  color: #333;
  margin-top: 8px;
}

.qna-edit {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.qna-edit textarea {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
}

.qna-edit button {
  background-color: #007bff;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

</style>