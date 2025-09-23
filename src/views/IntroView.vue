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
              <div class="pa-4 text-center">
                <v-dialog
                  v-model="dialog"
                  max-width="600">
                <template v-slot:activator="{ props: activatorProps }">
                  <div>
                    <v-btn color="secondary" v-bind="activatorProps">경력추가</v-btn>
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
                      text="Save"
                      variant="tonal"
                      @click="dialog = false"
                    ></v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
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
                <v-btn>수정</v-btn>
                <v-btn>삭제</v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-tabs-window-item>

      <v-tabs-window-item value="Qualifications">
        <v-container fluid>
        <div class="pa-4 text-center">
                <v-dialog
                  v-model="dialog1"
                  max-width="600">
                <template v-slot:activator="{ props: activatorProps }">
                  <div>
                    <v-btn color="warning" v-bind="activatorProps">자격추가</v-btn>
                  </div>
                </template>
                <v-card
                  prepend-icon="mdi-account"
                  title="자격추가"
                >
                  <v-card-text>
                    <v-row dense>
                      <v-col>
                        <v-text-field
                          label="자격추가*"
                          required
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
                      @click="dialog1 = false"
                    ></v-btn>

                    <v-btn
                      color="primary"
                      text="Save"
                      variant="tonal"
                      @click="dialog1 = false"
                    ></v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
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
                  <v-btn>수정</v-btn>
                  <v-btn>삭제</v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-tabs-window-item>

        <v-tabs-window-item value="Skill">
          <v-container fluid>
          <div class="pa-4 text-center">
                <v-dialog
                  v-model="dialog2"
                  max-width="600">
                <template v-slot:activator="{ props: activatorProps }">
                  <div>
                    <v-btn color="primary" v-bind="activatorProps">스킬추가</v-btn>
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
                      text="Save"
                      variant="tonal"
                      @click="dialog2 = false"
                    ></v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
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
                    <v-btn>수정</v-btn>
                    <v-btn>삭제</v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'
  
  const tab = ref(null)

  const dialog = ref(false)
  const dialog1 = ref(false)
  const dialog2 = ref(false)
  
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