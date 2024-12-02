<template>
  <div class="d-sm-flex align-items-center justify-content-between border-bottom mb-4">
    <div class="ms-auto">
      <Share/>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">판매자 입점 요청</h4>

      <p class="card-description">가입정보</p>
      <div class="form-group row">
        <label for="userId" class="col-form-label">이메일(email)</label>
        <div class="d-flex align-items-center gap-2">
          <input type="email"
                 id="userId"
                 class="form-control w-auto"
                 placeholder="email@example.com" />
          <button type="button" class="w-auto btn-light border-0 rounded-1 py-2 px-2">아이디 중복확인</button>
        </div>
      </div>
      <div class="form-group row">
        <label for="password" class="col-form-label">비밀번호</label>
        <div class="col-sm-9">
          <input type="password"
                 id="password"
                 class="form-control w-auto"
                 placeholder="" />
        </div>
      </div>

      <hr class="mt-5 mb-4"/>

      <p class="card-description">사업자 정보</p>

      <p>사업자 유형</p>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="businessType" id="businessType1" value="option1">
        <label class="form-check-label" for="businessType1">개인</label>
      </div>
      <div class="form-check form-check-inline mb-4">
        <input class="form-check-input" type="radio" name="businessType" id="businessType2" value="option2">
        <label class="form-check-label" for="businessType2">법인</label>
      </div>

      <div class="form-group row">
        <label for="imageFile" class="col-form-label">사업자등록증 첨부</label>
        <div class="d-flex align-items-center gap-2">
          <input type="file" id="imageFile" multiple @change="" class="form-control form-control-sm w-auto"/>
          <button type="button" class="w-auto btn-light border-0 rounded-1 px-2 py-2">휴폐업 여부 조회</button>
        </div>
      </div>


      <div class="form-group row">
        <label for="businessNumber" class="col-form-label">사업자등록번호</label>
        <div class="col-sm-2">
          <input type="text"
                 id="businessNumber"
                 class="form-control w-auto"
                 placeholder="-없이 입력" />
        </div>
      </div>

      <div class="form-group row">
        <label for="commerceLicenseNum" class="col-form-label">통신판매업신고번호</label>
        <div class="col-sm-9">
          <input type="text"
                 id="commerceLicenseNum"
                 class="form-control w-auto"
                 placeholder="-없이 입력" />
        </div>
      </div>

      <div class="form-group row">
        <label for="businessName" class="col-form-label">상호</label>
        <div class="col-sm-9">
          <input type="text"
                 id="businessName"
                 class="form-control w-100"
                 placeholder="사업자등록증에 있는 상호 입력" />
        </div>
      </div>

      <div class="form-group row">
        <label for="ownerName" class="col-form-label">대표자명</label>
        <div class="col-sm-9">
          <input type="text"
                 id="ownerName"
                 class="form-control w-auto"
                 placeholder="홍길동" />
        </div>
      </div>

      <div class="form-group row">
        <label for="businessAddress" class="col-form-label">사업장 소재지</label>
        <div class="col-sm-9">
          <input type="text"
                 id="businessAddress"
                 class="form-control w-100"
                 placeholder="부산 해운대구 APEC로 17" />
        </div>
      </div>

      <div class="form-group row">
        <label for="businessStatus" class="col-form-label">업태</label>
        <div class="col-sm-9">
          <input type="text"
                 id="businessStatus"
                 class="form-control w-auto"
                 placeholder="" />
        </div>
      </div>

      <div class="form-group row">
        <label for="businessCategory" class="col-form-label">업종</label>
        <div class="col-sm-9">
          <input type="text"
                 id="businessCategory"
                 class="form-control w-auto"
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
                 placeholder="" />
        </div>
      </div>

      <div class="form-group row">
        <label for="originAddress" class="col-form-label">배송 출고지</label>
        <div class="col-sm-9">
          <input type="text"
                 id="originAddress"
                 class="form-control w-100"
                 placeholder="부산 해운대구 APEC로 17" />
        </div>
      </div>

      <div class="form-group row">
        <label for="contactNumber" class="col-form-label">판매자 연락처</label>
        <div class="col-sm-9">
          <input type="text"
                 id="contactNumber"
                 class="form-control w-auto"
                 placeholder="-없이 입력" />
        </div>
      </div>

      <div class="form-group row">
        <label for="accountNumber" class="col-form-label">정산대금 입금계좌</label>
        <div class="col-sm-9">
          <input type="text"
                 id="accountNumber"
                 class="form-control w-auto"
                 placeholder="-없이 입력" />
        </div>
      </div>

      <div class="d-flex justify-content-end gap-2 mt-5">
        <button type="button" class="w-auto btn-primary border-0 rounded-1 px-4 py-2">완료</button>
        <button type="button" class="w-auto btn-light border-0 rounded-1 px-4 py-2">취소</button>
      </div>

    </div>
  </div>

</template>

<script setup>
  import {ref} from "vue";
  import Share from "../../layout/Share.vue";

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

  const file = ref({
    imageFiles: '',
  })
</script>

<style scoped>
.form-control::placeholder {
  color: lightsteelblue;
}
</style>