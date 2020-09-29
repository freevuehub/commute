<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card :class="$round" elevation="10">
          <v-card-title>회사 검색</v-card-title>
          <v-card-text>
            <search v-model="state.company" class="mb-3" />
            <v-expand-transition>
              <company v-if="state.company.companyName" :item="state.company" min outlined />
            </v-expand-transition>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card :class="$round" elevation="10">
          <v-card-title>회사 등록 요청</v-card-title>
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-card-text>
              <v-text-field label="회사 이름" dense outlined></v-text-field>
            </v-card-text>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
import { CompanyAutoSearchForm, DetailCompanyInfo } from '~/components'

export default defineComponent({
  components: {
    search: CompanyAutoSearchForm,
    company: DetailCompanyInfo,
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
    })

    return {
      state,
    }
  },
})
</script>
