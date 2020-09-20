<template>
  <v-snackbar
    :timeout="computed.status.timeout"
    :value="computed.status.view"
    :color="computed.status.type"
    bottom
    multi-line
    @input="onInput"
  >
    {{ computed.status.message }}
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="onSnackBarClose">닫기</v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useComputed, useSnackBarClose, useSnackBarInput } from './snack-bar.fn'

export default defineComponent({
  setup(_, context) {
    const computed = useComputed(context)
    const onSnackBarClose = useSnackBarClose(context)
    const onInput = useSnackBarInput(context)

    return {
      computed,
      onSnackBarClose,
      onInput,
    }
  },
})
</script>
