import { reactive, computed } from '@vue/composition-api'
import { MainConstant } from '~/constant'

export interface IProps {
  date: string
}

export interface IState extends IProps {
  modal: boolean
}

export const useState = (props: IProps) =>
  reactive<IState>({
    modal: false,
    date: props.date,
  })

export const useComputed = ({ root }: any) =>
  reactive({
    mainData: computed(() => root.$store.getters[MainConstant.$Get.MainData]),
  })

export const useDateDialogSave = (state: IState, { refs, emit }: any) => () => {
  refs.dialog.save(state.date)

  emit('change', state.date)
}
