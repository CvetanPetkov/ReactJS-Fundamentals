import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../users/Auth'
import UserStore from '../../stores/UserStore'

class Navbar extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      username: Auth.getUser().name
    }

    this.handleUserLoggedIn = this.handleUserLoggedIn.bind(this)

    UserStore.on(
      UserStore.eventTypes.USER_LOGGED_IN,
      this.handleUserLoggedIn
    )
  }

  handleUserLoggedIn (data) {
    if (data.success) {
      this.setState({
        username: data.user.name
      })
    }
  }

  render () {
    return (
      <div className='menu'>
        <Link to='/'>
          Home
        </Link>

        {Auth.isUserAuthenticated() ? (
          <div>
            <Link to='/cars/create'>
              Add Car
            </Link>
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              Hello: {this.state.username}
              &nbsp;&nbsp;&nbsp;
            </span>

            <Link to='/cars/mine'>
              Mine cars
            </Link>

            <Link to='/users/logout'>
              Logout
            </Link>
          </div>
        ) : (
          <div>
            <Link to='/users/register'>
              Register
            </Link>

            <Link to='/users/login'>
              Login
            </Link>
          </div>
        )}
      </div>
    )
  }
}

export default Navbar
