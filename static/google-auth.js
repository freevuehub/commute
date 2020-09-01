function init() {
  gapi.load('auth2', function () {
    window.$gapi = gapi

    // renderButton()
  })
}

document.addEventListener('SiginOut', () => {
  var auth2 = gapi.auth2.getAuthInstance()
  console.log(auth2)

  auth2.signOut().then(function () {
    console.log('User signed out.')
    const event = new CustomEvent('SignOutSuccess')

    document.dispatchEvent(event)
  })
})
