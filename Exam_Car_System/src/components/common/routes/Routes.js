import React from 'react'
import {Switch, Route} from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import RegisterPage from '../../users/RegisterPage'
import LoginPage from '../../users/LoginPage'
import LogoutPage from '../../users/LogoutPage'

import ListAllCarsComponent from '../../cars/ListAllCarsComponent'
import CreateCarComponent from '../../cars/CreateCarComponent'
import DetailsCarComponent from '../../cars/DetailsCarComponent'
import MineCarsComponent from '../../cars/MineCarsComponent'
import PageNotFoundComponent from '../../common/PageNotFoundComponent'

const Routes = () => (
  <Switch>
    <Route path='/' exact component={ListAllCarsComponent} />
    <Route path='/users/register' component={RegisterPage} />
    <Route path='/users/login' component={LoginPage} />
    <PrivateRoute path='/users/logout' component={LogoutPage} />
    <PrivateRoute path='/cars/mine' component={MineCarsComponent}/>
    <PrivateRoute path='/cars/create' component={CreateCarComponent} />
    <PrivateRoute path='/cars/details/:id' component={DetailsCarComponent} />
    <Route component={PageNotFoundComponent} />
  </Switch>
)

export default Routes
