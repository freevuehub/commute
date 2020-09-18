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
    <bar @click="state.drawer = !state.drawer" />
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
import { SnackBar, DefaultFooter, NavList, NavUserProfile, AppBar } from '~/components'

export default defineComponent({
  middleware: ['auth'],
  components: {
    profile: NavUserProfile,
    DefaultFooter,
    SnackBar,
    NavList,
    bar: AppBar,
  },
  setup(_, context) {
    const state = useState()
    const computed = useComputed()
    const onSiginOutClick = useSiginOutClick(context)

    onBeforeMount(useBeforeMount(context))
    onMounted(useMounted(context))

    return {
      state,
      computed,
      onSiginOutClick,
    }
  },
})
</script>

<style lang="scss">
.simple-list {
  table {
    width: max-content !important;
  }
}
</style>
