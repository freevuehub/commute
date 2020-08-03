<template>
  <v-container fluid>
    <v-simple-table class="mb-5">
      <template v-slot:default>
        <thead>
          <tr>
            <th v-for="item in state.headers" :key="item.value">{{ item.text }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in computed.commuteList" :key="item.id">
            <td>{{ item.date }}</td>
            <td>{{ item.startDate }}</td>
            <td>{{ item.endDate }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, SetupContext } from '@vue/composition-api'
import { useState, useComputed, useBeforeMounted } from './commute.fn'

export default defineComponent({
  setup(_: {}, vm: SetupContext) {
    const state = useState()
    const computed = useComputed(vm)
    const getColor = (calories: number) => {
      if (calories > 400) return 'red'
      else if (calories > 200) return 'orange'
      else return 'green'
    }

    onBeforeMount(useBeforeMounted(vm))

    return {
      state,
      computed,
      getColor,
    }
  },
})
</script>
