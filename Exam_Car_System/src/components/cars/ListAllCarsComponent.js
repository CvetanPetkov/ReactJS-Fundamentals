import React from 'react'
import {Link} from 'react-router-dom'
import queryString from 'querystring'

import CarActions from '../../actions/CarActions'
import CarStore from '../../stores/CarStore'
import SearchCarForm from './SearchCarForm'
import FormHelpers from '../common/forms/FormHelpers'

class ListAllCarsComponent extends React.Component {
  constructor (props) {
    super (props)

    const query = queryString.parse(this.props.location.search)
    const page = parseInt(query.page, 10) || 1

    this.state = {
      cars: [],
      stats: {},
      searchMake: '',
      onThisPage: false,
      page: page,
      disabledPrev: true,
      disabledNext: false
    }

    this.handleCarsData = this.handleCarsData.bind(this)
    this.handleStatsData = this.handleStatsData.bind(this)
    this.handleSearchData = this.handleSearchData.bind(this)

    CarStore.on(
      CarStore.eventTypes.CARS_ALL_SERVED,
      this.handleCarsData
    )

    CarStore.on(
      CarStore.eventTypes.CARS_STATS_SERVED,
      this.handleStatsData
    )

    CarStore.on(
      CarStore.eventTypes.CARS_SEARCH_RESPONSE,
      this.handleSearchData
    )
  }

  componentDidMount () {
    CarActions.all(this.state.page)
    CarActions.stats()
  }

  componentWillUnmount () {
    CarStore.removeListener(
      CarStore.eventTypes.CARS_ALL_SERVED,
      this.handleCarsData
    )

    CarStore.removeListener(
      CarStore.eventTypes.CARS_STATS_SERVED,
      this.handleStatsData
    )
  }

  handleSearchChange (e) {
    FormHelpers.handleSinglePropChange.bind(this)(e, 'searchMake')
  }

  handleRadioChange (e) {
    let onThisPage = e.target.value

    this.setState({onThisPage: onThisPage})
  }

  handleSearchForm (e) {
    e.preventDefault()

    if (!this.state.searchMake) {
      return
    }

    if (this.state.onThisPage) {
      CarActions.search(this.state.searchMake, this.state.page)
    } else {
      CarActions.search(this.state.searchMake)
    }
  }

  handleCarsData (data) {
    this.setState({cars: data})

    if (this.state.cars.length < 1 || this.state.page < 2) {
      this.setState({
        disabledPrev: true,
        disabledNext: false
      })
    }

    else if (
      this.state.cars.length === 0 ||
      this.state.cars.length < 10) {
      this.setState({
        disabledPrev: false,
        disabledNext: true
      })
    }
  }

  handleStatsData (data) {
    this.setState({stats: data})
  }

  handleSearchData (data) {
    this.setState({cars: data})
  }

  goToPrevPage () {
    if (this.state.cars.length < 1 || this.state.page < 2) {
      return
    }

    let page = this.state.page
    page--

    this.setState({page})

    this.props.history.push(`/?page=${page}`)

    CarActions.all(page)
  }

  goToNextPage () {
    let page = this.state.page
    page++

    if (
      this.state.cars.length === 0 ||
      this.state.cars.length < 10) {
      return
    }

    this.setState({page})

    this.props.history.push(`/?page=${page}`)

    CarActions.all(page)
  }

  render () {
    let cars = 'No cars available'

    if (this.state.cars.length > 0) {
      cars = this.state.cars.map((car) => (
        <div key={car.id} className='car-card-container'>
          <img src={car.image} alt='pet' />
          <p>Make: {car.make}</p>
          <p>Price: $USD {car.price}</p>
          <Link to={`/cars/details/${car.id}`}>See more details</Link>
        </div>
      ))
    }

    let stats = (
      <div className='stats-search-container'>
        <span>Total cars in the system: {this.state.stats.cars ? this.state.stats.cars : 0}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>Total users in the system: {this.state.stats.users ? this.state.stats.users : 0}</span>
        <SearchCarForm
          searchMake={this.state.searchMake}
          error={this.state.error}
          onChange={this.handleSearchChange.bind(this)}
          onRadio={this.handleRadioChange.bind(this)}
          onSave={this.handleSearchForm.bind(this)}/>
      </div>
    )

    return (
      <div className='cars-outer'>
        <h2>All Cars List</h2>
        {stats}
        {cars}
        <div className='paging-buttons'>
          <button onClick={this.goToPrevPage.bind(this)} disabled={this.state.disabledPrev}>Prev</button>
          <button onClick={this.goToNextPage.bind(this)} disabled={this.state.disabledNext}>Next</button>
        </div>
      </div>
    )
  }
}

export default ListAllCarsComponent
