<template>
  <tbody>
    <tr v-for="item in list" :key="item.id" @click.prevent="$emit('click', item.id)">
      <td>{{ item.date }}</td>
      <td>{{ item.companyName }}</td>
      <td>{{ item.startDate }}</td>
      <td>{{ item.endDate }}</td>
    </tr>
  </tbody>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    list: Array,
  },
})
</script>
