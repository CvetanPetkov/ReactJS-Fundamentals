import React, { Component } from 'react'

import UserActions from '../actions/UserActions'
import UserStore from '../stores/UserStore'

import Navbar from './Navbar'
import Footer from './Footer'

export default class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = UserStore.getState()

    this.onChange = this.onChange.bind(this)
  }

  onChange (state) {
    this.setState(state)
  }

  componentDidMount () {
    UserStore.listen(this.onChange)
    UserActions.loginUser()
  }

  componentWillUnmount () {
    UserStore.unlisten(this.onChange)
  }

  // TEMP LOGIN FUNCTION TO BE REMOVED ON PART 3
  // LOGIN_DEFAULT_USER () {
  //   let request = {
  //     url: '/user/login',
  //     method: 'post',
  //     data: JSON.stringify({username: 'admin', password: '11'}),
  //     contentType: 'application/json'
  //   }
  //
  //   $.ajax(request)
  //     .done((userId) => {
  //       this.setState({
  //         loggedInUserId: userId
  //       })
  //     })
  //     .fail((err) => {  //  Redirect to user login on part 3
  //       console.log('UserMenu: err', err)
  //       this.setState({
  //         loggedInUserId: '',
  //         message: err.responseJSON.message
  //       })
  //     })
  // }

  logoutUser () {
    let request = {
      url: '/user/logout',
      method: 'post'
    }

    $.ajax(request)
      .done(() => {
        this.setState({
          loggedInUserId: ''
        })
      })
      .fail((err) => {
        this.setState({
          error: err.responseJSON.message
        })
      })
  }

  render () {

    // console.log('App.js')
    // console.log(this.props.children)
    // console.log('App.js')

    return (
      <div>
        <Navbar />
        { this.props.children }
        <Footer />
      </div>
    )
  }
}
