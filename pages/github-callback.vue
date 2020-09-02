<template>
  <div>callback</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'
import { AuthConstant } from '~/constant'

export default defineComponent({
  setup(_, context) {
    onMounted(() => {
      const { code } = context.root.$route.query

      context.root.$store.dispatch(`auth/${AuthConstant.$Call.GitHubSigin}`, code)
    })
  },
})
</script>
