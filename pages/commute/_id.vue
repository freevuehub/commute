<template>
  <v-container fluid>
    {{ $route.params.id }}
    {{ computed.commuteItem.companyName }}
    {{ computed.commuteItem.startDate }}
    {{ computed.commuteItem.endDate }}
  </v-container>
</template>

<script lang="ts">
import { defineComponent, SetupContext, onBeforeMount } from '@vue/composition-api'
import { useComputed, useBeforeMounted } from './id.fn'

export default defineComponent({
  setup(_: {}, vm: SetupContext) {
    const computed = useComputed(vm)

    onBeforeMount(useBeforeMounted(vm))

    return {
      computed,
    }
  },
})
</script>
