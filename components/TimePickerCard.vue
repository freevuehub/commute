<template>
	<v-card>
		<v-time-picker color="primary" :value="time" format="ampm" full-width @change="onTimeChange" />
	</v-card>
</template>

<script lang="ts">
import { SetupContext, defineComponent } from '@vue/composition-api'

interface IProps {
	time: string
}

export default defineComponent({
	props: {
		time: String,
	},
	model: {
		prop: 'time',
		event: 'change',
	},
	setup<IProps>(_: IProps, { emit }: SetupContext) {
		const onTimeChange = (value: string) => {
			emit('change', value)
		}

		return {
			onTimeChange,
		}
	},
})
</script>
