<template>
	<v-app dark>
		<v-navigation-drawer v-model="state.drawer" fixed app>
			<profile />
			<v-divider></v-divider>
			<nav-list />
			<template v-slot:append>
				<div class="pa-2">
					<v-btn outlined block @click="onSiginOutClick">Logout</v-btn>
				</div>
			</template>
		</v-navigation-drawer>
		<v-app-bar fixed app color="primary">
			<v-app-bar-nav-icon @click.stop="state.drawer = !state.drawer" />
			<v-spacer />
			<v-toolbar-title v-text="title.str" />
		</v-app-bar>
		<v-main>
			<nuxt />
		</v-main>
		<default-footer />
		<snack-bar />
	</v-app>
</template>

<script lang="ts">
import 'vuetify/dist/vuetify.min.css'

import { defineComponent, onMounted, onBeforeMount } from '@vue/composition-api'
import {
	useState,
	useComputed,
	useSiginOutClick,
	useBeforeMount,
	useMounted,
} from '~/layouts.fn/default.fn'
import { SnackBar, DefaultFooter, NavList, NavUserProfile } from '~/components'

export default defineComponent({
	middleware: ['auth'],
	components: {
		profile: NavUserProfile,
		DefaultFooter,
		SnackBar,
		NavList,
	},
	setup(_, context) {
		const state = useState()
		const title = useComputed(context)
		const onSiginOutClick = useSiginOutClick(context)

		onBeforeMount(useBeforeMount(context))
		onMounted(useMounted(context))

		return {
			state,
			title,
			onSiginOutClick,
		}
	},
})
</script>
