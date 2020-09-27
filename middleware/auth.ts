import { Context } from '@nuxt/types'

export default ({ app, redirect }: Context) => {
  if (!app.$cookies.get('token')) {
    redirect('/signin')
  }
}
