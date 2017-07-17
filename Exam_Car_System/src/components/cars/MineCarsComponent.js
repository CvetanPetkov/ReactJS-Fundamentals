import React from 'react'
import {Link} from 'react-router-dom'

import CarActions from '../../actions/CarActions'
import CarStore from '../../stores/CarStore'

class MineCarsComponent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      cars: []
    }

    this.handleCarsMine = this.handleCarsMine.bind(this)
    this.handleDeleteResponse = this.handleDeleteResponse.bind(this)

    CarStore.on(
      CarStore.eventTypes.CAR_MINE_SERVED,
      this.handleCarsMine
    )

    CarStore.on(
      CarStore.eventTypes.CAR_DELETED,
      this.handleDeleteResponse
    )
  }

  componentDidMount () {
    CarActions.mineCars()
  }

  componentWillUnmount () {
    CarStore.removeListener(
      CarStore.eventTypes.CAR_MINE_SERVED,
      this.handleCarsMine
    )

    CarStore.removeListener(
      CarStore.eventTypes.CAR_DELETED,
      this.handleDeleteResponse
    )
  }

  handleCarsMine (data) {
    this.setState({cars: data})
  }

  handleOnClick (e) {
    let carId = e.target.id
    CarActions.deleteCar(carId)
  }

  handleDeleteResponse () {
    CarActions.mineCars()
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
          <button onClick={this.handleOnClick.bind(this)} id={car.id}>Delete car</button>
        </div>
      ))
    }

    return (
      <div className='cars-outer'>
        <h2>List of cars added by me</h2>
        {cars}
      </div>
    )
  }
}

export default MineCarsComponent
