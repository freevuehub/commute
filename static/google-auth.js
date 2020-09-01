function init() {
  gapi.load('auth2', function () {
    window.$gapi = gapi
  })
}

document.addEventListener('SiginOut', () => {
  var auth2 = gapi.auth2.getAuthInstance()

  auth2.signOut().then(function () {
    console.log('User signed out.')
    const event = new CustomEvent('SignOutSuccess')

    document.dispatchEvent(event)
  })
})
