import { SetupContext, reactive } from '@vue/composition-api'
import dayjs from 'dayjs'
import { AuthConstant, CommuteConstant, SnackConstant, MainConstant } from '~/constant'
import { getMainData } from '~/API'

interface IState {
  time: string
}

const updateNowTime = (state: IState) => () => {
  state.time = dayjs().format('HH시 mm분 ss초')
}

export const useState = () =>
  reactive({
    time: dayjs().format('HH시 mm분 ss초'),
  })

// export const useCommuteBtnClick = (context: SetupContext) => (key: string) => {
//   context.emit('click', key)
// }

export const useBeforeMount = (state: IState) => () => {
  setInterval(updateNowTime(state), 1000)
}

// export const useCommuteTimeSave = (context: SetupContext, state: IState, props: any) => async (
export const useCommuteBtnClick = (context: SetupContext, id: string, state: IState) => async (
  key: string
) => {
  try {
    const time = dayjs().format('HH:mm:00')
    const date = dayjs().format('YYYY-MM-DD')
    const { companyId } = context.root.$store.getters[`auth/${AuthConstant.$Get.Profile}`]

    switch (key) {
      case '출근':
        await context.root.$store.dispatch(`commute/${CommuteConstant.$Call.CommutePost}`, {
          companyId,
          startDate: `${date} ${time}`,
          endDate: null,
          comment: null,
          tags: null,
        })

        break
      case '퇴근':
        await context.root.$store.dispatch(`commute/${CommuteConstant.$Call.CommutePut}`, {
          id,
          payload: {
            endDate: `${date} ${time}`,
          },
        })

        break
    }

    const { result } = await getMainData()

    context.root.$store.dispatch(`main/${MainConstant.$Call.MainData}`, result)
    context.root.$store.dispatch(
      `snackBar/${SnackConstant.$Call.Success}`,
      `${time}에 ${key}하셨습니다.`
    )

    context.emit('close')
  } catch {
    context.root.$store.dispatch(`snackBar/${SnackConstant.$Call.Error}`, '에러가 발생했습니다.')
  }
}
