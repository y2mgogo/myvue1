<template>
    <div class="pa-4 text-center">
    <v-dialog
        v-model="dialog"
        max-width="600"
        :dataType="dataType1">
    <template v-slot:activator="{ props: activatorProps }">
        <div>
        <v-btn color="secondary" v-bind="activatorProps" @click="btnTextChg">경력추가</v-btn>
        </div>
    </template>
        <v-card
            prepend-icon="mdi-account"
            title="경력추가"
        >
            <v-card-text>
            <v-row dense>
                <v-col>
                <v-text-field
                    label="경력추가*"
                    required
                    v-model="career"
                ></v-text-field>
                </v-col>
            </v-row>
            </v-card-text>
        
            <v-divider></v-divider>
        
            <v-card-actions>
            <v-spacer></v-spacer>
        
            <v-btn
                text="Close"
                variant="plain"
                @click="dialog = false"
            ></v-btn>
        
            <v-btn
                color="primary"
                variant="tonal"
                @click="submitData"
            >{{ btnText }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    </div>
</template>

<script setup>
import { ref, defineEmits, defineExpose } from 'vue'
import axios from 'axios';

const emit = defineEmits(['child-click']);

const career = ref('');
const btnText = ref('Save');
const dataType = '1';// 1:경력컨텐츠 2:자격컨텐츠 3:스킬컨텐츠

let dialogType = 'I'; // I:입력 U:수정
//수정시 id 저장
let index = '';
//수정시 이전컨텐츠 내용 저장
let prevContent = '';

let dialog = ref(false)

//다이얼로그 오픈시 버튼텍스트 변경 저장:Save 수정:Modi
function btnTextChg() {
  btnText.value = 'Save';
}

function openDialog(content,id) {
  btnText.value = 'Modi'
  //중복체크를 위한 이전컨텐츠 내용 저장
  prevContent = content;
  dialog.value = true;
  console.log('contnet, '+content)
  console.log('id, '+id)
  career.value = content;
  dialogType = 'U';
  index = id;
}

function closeDialog() {
  dialog.value = false;
}

defineExpose({
  openDialog,
  closeDialog
});

const submitData = async () => {
  try {
    if ( career.value === '' || career.value === null ) {
        alert('내용을 작성 하세요.');
        return false;
    } else {

        if ( dialogType === 'I' ) {
            
            const response = await axios.post('/regist', { // '/api/users'를 실제 엔드포인트 URL로 변경
              career: career.value,
              dataType: dataType
            },{ headers : {
                'Content-Type': 'application/json'
            }});
            console.log('데이터 저장 성공:', response.data);
            alert('데이터가 성공적으로 저장되었습니다!');
        } else if ( dialogType === 'U' ) {
            if ( prevContent === career.value ) {
              alert('변경된 내용이 존재하지 않습니다.');
              return false;
            } else {
              const response = await axios.post('/modify', { // '/api/users'를 실제 엔드포인트 URL로 변경
                career: career.value,
                id: index,
                dataType: dataType
              },{ headers : {
                  'Content-Type': 'application/json'
              }});
              console.log('데이터 수정 성공:', response.data);
              alert('데이터가 성공적으로 수정되었습니다!');
            }
        }

        // 성공 시 폼 초기화 또는 다른 작업 수행
        career.value = '';
        emit('child-click','1');
        dialog.value = false;
    }
    
  } catch (error) {
    console.error('데이터 저장 오류:', error);
    alert('데이터 저장 중 오류가 발생했습니다.');
  }
};
</script>