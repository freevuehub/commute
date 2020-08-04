<template>
  <v-card>
    <v-dialog
      ref="dialog"
      v-model="state.modal"
      :return-value.sync="state.date"
      persistent
      width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="state.date"
          label="출근일자"
          append-icon="event"
          v-bind="attrs"
          readonly
          full-width
          hide-details
          solo
          flat
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="state.date" color="primary" locale="ko" scrollable>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="state.modal = false">Cancel</v-btn>
        <v-btn text color="primary" @click="onDateDialogSave">OK</v-btn>
      </v-date-picker>
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import { SetupContext, defineComponent } from '@vue/composition-api'
import { useState, useDateDialogSave, IProps } from './date-picker-card.fn'

export default defineComponent({
  props: {
    date: String,
  },
  model: {
    prop: 'date',
    event: 'change',
  },
  setup(props: IProps, vm: SetupContext) {
    const state = useState(props)
    const onDateDialogSave = useDateDialogSave(state, vm)

    return {
      state,
      onDateDialogSave,
    }
  },
})
</script>
