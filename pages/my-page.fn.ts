import { reactive, computed, ComputedRef } from '@vue/composition-api'

interface IState {
  switch1: boolean
  joblessMessageList: string[]
  workMessageList: string[]
}

interface IComputedItem {
  joblessMessage: string
  workMessage: string
}

interface IComputed {
  joblessMessage: ComputedRef<IComputedItem['joblessMessage']>
  workMessage: ComputedRef<IComputedItem['workMessage']>
}

export const useState = () =>
  reactive<IState>({
    switch1: true,
    joblessMessageList: ['도비 is Free!', '안녕히계세요. 여러분!'],
    workMessageList: [
      '카드값 벌어야죠.',
      '오늘도 출근을...',
      '퇴근은 안옵니다.',
      'Look Down!!',
      '월급 = 충성도',
    ],
  })

export const useComputed = (state: IState) =>
  reactive<IComputed>({
    joblessMessage: computed(() => {
      const randomNumber = Math.floor(Math.random() * state.joblessMessageList.length)

      return state.joblessMessageList[randomNumber]
    }),
    workMessage: computed(() => {
      const randomNumber = Math.floor(Math.random() * state.workMessageList.length)

      return state.workMessageList[randomNumber]
    }),
  })
