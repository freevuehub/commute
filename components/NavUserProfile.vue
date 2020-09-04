<template>
  <v-list-item class="px-2">
    <v-list-item-avatar>
      <v-img :src="userInfo.item.avatarUrl"></v-img>
    </v-list-item-avatar>

    <v-list-item-title>{{ userInfo.item.name }}</v-list-item-title>

    <v-btn icon to="/my-page">
      <v-icon>settings</v-icon>
    </v-btn>
  </v-list-item>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from '@vue/composition-api'
import { AuthConstant } from '~/constant'

export default defineComponent({
  setup(_, context) {
    const userInfo = reactive({
      item: computed(() => {
        return context.root.$store.getters[`auth/${AuthConstant.$Get.Profile}`]
      }),
    })

    return {
      userInfo,
    }
  },
})
</script>
