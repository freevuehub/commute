import { Context } from '@nuxt/types'
import { MainConstant } from '~/constant'
import { getMainData } from '~/API'

export default async (context: Context) => {
  const { $cookies }: any = context.app

  try {
    const token = $cookies.get('token')

    const { result } = await getMainData(token)

    context.app.store?.dispatch(`main/${MainConstant.$Call.MainData}`, result)
  } catch (err) {
    $cookies.remove('token')

    context.redirect('/signin')
  }
}
