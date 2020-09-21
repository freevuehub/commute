<template>
  <v-container fluid class="my-page-wrap">
    <v-dialog ref="dialog" v-model="state.itmeModal">
      <time-picker
        v-model="state.time"
        :min="computed.minTime"
        :max="computed.maxTime"
        @close="state.itmeModal = false"
        @save="onSaveClick"
      />
    </v-dialog>

    <v-dialog ref="dialog" v-model="state.lunchModal" max-width="400">
      <lunch-selector
        :start="computed.userInfo.lunchStartTime"
        :end="computed.userInfo.lunchEndTime"
      />
    </v-dialog>

    <v-dialog ref="dialog" v-model="state.dialog" persistent max-width="400">
      <company-card v-if="state.dialog" @close="state.dialog = false" @save="onCompanySave" />
    </v-dialog>

    <info-title :status="computed.userInfo.isWork" />

    <v-divider class="my-6"></v-divider>

    <div class="d-flex align-center">
      <h2 class="mb-2">노예 계약 현황</h2>
      <v-switch
        class="is-work-switch ma-0 ml-auto pa-0"
        color="primary"
        inset
        hide-details
        dense
        value
        :input-value="computed.userInfo.isWork"
        :loading="state.switchLoading"
        :disabled="state.switchLoading"
        @change="onSwitchChange"
      />
    </div>
    <info-detail :item="computed.userInfo" @click="onRowClick" />

    <transition-group name="fade">
      <template v-if="computed.userInfo.isWork">
        <div key="title" class="mb-2 d-flex align-center">
          <h2>주인마님 댁</h2>
          <v-btn small icon class="ml-1" @click="state.dialog = !state.dialog">
            <v-icon>search</v-icon>
          </v-btn>
        </div>
        <company-info key="content" :item="computed.userInfo.company" />
      </template>
    </transition-group>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import {
  useState,
  useComputed,
  useSwitchChange,
  useRowClick,
  useSaveClick,
  useCompanySave,
} from './my-page.fn'
import {
  DetailCompanyInfo,
  UserInfoTitle,
  UserInfoCommuteDetail,
  CommonTimePicker,
  CompanySearchCard,
  LunchTimeSelecter,
} from '~/components'

export default defineComponent({
  middleware: ['my-page'],
  components: {
    companyInfo: DetailCompanyInfo,
    infoTitle: UserInfoTitle,
    infoDetail: UserInfoCommuteDetail,
    timePicker: CommonTimePicker,
    companyCard: CompanySearchCard,
    lunchSelector: LunchTimeSelecter,
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(_, context) {
    const state = useState()
    const computed = useComputed(context, state)
    const onSwitchChange = useSwitchChange(context, state)
    const onRowClick = useRowClick(state, computed)
    const onSaveClick = useSaveClick(context, state)
    const onCompanySave = useCompanySave(context, state)

    return {
      state,
      computed,
      onSwitchChange,
      onRowClick,
      onSaveClick,
      onCompanySave,
    }
  },
})
</script>

<style lang="scss" scoped>
.my-page-wrap {
  overflow: hidden;

  .is-work-switch {
    width: 44px;
  }
  .fade-enter-active {
    animation: fade-up 0.5s;

    @keyframes fade-scale-up {
      0% {
        opacity: 1;
        transform: scale(1);
      }
      100% {
        opacity: 0;
        transform: scale(1.3);
      }
    }
  }
  .fade-leave-active {
    animation: fade-scale-up 0.5s;

    @keyframes fade-up {
      0% {
        opacity: 0;
        transform: translateY(30px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
}
</style>
