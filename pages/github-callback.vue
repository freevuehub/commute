<template>
  <v-container fluid class="d-flex container d-flex">
    <v-progress-circular :size="70" :width="7" color="primary" indeterminate class="ma-auto" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'
import { AuthConstant, SnackConstant } from '~/constant'

export default defineComponent({
  layout: 'no-header',
  setup(_, context) {
    onMounted(async () => {
      try {
        const { code } = context.root.$route.query

        await context.root.$store.dispatch(`auth/${AuthConstant.$Call.GitHubSigin}`, code)

        context.root.$store.dispatch(`snackBar/${SnackConstant.$Call.Success}`, '환영합니다.')
        context.root.$router.push('/')
      } catch {
        context.root.$store.dispatch(
          `snackBar/${SnackConstant.$Call.Error}`,
          '에러가 발생했습니다. 잠시 후 다시 시도해주세요.'
        )
        context.root.$router.push('/signin')
      }
    })
  },
})
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}
</style>
