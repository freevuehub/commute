<template>
  <v-card class="mb-5" dark>
    <v-img class="white--text align-end" height="200px" :src="item.imgUrl || '/icon.png'">
      <v-card-title>{{ item.companyName }}</v-card-title>
    </v-img>
    <v-card-text>
      <row title="대표" class="mb-3">
        <span class="row-item body-1 font-weight-bold text-right">{{ item.ceoName }}</span>
      </row>
      <row title="연락처" class="mb-3">
        <span class="row-item text-right">
          <v-btn
            color="primary"
            :href="`tel:${item.contact}`"
            class="body-1 font-weight-bold text-right pa-0"
            text
            x-small
            >{{ item.contact }}</v-btn
          >
        </span>
      </row>
      <row title="우편번호" class="mb-3">
        <span class="row-item body-1 font-weight-bold text-right">{{ item.companyZipCode }}</span>
      </row>
      <row title="주소" class="mb-3">
        <span class="row-item body-1 font-weight-bold text-right">{{ item.companyAddress }}</span>
      </row>
      <row title="산업" class="mb-3">
        <span class="row-item body-1 font-weight-bold text-right">{{ item.industryName }}</span>
      </row>
      <row title="홈페이지">
        <span class="row-item body-1 font-weight-bold text-right">
          <v-btn
            color="primary"
            :href="item.webPage"
            class="body-1 font-weight-bold text-right pa-0 text-lowercase"
            text
            x-small
            target="_blank"
            >{{ item.webPage }}</v-btn
          >
        </span>
      </row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { CommuteDetailRow } from './'

export default defineComponent({
  components: {
    row: CommuteDetailRow,
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
})
</script>

<style lang="scss">
.row-item {
  width: 80%;
}
</style>
