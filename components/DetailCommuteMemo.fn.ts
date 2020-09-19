import { SetupContext, reactive, computed, ComputedRef } from '@vue/composition-api'
import { CommuteConstant, SnackConstant } from '~/constant'

interface IProps {
  comment: string
  memoEdit: boolean
}

interface IState {
  memo: string | null
}

interface IComputed {
  memo: ComputedRef<string[]>
}

export const useState = (props: IProps) =>
  reactive<IState>({
    memo: props.comment,
  })
export const useComputed = (props: IProps) =>
  reactive<IComputed>({
    memo: computed(() => {
      return props.comment ? props.comment.split(/\n/) : ['메모가 없습니다.']
    }),
  })

export const useMemoSave = (props: IProps, context: SetupContext, state: IState) => async () => {
  await context.root.$store.dispatch(`commute/${CommuteConstant.$Call.CommutePut}`, {
    id: context.root.$route.params.id,
    payload: {
      comment: state.memo,
    },
  })
  await context.root.$store.dispatch(`snackBar/${SnackConstant.$Call.Success}`, '수정되었습니다.')

  context.emit('close', !props.memoEdit)
}

export const useCommentWatch = (state: IState) => (value: string | null) => {
  state.memo = value
}
