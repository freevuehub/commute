import { SetupContext, reactive, computed, ComputedRef } from '@vue/composition-api'
import { CommuteConstant, SnackConstant } from '~/constant'

interface IProps {
  comment: string
}

interface IState {
  memo: string | null
  editOn: boolean
}

interface IComputed {
  memo: ComputedRef<string[]>
}

export const useState = (props: IProps) =>
  reactive<IState>({
    memo: props.comment,
    editOn: false,
  })
export const useComputed = (props: IProps) =>
  reactive<IComputed>({
    memo: computed(() => {
      return props.comment ? props.comment.split(/\n/) : ['메모가 없습니다.']
    }),
  })

export const useMemoSave = (context: SetupContext, state: IState) => async () => {
  await context.root.$store.dispatch(`commute/${CommuteConstant.$Call.CommutePut}`, {
    id: context.root.$route.params.id,
    payload: {
      comment: state.memo,
    },
  })
  await context.root.$store.dispatch(`snackBar/${SnackConstant.$Call.Success}`, '수정되었습니다.')

  state.editOn = false
}

export const useCommentWatch = (state: IState) => (value: string | null) => {
  state.memo = value
}
