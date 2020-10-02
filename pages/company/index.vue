<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <search v-model="state.company" title="회사 검색" />
      </v-col>
      <v-col cols="12">
        <v-card :class="$round" elevation="10">
          <v-card-title>회사 등록 요청</v-card-title>
          <v-card-text>
            <v-tabs v-model="state.tab" background-color="transparent" color="primary" grow>
              <v-tab>URL 입력</v-tab>
              <v-tab>직접 입력</v-tab>
            </v-tabs>
            <v-card outlined>
              <v-tabs-items v-model="state.tab">
                <v-tab-item key="URL 입력">
                  <v-card flat :class="$round">
                    <v-card-text>
                      <v-form ref="form" v-model="state.valid" lazy-validation>
                        <v-text-field label="잡플래닛 URL" dense outlined></v-text-field>
                        <v-btn color="primary" small>
                          요청
                        </v-btn>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item key="직접 입력">
                  <v-card flat :class="$round">
                    <v-card-text>
                      <v-form ref="form" v-model="state.valid" lazy-validation>
                        <v-text-field label="회사 이름" dense outlined></v-text-field>
                        <v-text-field label="회사 이름" dense outlined></v-text-field>
                        <v-text-field label="회사 이름" dense outlined></v-text-field>
                        <v-btn color="primary" small>
                          요청
                        </v-btn>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
import { CompanySearch } from '~/components'

export default defineComponent({
  components: {
    search: CompanySearch,
  },
  setup() {
    const state = reactive({
      company: {
        id: 0,
        ceoName: '',
        companyAddress: '',
        companyEsName: null,
        companyLat: null,
        companyLong: null,
        companyName: '',
        companyZipCode: 0,
        contact: '',
        establishmenDate: '',
        webPage: null,
        imgUrl: null,
        industryName: '',
      },
      valid: false,
      tab: '',
    })

    return {
      state,
    }
  },
})
</script>
