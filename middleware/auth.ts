import { getMainData } from '~/API'

export default async ({ app, redirect, store }: any) => {
  console.log(store)

  if (!app.$cookies.get('token')) {
    redirect('/signin')
  } else {
    await getMainData()
  }
}
