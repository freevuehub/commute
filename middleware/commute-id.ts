import { Context } from '@nuxt/types'
import { CommuteConstant } from '~/constant'
import { getCommuteItem } from '~/API'

export default async (context: Context) => {
  const { $cookies }: any = context.app

  try {
    const token = $cookies.get('token')

    const { result } = await getCommuteItem(context.params.id, token)

    context.app.store?.dispatch(`commute/${CommuteConstant.$Call.CommuteGetItem}`, result)
  } catch (err) {
    $cookies.remove('token')

    context.redirect('/signin')
  }
}
