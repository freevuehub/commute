<template>
  <v-card :class="$round" elevation="10" color="primary">
    <v-card-title>
      <span class="font-weight-bold">{{ title }}</span>
      <v-btn v-if="edit" icon x-small absolute right center>
        <v-icon>delete</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text class="text-center">
      <v-progress-circular :size="100" :width="20" :value="value" color="white">
        {{ value }}%
      </v-progress-circular>
    </v-card-text>
  </v-card>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '',
    },
    edit: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Number,
      default: 0,
    },
  },
})
</script>
