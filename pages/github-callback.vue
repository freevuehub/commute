<template>
  <div>callback</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'
import { AuthConstant } from '~/constant'

export default defineComponent({
  layout: 'no-header',
  setup(_, context) {
    onMounted(async () => {
      const { code } = context.root.$route.query

      await context.root.$store.dispatch(`auth/${AuthConstant.$Call.GitHubSigin}`, code)

      context.root.$router.push('/')
    })
  },
})
</script>
