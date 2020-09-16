<template>
	<v-app dark>
		<v-main>
			<nuxt />
		</v-main>
		<default-footer />
		<snack-bar />
	</v-app>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from '@vue/composition-api'
import { SnackBar, DefaultFooter } from '~/components'
import instance, { AxiosRequestConfig } from '~/API/instance'

export default defineComponent({
	components: {
		DefaultFooter,
		SnackBar,
	},
	setup(_, context) {
		onBeforeMount(() => {
			instance.interceptors.request.use((config: AxiosRequestConfig) => {
				const { $cookies }: any = context.root

				config.headers = { authorization: $cookies.get('token') }

				return config
			})
		})
	},
})
</script>
