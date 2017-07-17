import React from 'react'
import toastr from 'toastr'

import CarActions from '../../actions/CarActions'
import CarStore from '../../stores/CarStore'
import ReviewCreateComponent from './ReviewCreateComponent'
import ReviewListComponent from './ReviewListComponent'

class DetailsCarComponent extends React.Component {
  constructor (props) {
    super(props)

    let carId = this.props.match.params.id

    this.state = {
      car: {},
      reviews: {},
      carId: carId,
      likes: 0
    }

    this.handleDetailsCar = this.handleDetailsCar.bind(this)
    this.handleReviewsData = this.handleReviewsData.bind(this)
    this.handleLikesData = this.handleLikesData.bind(this)

    CarStore.on(
      CarStore.eventTypes.CAR_DETAILS_SERVED,
      this.handleDetailsCar
    )

    CarStore.on(
      CarStore.eventTypes.CAE_REVIEW_SERVED,
      this.handleReviewsData
    )

    CarStore.on(
      CarStore.eventTypes.CAR_LIKE_UP_DONE,
      this.handleLikesData
    )
  }

  componentDidMount () {
    CarActions.details(this.state.carId)
  }

  componentWillUnmount () {
    CarStore.removeListener(
      CarStore.eventTypes.CAR_DETAILS_SERVED,
      this.handleDetailsCar
    )

    CarStore.removeListener(
      CarStore.eventTypes.CAE_REVIEW_SERVED,
      this.handleReviewsData
    )

    CarStore.removeListener(
      CarStore.eventTypes.CAR_LIKE_UP_DONE,
      this.handleLikesData
    )
  }

  handleDetailsCar (data) {
    this.setState({car: data})
  }

  handleReviewsData (data) {
    CarActions.reviewsAll(data.review.id)
  }

  handleLikesClick () {
    CarActions.likeUp(this.state.carId)
  }

  handleLikesData (data) {
    if (!data.success) {
      toastr.error(data.message)
      return
    } else {
      toastr.success(data.message)

      let likes = this.state.car.likes
      likes++

      let obj = this.state.car
      obj.likes = likes

      this.setState({car: obj})
    }
  }

  render () {
    console.log(this.state.car)
    let car = this.state.car

    return (
      <div>
        <h2>Details For this cars</h2>
        <div key={car.id} className='car-details-container'>
          <img src={car.image} alt={`${car.make} ${car.model}`} />
          <p>Make: {car.make}</p>
          <p>Model: {car.model}</p>
          <p>Year: {car.year} year</p>
          <p>Engine: {car.engine} cm</p>
          <p>Mileage: {
            car.mileage? car.mileage : 'No information!'}</p>
          <p>Price: $USD {car.price}</p>
          <p className='likes' onClick={this.handleLikesClick.bind(this)}>Likes: {this.state.car.likes}</p>
        </div>

        <ReviewCreateComponent carId={this.state.carId} />
        <ReviewListComponent carId={this.state.carId}/>
      </div>
    )
  }
}

export default DetailsCarComponent
