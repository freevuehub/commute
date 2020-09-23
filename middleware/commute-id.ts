import { CommuteConstant } from '~/constant'
import { getCommuteItem } from '~/API'

export default async (context: any) => {
  const {
    app: { $cookies, store },
    redirect,
  }: any = context

  try {
    const token = $cookies.get('token')

    const { result } = await getCommuteItem(context.params.id, token)

    store.dispatch(`commute/${CommuteConstant.$Call.CommuteGetItem}`, result)
  } catch (err) {
    $cookies.remove('token')

    redirect('/signin')
  }
}
