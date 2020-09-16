<template>
	<v-footer :fixed="computed.breakPoint.lg" :absolute="!computed.breakPoint.lg" app class="pa-3">
		<strong class="mr-3">FreeVue</strong>
		Copyright &copy; {{ state.year }}.
	</v-footer>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useState, useComputed } from './default-footer.fn'

export default defineComponent({
	name: 'DefaultFooter',
	setup(_, context) {
		const state = useState()
		const computed = useComputed(context)

		return {
			state,
			computed,
		}
	},
})
</script>
