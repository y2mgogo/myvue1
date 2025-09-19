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
         <!-- <v-list>
            <v-list-item> -->
              <v-container fluid>
                <v-row v-for="item in items1" :key="item.id">
                  <v-col>
                    <div class="text-center">
                      <v-chip
                          class="ma-2"
                          color="cyan"
                          label
                          >
                          <v-icon icon="$vuetify" start></v-icon>
                          {{ item.text }}
                      </v-chip>
                      <v-btn>삭제</v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            <!-- </v-list-item>
          </v-list> -->
      </v-tabs-window-item>

      <v-tabs-window-item value="Qualifications">
        <!-- <v-list>
          <v-list-item> -->
            <v-container fluid>
              <v-row v-for="item in items2" :key="item.id">
                <v-col>
                  <div class="text-center">
                      <v-chip
                          class="ma-2"
                          color="pink"
                          label
                          >
                          <v-icon icon="mdi-label" start></v-icon>
                          {{ item.text }}
                      </v-chip>
                      <v-btn>삭제</v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            <!-- </v-list-item>
          </v-list> -->
        </v-tabs-window-item>

        <v-tabs-window-item value="Skill">
         <!--  <v-list>
            <v-list-item> -->
              <v-container fluid>
                <v-row v-for="item in items3" :key="item.id">
                  <v-col>
                    <div class="text-center">
                        <v-chip
                            class="ma-2"
                            color="primary"
                            label
                            >
                            <v-icon icon="mdi-account-circle-outline" start></v-icon>
                            {{ item.text }}
                        </v-chip>
                        <v-btn>삭제</v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-container>
           <!--  </v-list-item>
          </v-list> -->
        </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'
  
  const tab = ref(null)
  
  const items1 = ref([
    { id: 1, text: '프로젝트1' },
    { id: 2, text: '프로젝트2' },
    { id: 3, text: '프로젝트3' },
  ]);
  
  const items2 = ref([
    { id: 1, text: '자격증1' },
    { id: 2, text: '자격증2' },
    { id: 3, text: '자격증3' },
  ]);
  
  const items3 = ref([
    { id: 1, text: '스킬1' },
    { id: 2, text: '스킬2' },
    { id: 3, text: '스킬3' },
  ]);
  
</script>