<template>
  <v-container fluid>{{ $route.params.id }}</v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({})
</script>
