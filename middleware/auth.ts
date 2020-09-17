export default ({ app, redirect }: any) => {
	if (!app.$cookies.get('token')) {
		redirect('/signin')
	}
}
