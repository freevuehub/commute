<template>
	<v-card class="mb-5" dark>
		<v-img
			class="white--text align-end"
			height="200px"
			src="https://lh3.ggpht.com/p/AF1QipMy3ma_xoft6AHOyzkoK3A4ZTU1tjtCVa7Xbp_c=s1024"
		>
			<v-card-title>{{ item.companyName }}</v-card-title>
		</v-img>
		<v-card-text>
			<row title="대표" class="mb-3">
				<span class="address body-1 font-weight-bold text-right">{{ item.companyLat }}</span>
			</row>
			<row title="연락처" class="mb-3">
				<span class="address body-1 font-weight-bold text-right">{{ item.companyLat }}</span>
			</row>
			<row title="우편번호" class="mb-3">
				<span class="address body-1 font-weight-bold text-right">{{ item.companyZipCode }}</span>
			</row>
			<row title="주소" class="mb-3">
				<span class="address body-1 font-weight-bold text-right">{{ item.companyAddress }}</span>
			</row>
			<row title="업종" class="mb-3">
				<span class="address body-1 font-weight-bold text-right">{{ item.companyLat }}</span>
			</row>
			<row title="홈페이지">
				<span class="address body-1 font-weight-bold text-right">{{ item.companyLat }}</span>
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
.address {
	width: 80%;
}
</style>
