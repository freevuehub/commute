<template>
	<v-card class="mb-5">
		<v-card-text>
			<row class="mb-3" title="출근 시간">
				<span class="body-1 font-weight-bold">{{ item.startDate || 'N/A' }}</span>
			</row>
			<row class="mb-3" title="근무 시간">
				<span class="body-1 font-weight-bold">{{ item.totalWorkTime || 'N/A' }}</span>
			</row>
			<row title="퇴근 시간">
				<span class="body-1 font-weight-bold">{{ item.endDate || 'N/A' }}</span>
			</row>
		</v-card-text>
	</v-card>
</template>

<script>
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
