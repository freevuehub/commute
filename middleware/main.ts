import { Context } from '@nuxt/types'
import { MainConstant } from '~/constant'
import { getMainData, getMainTodayData, getMainWeekData, getMainMonthData } from '~/API'

export default async (context: Context) => {
  const { $cookies }: any = context.app

  try {
    const token = $cookies.get('token')

    const { result } = await getMainData(token)
    const { result: today } = await getMainTodayData(token)
    const { result: week } = await getMainWeekData(token)
    const { result: month } = await getMainMonthData(token)

    context.app.store?.dispatch(`main/${MainConstant.$Call.TodayData}`, today)
    context.app.store?.dispatch(`main/${MainConstant.$Call.WeekData}`, week)
    context.app.store?.dispatch(`main/${MainConstant.$Call.MonthData}`, month)
    context.app.store?.dispatch(`main/${MainConstant.$Call.MainData}`, result)
  } catch (err) {
    $cookies.remove('token')

    context.redirect('/signin')
  }
}
