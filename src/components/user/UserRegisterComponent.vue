<template>
  <div v-if="isModalOpen">
    <ModalComponent
        title="등록 완료"
        @close="closeModal"
    >
      {{ registData.userId }}님의 입점등록이 완료되었습니다. <br />
      확인을 누르시면 로그인 페이지로 이동됩니다.
    </ModalComponent>
  </div>

  <div class="d-sm-flex align-items-center justify-content-between border-bottom mb-4">
    <div class="ms-auto">
      <Share/>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">판매자 입점 요청</h4>

      <form @submit.prevent="handleSubmitRegist">
        <p class="card-description">가입정보</p>
        <div class="form-group row">
          <label for="userId" class="col-form-label">이메일(email)</label>
          <div class="d-flex align-items-center gap-2">
            <input type="email"
                   id="userId"
                   class="form-control w-auto"
                   v-model="registData.userId"
                   @change="handleChangeUserId"
                   required
                   placeholder="email@example.com" />
            <div v-if="registData.userId">
              <p v-if="isCheckId == false" class="text-success">사용 가능한 이메일 주소입니다.</p>
              <p v-if="isCheckId == true" class="text-danger">이미 사용중인 이메일 주소입니다.</p>
            </div>
          </div>
        </div>
        <div class="form-group row">
          <label for="password" class="col-form-label">비밀번호</label>
          <div class="col-sm-9">
            <input type="password"
                   id="password"
                   class="form-control w-auto"
                   v-model="registData.password"
                   required
                   placeholder="" />
          </div>
        </div>

        <hr class="mt-5 mb-4"/>

        <p class="card-description">사업자 정보</p>

        <p>사업자 유형<span class="text-primary"> (사업자등록증 첨부 전 필수 선택입니다.)</span></p>
        <div class="form-check form-check-inline">
          <input class="form-check-input"
                 type="radio"
                 id="businessType1"
                 value="47925"
                 v-model="registData.businessType">
          <label class="form-check-label" for="businessType1">개인</label>
        </div>
        <div class="form-check form-check-inline mb-4">
          <input class="form-check-input"
                 type="radio"
                 id="businessType2"
                 value="47917"
                 v-model="registData.businessType">
          <label class="form-check-label" for="businessType2">법인</label>
        </div>

        <div class="form-group row">
          <label for="imageFile" class="col-form-label">
            사업자등록증 첨부
            <span class="text-primary"> (휴폐업 여부 확인 시 자동으로 데이터가 입력됩니다.)</span>
          </label>
          <div class="d-flex align-items-center gap-2">
            <input type="file"
                   id="imageFile"
                   multiple
                   @change="handleFileChange"
                   required
                   class="form-control form-control-sm w-auto" :disabled="!registData.businessType"/>
            <button type="button"
                    class="w-auto btn-light border-0 rounded-1 px-2 py-2"
                    @click="handleClickBusinessAuth">휴폐업 여부 조회</button>
            <p v-if="isCheckBusiness == false" class="text-danger">확인할 수 없는 사업자입니다.</p>
          </div>
        </div>

        <div class="form-group row">
          <label for="businessNumber" class="col-form-label">사업자등록번호</label>
          <div class="col-sm-2">
            <input type="text"
                   id="businessNumber"
                   class="form-control w-auto"
                   v-model="registData.businessNumber"
                   :disabled="!registData.businessType"
                   required
                   placeholder="-없이 입력" />
          </div>
        </div>

        <div class="form-group row">
          <label for="commerceLicenseNum" class="col-form-label">통신판매업신고번호</label>
          <div class="col-sm-9">
            <input type="text"
                   id="commerceLicenseNum"
                   class="form-control w-auto"
                   v-model="registData.commerceLicenseNum"
                   :disabled="!registData.businessType"
                   required
                   placeholder="-없이 입력" />
          </div>
        </div>

        <div class="form-group row">
          <label for="businessName" class="col-form-label">상호</label>
          <div class="col-sm-9">
            <input type="text"
                   id="businessName"
                   class="form-control w-100"
                   v-model="registData.businessName"
                   :disabled="!registData.businessType"
                   required
                   placeholder="사업자등록증에 있는 상호 입력" />
          </div>
        </div>

        <div class="form-group row">
          <label for="ownerName" class="col-form-label">대표자명</label>
          <div class="col-sm-9">
            <input type="text"
                   id="ownerName"
                   class="form-control w-auto"
                   v-model="registData.ownerName"
                   :disabled="!registData.businessType"
                   required
                   placeholder="홍길동" />
          </div>
        </div>

        <div class="form-group row">
          <label for="businessAddress" class="col-form-label">사업장 소재지</label>
          <div class="col-sm-9">
            <input type="text"
                   id="businessAddress"
                   class="form-control w-100"
                   v-model="registData.businessAddress"
                   :disabled="!registData.businessType"
                   required
                   placeholder="부산 해운대구 APEC로 17" />
          </div>
        </div>

        <div class="form-group row">
          <label for="businessStatus" class="col-form-label">업태</label>
          <div class="col-sm-9">
            <input type="text"
                   id="businessStatus"
                   class="form-control w-auto"
                   v-model="registData.businessStatus"
                   :disabled="!registData.businessType"
                   required
                   placeholder="" />
          </div>
        </div>

        <div class="form-group row">
          <label for="businessCategory" class="col-form-label">업종</label>
          <div class="col-sm-9">
            <input type="text"
                   id="businessCategory"
                   class="form-control w-auto"
                   v-model="registData.businessCategory"
                   :disabled="!registData.businessType"
                   required
                   placeholder="" />
          </div>
        </div>

        <hr class="mt-5 mb-4"/>

        <p class="card-description">스토어 정보</p>

        <div class="form-group row">
          <label for="storeName" class="col-form-label">스토어명</label>
          <div class="col-sm-9">
            <input type="text"
                   id="storeName"
                   class="form-control w-auto"
                   v-model="registData.storeName"
                   required
                   placeholder="청소AI하니" />
          </div>
        </div>

        <div class="form-group row">
          <label for="originAddress" class="col-form-label">배송 출고지</label>
          <div class="col-sm-9">
            <input type="text"
                   id="originAddress"
                   class="form-control w-100"
                   v-model="registData.originAddress"
                   required
                   placeholder="부산 해운대구 APEC로 17" />
          </div>
        </div>

        <div class="form-group row">
          <label for="contactNumber" class="col-form-label">판매자 연락처</label>
          <div class="col-sm-9">
            <input type="text"
                   id="contactNumber"
                   class="form-control w-auto"
                   v-model="registData.contactNumber"
                   required
                   placeholder="-없이 입력" />
          </div>
        </div>

        <div class="form-group row">
          <label for="accountNumber" class="col-form-label">정산대금 입금계좌</label>
          <div class="col-sm-9">
            <input type="text"
                   id="accountNumber"
                   class="form-control w-auto"
                   v-model="registData.accountNumber"
                   required
                   placeholder="-없이 입력" />
          </div>
        </div>

        <div class="d-flex justify-content-end gap-2 mt-5">
          <button type="submit"
                  :disabled="!(isCheckId === false && isCheckBusiness === true)"
                  class="w-auto btn-primary border-0 rounded-1 px-4 py-2">완료</button>
          <button type="button" class="w-auto btn-light border-0 rounded-1 px-4 py-2">취소</button>
        </div>

      </form>
    </div>
  </div>

</template>

<script setup>
  import {computed, ref} from "vue";
  import { useRouter } from "vue-router";
  import Share from "../../layout/Share.vue";
  import {postBusinessAuth, postCheckUserId, postOcrImage, postUserOneWithFile} from "../../apis/userApi.js";
  import ModalComponent from "../common/ModalComponent.vue";

  const router = useRouter();

  const isModalOpen = ref(false);

  const closeModal = () => {
    isModalOpen.value = false;
    router.replace('/auth/login');
  };

  // 등록 데이터 셋
  const registData = ref({
    userId: '',
    password: '',
    businessNumber: '',
    businessName: '',
    businessType: '',
    ownerName: '',
    businessAddress: '',
    businessStatus: '',
    businessCategory: '',
    storeName: '',
    commerceLicenseNum: '',
    originAddress: '',
    contactNumber: '',
    accountNumber: '',
  })

  const isCheckId = ref(null); // 아이디 체크 여부
  const isCheckBusiness = ref(null); // 사업자 체크 여부
  const file = ref([]); // 파일 데이터

  // 아이디 중복확인
  const handleChangeUserId = async () => {

    // 입력이 비어있을 때
    if (!registData.value.userId.trim()) {
      isCheckId.value = null;
      return;
    }

    try {
      const res = await postCheckUserId({ userId: registData.value.userId });
      isCheckId.value = res;
    } catch (error) {
      console.error("아이디 중복 체크 실패:", error);
      isCheckId.value = null; // 에러 발생 시 상태 초기화
    }
  }

  // 파일 데이터 처리
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]; // 첫 번째 파일 선택
    if (!selectedFile) {
      console.error("파일이 선택되지 않았습니다.");
      return;
    }
    file.value = {
      file: selectedFile,
      uploadedFileName: selectedFile.name, // 파일 이름 저장
    };
  }

  // ocr에 보내줄 데이터
  const ocrMessage = computed(() => ({
    version: "V1",
    requestId: "1234",
    timestamp: Date.now(),
    images: [
      { format: "jpg", name: "medium", templateId: registData.value.businessType }
    ]
  }));

  // 휴폐업 여부 조회 버튼 클릭 시
  const handleClickBusinessAuth = async () => {
    const formData = new FormData();
    formData.append('file', file.value.file);
    formData.append('message', JSON.stringify(ocrMessage.value));

    const res = await postOcrImage(formData);
    console.log(res);
    registData.value.businessNumber = res.images[0].fields[0].inferText.replace(/-/g, "");
    registData.value.businessName = res.images[0].fields[1].inferText;
    registData.value.ownerName = res.images[0].fields[2].inferText;
    const openingDate = res.images[0].fields[3].inferText.replace(/[년월일\s]/g, "");

    // 사업자진위여부에 보내줄 데이터셋
    const businessAuthData = computed(() => {
      return {
        businesses: [
          {
            b_no: registData.value.businessNumber,
            start_dt: openingDate,
            p_nm: registData.value.ownerName,
            p_nm2: "",
            b_nm: "",
            corp_no: "",
            b_sector: "",
            b_type: "",
            b_adr: "",
          }
        ]
      };
    });

    console.log(JSON.stringify(businessAuthData.value));

    const result = await postBusinessAuth(JSON.stringify(businessAuthData.value));
    console.log(result.valid_cnt);

    if(result.valid_cnt) {
      isCheckBusiness.value = true;
    } else {
      isCheckBusiness.value = false;
    }

  };

  const handleSubmitRegist = async () => {
    const formData = new FormData();
    formData.append('imageFile', file.value.file);
    formData.append('userId', registData.value.userId);
    formData.append('password', registData.value.password);
    formData.append('businessNumber', registData.value.businessNumber);
    formData.append('businessName', registData.value.businessName);
    formData.append('businessType', registData.value.businessType);
    formData.append('ownerName', registData.value.ownerName);
    formData.append('businessAddress', registData.value.businessAddress);
    formData.append('businessStatus', registData.value.businessStatus);
    formData.append('businessCategory', registData.value.businessCategory);
    formData.append('storeName', registData.value.storeName);
    formData.append('commerceLicenseNum', registData.value.commerceLicenseNum);
    formData.append('originAddress', registData.value.originAddress);
    formData.append('contactNumber', registData.value.contactNumber);
    formData.append('accountNumber', registData.value.accountNumber);

    console.log(formData);
    try {
      await postUserOneWithFile(formData).then((res) => {
        isModalOpen.value = true;
        console.log(res);
      });
    } catch (error) {
      console.error('폼 데이터 제출 실패:', error);
    }
  }


</script>

<style scoped>
.form-control::placeholder {
  color: lightsteelblue;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>