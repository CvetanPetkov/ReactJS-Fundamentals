import alt from '../alt'

class UserActions {
  constructor () {
    this.generateActions(
      'loginUserSuccess',
      'loginUserFail',
      'logoutUserSuccess'
    )
  }

  loginUser () {
    let request = {
      url: '/user/login',
      method: 'post',
      data: JSON.stringify({username: 'admin', password: '11'}),
      contentType: 'application/json'
    }

    $.ajax(request)
      .done((data) => {
        this.loginUserSuccess(data)
      })
      .fail((err) => {  //  Redirect to user login on part 3
        console.log('UserMenu: err', err)
        this.loginUserFail(err)
      })

    return true
  }

  logoutUser () {
    let request = {
      url: '/user/logout',
      method: 'post'
    }

    $.ajax(request)
      .done(() => this.logoutUserSuccess())

    return true
  }
}

export default alt.createActions(UserActions)
