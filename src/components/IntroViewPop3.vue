<template>
    <div class="pa-4 text-center">
    <v-dialog
        v-model="dialog2"
        max-width="600"
        :dataType="dataType3">
    <template v-slot:activator="{ props: activatorProps }">
        <div>
        <v-btn color="primary" v-bind="activatorProps" @click="btnTextChg">스킬추가</v-btn>
        </div>
    </template>
    <v-card
        prepend-icon="mdi-account"
        title="스킬추가"
    >
        <v-card-text>
        <v-row dense>
            <v-col>
            <v-text-field
                label="스킬추가*"
                required
                v-model="skill"
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
            @click="dialog2 = false"
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

const emit = defineEmits(['child-click3']);

const skill = ref('');
const btnText = ref('Save');
const dataType = '3';

let dialogType = 'I'
let index = '';
let prevContent = ''

let dialog2 = ref(false)
function btnTextChg() {
    btnText.value = 'Save';
}

function openDialog2(content,id){
    btnText.value = 'Modi';
    prevContent = content;
    dialog2.value= true;
    console.log('content, '+content)
    console.log('id, '+id)
    skill.value = content;
    dialogType = 'U';
    index = id;
}

function closeDialog2() {
    dialog2.value = false;
}

defineExpose({
    openDialog2,
    closeDialog2
});

const submitData = async () => {
    try {
        if ( skill.value === '' || skill.value === null ) {
            alert('내용을 작성 하세요.');
            return false;
        } else {
            if ( dialogType === 'I' ) {
            
                const response = await axios.post('/regist', { // '/api/users'를 실제 엔드포인트 URL로 변경
                career: skill.value,
                dataType: dataType
                },{ headers : {
                    'Content-Type': 'application/json'
                }});
                console.log('데이터 저장 성공:', response.data);
                alert('데이터가 성공적으로 저장되었습니다!');
            } else if ( dialogType === 'U' ) {
                if ( prevContent === skill.value ) {
                    alert('변경된 내용이 존재하지 않습니다.')
                    return false;
                } else {

                    const response = await axios.post('/modify', { // '/api/users'를 실제 엔드포인트 URL로 변경
                    career: skill.value,
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
            skill.value = '';
            emit('child-click3','3');
            dialog2.value = false;
        } 
        
    } catch (error) {
        console.error('데이터 저장 오류:',error);
        alert('데이터 저장 중 오류가 발생했습니다.');
    }
}
</script>