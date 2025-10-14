<template>
  <v-card>
    <v-tabs
      v-model="tab"
      align-tabs="center"
      color="deep-purple-accent-4"
    >
      <v-tab value="Experience">Experience</v-tab>
      <v-tab value="Qualifications">Qualifications</v-tab>
      <v-tab value="Skill">Skill</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="Experience">
          <v-container fluid>
            <IntroViewPop1 @child-click="handleChildClick" ref="childRef" />
          <v-row v-for="item in result1" :key="item.id">
            <v-col>
              <div class="text-center">
                <v-chip
                    class="ma-2"
                    color="cyan"
                    label
                    >
                    <v-icon icon="$vuetify" start></v-icon>
                    {{ item.content }}
                </v-chip>
                <v-btn @click="triggerChildDialog(item.content,item.id)">수정</v-btn>
                <v-btn @click="deleteData(item.content,item.id,'1')">삭제</v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-tabs-window-item>

      <v-tabs-window-item value="Qualifications">
        <v-container fluid>
          <IntroViewPop2 @child-click2="handleChildClick" ref="childRef2" />
          <v-row v-for="item in result2" :key="item.id">
            <v-col>
              <div class="text-center">
                  <v-chip
                      class="ma-2"
                      color="pink"
                      label
                      >
                      <v-icon icon="mdi-label" start></v-icon>
                      {{ item.content }}
                  </v-chip>
                  <v-btn @click="triggerChildDialog2(item.content,item.id)">수정</v-btn>
                  <v-btn @click="deleteData(item.content,item.id,'2')">삭제</v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-tabs-window-item>

        <v-tabs-window-item value="Skill">
          <v-container fluid>
            <IntroViewPop3 @child-click3="handleChildClick" ref="childRef3" />
            <v-row v-for="item in result3" :key="item.id">
              <v-col>
                <div class="text-center">
                   <v-chip
                      class="ma-2"
                        color="primary"
                        label
                        >
                        <v-icon icon="mdi-account-circle-outline" start></v-icon>
                        {{ item.content }}
                    </v-chip>
                    <v-btn @click="triggerChildDialog3(item.content,item.id)">수정</v-btn>
                    <v-btn @click="deleteData(item.content,item.id,'3')">삭제</v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import IntroViewPop1 from '@/components/IntroViewPop1.vue';
  import IntroViewPop2 from '@/components/IntroViewPop2.vue';
  import IntroViewPop3 from '@/components/IntroViewPop3.vue';
  import axios from 'axios';
  
  const tab = ref(null)
  const result1 = ref([]);
  const result2 = ref([]);
  const result3 = ref([]);

  let index = '';

  const childRef = ref(null);
  const childRef2 = ref(null);
  const childRef3 = ref(null);

  function triggerChildDialog(content,id) {
    childRef.value.openDialog(content,id);
  }
  function triggerChildDialog2(content,id) {
    childRef2.value.openDialog1(content,id);
  }
  function triggerChildDialog3(content,id) {
    childRef3.value.openDialog2(content,id);
  }

  async function deleteData(content,id,type) {
    if ( id === '' || id === null || id === 'undefined' ) {
      alert('데이터 삭제 중 에러가 발생했습니다.');
      return false
    } else {
      index = id;
      const result = confirm(content+' 을(를) 삭제 하시겠습니까?');
      if ( result === true ) {        
        try {
          const deleteResult = await axios.post('/delete', { // '/api/users'를 실제 엔드포인트 URL로 변경
            id: index
          },{ headers : {
              'Content-Type': 'application/json'
          }});
          
          console.log('데이터 삭제 성공:', deleteResult.data);
          if ( type === '1' ) {
            dataSearch1();
          } else if ( type === '2' ) {
            dataSearch2();
          } else {
            dataSearch3();
          }
          //window.location.reload();
        } catch (error) {
          console.error('데이터 삭제 오류:', error);
          alert('데이터 삭제 중 오류가 발생했습니다.');
        }
      } else {
        return false
      }
    }
  }

  const parentMessage = ref('');

  const handleChildClick = (dataFromChild) => {
    parentMessage.value = dataFromChild;
    console.log(parentMessage.value); // "자식으로부터 전달된 데이터"
    if ( parentMessage.value === '1' ) {
      dataSearch1();
    } else if ( parentMessage.value === '2' ) {
      dataSearch2();
    } else {
      dataSearch3();
    }
    //window.location.reload();
  };
  async function dataSearch1() {

    //경력데이터 조회
    try {
      const items1 = await axios.post('/select', { // '/api/users'를 실제 엔드포인트 URL로 변경
        dataType: '1'
      },{ headers : {
          'Content-Type': 'application/json'
      }});
      result1.value = items1.data;
      console.log('데이터1 조회 성공:', items1.data);
    } catch (error) {
      console.error('데이터1 조회 오류:', error);
      alert('데이터1 조회 중 오류가 발생했습니다.');
    }
  }
  async function dataSearch2() {
    //자격데이터 조회
    try {
      const items2 = await axios.post('/select', { // '/api/users'를 실제 엔드포인트 URL로 변경
        dataType: '2'
      },{ headers : {
          'Content-Type': 'application/json'
      }});
      result2.value = items2.data; 
      console.log('데이터2 조회 성공:', items2.data);
    } catch (error) {
      console.error('데이터2 조회 오류:', error);
      alert('데이터2 조회 중 오류가 발생했습니다.');
    }
  }

  async function dataSearch3() {
    //스킬데이터 조회
    try {
      const items3 = await axios.post('/select', { // '/api/users'를 실제 엔드포인트 URL로 변경
        dataType: '3'
      },{ headers : {
          'Content-Type': 'application/json'
      }});
      result3.value = items3.data;
      console.log('데이터3 조회 성공:', items3.data);
    } catch (error) {
      console.error('데이터3 조회 오류:', error);
      alert('데이터3 조회 중 오류가 발생했습니다.');
    }
  }

  onMounted(() => {
    dataSearch1();
    dataSearch2();
    dataSearch3();
  });
  
</script>