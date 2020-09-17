<template>
  <v-snackbar
    :timeout="computed.status.timeout"
    :value="computed.status.view"
    :color="computed.status.type"
    bottom
    multi-line
  >
    {{ computed.status.message }}
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="onSnackBarClose">닫기</v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { SetupContext, defineComponent } from '@vue/composition-api'
import { useComputed, useSnackBarClose } from './snack-bar.fn'

export default defineComponent({
  setup(_: {}, { root }: SetupContext) {
    const computed = useComputed(root)
    const onSnackBarClose = useSnackBarClose(root)

    return {
      computed,
      onSnackBarClose,
    }
  },
})
</script>
