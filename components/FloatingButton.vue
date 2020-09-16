<template>
	<v-speed-dial
		v-model="state.active"
		fixed
		bottom
		right
		direction="top"
		transition="slide-y-reverse-transition"
	>
		<template v-slot:activator>
			<v-btn v-model="state.active" color="primary" dark fab>
				<v-icon v-if="state.active">mdi-close</v-icon>
				<v-icon v-else>more_horiz</v-icon>
			</v-btn>
		</template>
		<v-btn rounded dark color="indigo" :disabled="disabledEnd" @click="onCommuteBtnClick('퇴근')"
			>퇴근</v-btn
		>
		<v-btn rounded dark color="green" :disabled="disabledStart" @click="onCommuteBtnClick('출근')"
			>출근</v-btn
		>
	</v-speed-dial>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext } from '@vue/composition-api'

export default defineComponent({
	props: {
		disabledStart: Boolean,
		disabledEnd: Boolean,
	},
	setup(_: {}, { emit }: SetupContext) {
		const state = reactive({
			active: false,
		})
		const onCommuteBtnClick = (key: string) => {
			emit('click', key)
		}

		return {
			state,
			onCommuteBtnClick,
		}
	},
})
</script>
