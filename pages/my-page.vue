<template>
	<v-container fluid>
		<v-dialog ref="dialog" v-model="state.itmeModal">
			<v-time-picker v-if="state.itmeModal" v-model="state.time" full-width color="primary">
				<v-spacer></v-spacer>
				<v-btn text color="primary" @click="state.itmeModal = false">닫기</v-btn>
				<v-btn text color="primary" @click="onSaveClick">저장</v-btn>
			</v-time-picker>
		</v-dialog>

		<info-title :status="computed.userInfo.isWork" />

		<v-divider class="my-6"></v-divider>

		<h2 class="mb-2 d-flex align-center">
			노예 계약 현황
			<v-switch
				class="is-work-switch ma-0 ml-auto pa-0"
				color="primary"
				inset
				hide-details
				dense
				value
				:input-value="computed.userInfo.isWork"
				:loading="state.switchLoading"
				:disabled="state.switchLoading"
				@change="onSwitchChange"
			/>
		</h2>
		<info-detail :item="computed.userInfo" @click="onRowClick" />

		<h2 class="mb-2">주인마님 댁</h2>
		<company-info :item="computed.userInfo" />
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useState, useComputed, useSwitchChange, useRowClick } from './my-page.fn'
import { DetailCompanyInfo, UserInfoTitle, UserInfoCommuteDetail } from '~/components'

export default defineComponent({
	middleware: ['my-page'],
	components: {
		companyInfo: DetailCompanyInfo,
		infoTitle: UserInfoTitle,
		infoDetail: UserInfoCommuteDetail,
	},
	props: {
		item: {
			type: Object,
			default: () => ({}),
		},
	},
	setup(_, context) {
		const state = useState()
		const computed = useComputed(context)
		const onSwitchChange = useSwitchChange(context, state)
		const onRowClick = useRowClick(state, computed)
		const onSaveClick = () => {}

		return {
			state,
			computed,
			onSwitchChange,
			onRowClick,
			onSaveClick,
		}
	},
})
</script>

<style lang="scss">
.is-work-switch {
	width: 44px;
}
</style>
