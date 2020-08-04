import { reactive, computed } from '@vue/composition-api'

export interface IProps {
  dateTime: string
  type: string
}

export const useComputed = (props: IProps) =>
  reactive({
    type: computed(() => {
      return props.type === 'start' ? '출근' : props.type === 'end' ? '퇴근' : 'N/A'
    }),
    isDate: computed(() => {
      return !!props.dateTime && props.dateTime !== 'N/A'
    }),
  })

export const useTextComputed = (compute: { type: string; isDate: boolean }) =>
  reactive({
    btnText: computed(() => {
      return `${compute.type} ${compute.isDate ? '완료' : ''}`
    }),
  })
