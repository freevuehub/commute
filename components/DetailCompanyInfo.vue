<template>
  <v-card
    :class="[min ? 'ma-0' : 'mb-5', $round]"
    :elevation="outlined ? 0 : 10"
    :outlined="outlined"
  >
    <v-img class="white--text align-end" height="200px" :src="item.imgUrl || '/icon.png'">
      <v-card-title>{{ item.companyName }}</v-card-title>
    </v-img>
    <v-card-text>
      <row title="대표" class="mb-3">
        <span class="row-item body-1 font-weight-bold text-right">{{ item.ceoName }}</span>
      </row>
      <row v-if="!min && item.contact" title="연락처" :class="!min && 'mb-3'">
        <v-btn color="primary" :href="`tel:${item.contact}`" class="text-right pa-0" text x-small>
          <span class="body-1 font-weight-bold">{{ item.contact }}</span>
        </v-btn>
      </row>
      <row v-if="!min" title="우편번호" class="mb-3">
        <span class="row-item body-1 font-weight-bold text-right">{{ item.companyZipCode }}</span>
      </row>
      <row v-if="!min" title="주소" class="mb-3">
        <span class="row-item body-1 font-weight-bold text-right">{{ item.companyAddress }}</span>
      </row>
      <row title="산업" :class="!min && 'mb-3'">
        <span class="row-item body-1 font-weight-bold text-right">{{ item.industryName }}</span>
      </row>
      <row v-if="!min" title="홈페이지">
        <v-btn color="primary" :href="item.webPage" class="text-right pa-0" text x-small>
          <span class="body-1 font-weight-bold text-lowercase">{{ item.webPage }}</span>
        </v-btn>
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
    min: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss">
.row-item {
  width: 80%;
}
</style>
