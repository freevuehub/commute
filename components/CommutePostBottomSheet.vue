<template>
  <v-card tile elevation="10">
    <v-card-title>
      기록해주세요.
    </v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="indigo" :disabled="disabledStart" @click="onCommuteBtnClick('출근')">
        출근
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="green" :disabled="disabledEnd" @click="onCommuteBtnClick('퇴근')">
        퇴근
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'

export default defineComponent({
  props: {
    disabledStart: Boolean,
    disabledEnd: Boolean,
  },
  setup(_: {}, { emit }: SetupContext) {
    const onCommuteBtnClick = (key: string) => {
      emit('click', key)
    }

    return {
      onCommuteBtnClick,
    }
  },
})
</script>
