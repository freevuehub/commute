import { Context } from '@nuxt/types'
import { AuthConstant } from '~/constant'
import { getUserInfo } from '~/API'

export default async (context: Context) => {
  const { $cookies }: any = context.app

  try {
    const token = $cookies.get('token')

    const { result } = await getUserInfo(token)

    context.app.store?.dispatch(`auth/${AuthConstant.$Call.Info}`, result)
  } catch (err) {
    $cookies.remove('token')

    context.redirect('/signin')
  }
}
