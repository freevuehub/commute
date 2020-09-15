import { reactive, computed, ComputedRef, SetupContext } from '@vue/composition-api'
import dayjs from 'dayjs'
import { AuthConstant } from '~/constant'
import { IUserInfo } from '~/types'

interface IState {
  isWork: boolean
}

interface IComputedItem {
  userInfo: IUserInfo
}

interface IComputed {
  userInfo: ComputedRef<IComputedItem['userInfo']>
}

const buildTimeSet = (time: string) => `${dayjs().format('YYYY-MM-DD')} ${time}`

export const useState = () =>
  reactive<IState>({
    isWork: true,
  })

export const useComputed = (context: SetupContext) =>
  reactive<IComputed>({
    userInfo: computed(() => {
      const infoData: IUserInfo = context.root.$store.getters[`auth/${AuthConstant.$Get.Info}`]

      return {
        ...infoData,
        workStartTime: infoData.workStartTime
          ? dayjs(buildTimeSet(infoData.workStartTime)).format('HH:mm')
          : 'N/A',
        workEndTime: infoData.workEndTime
          ? dayjs(buildTimeSet(infoData.workEndTime)).format('HH:mm')
          : 'N/A',
      }
    }),
  })
