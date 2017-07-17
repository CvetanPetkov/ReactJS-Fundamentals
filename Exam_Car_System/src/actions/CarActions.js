import dispatcher from '../dispatcher'

const CarActions = {
  types: {
    CARS_ALL: 'CARS_ALL',
    CARS_STATS: 'CARS_STATS',
    CARS_SEARCH: 'CARS_SEARCH',
    CAR_CREATE: 'CAR_CREATE',
    CAR_DETAILS: 'CAR_DETAILS',
    CAR_REVIEW: 'CAR_REVIEW',
    CAR_REVIEWS_ALL: 'CAR_REVIEWS_ALL',
    CAR_LIKE_UP: 'CAR_LIKE_UP',
    CAR_MINE: 'CAR_MINE',
    CAR_DELETE: 'CAR_DELETE'
  },
  register (car) {
    dispatcher.dispatch({
      type: this.types.CAR_CREATE,
      car
    })
  },
  all (page) {
    dispatcher.dispatch({
      type: this.types.CARS_ALL,
      page
    })
  },
  stats () {
    dispatcher.dispatch({
      type: this.types.CARS_STATS,
    })
  },
  search (searchMake, page) {
    dispatcher.dispatch({
      type: this.types.CARS_SEARCH,
      searchMake,
      page
    })
  },
  details (carId) {
    dispatcher.dispatch({
      type: this.types.CAR_DETAILS,
      carId
    })
  },
  review (review, carId) {
    dispatcher.dispatch({
      type: this.types.CAR_REVIEW,
      review,
      carId
    })
  },
  reviewsAll (carId) {
    dispatcher.dispatch({
      type: this.types.CAR_REVIEWS_ALL,
      carId
    })
  },
  likeUp (carId) {
    dispatcher.dispatch({
      type: this.types.CAR_LIKE_UP,
      carId
    })
  },
  mineCars() {
    dispatcher.dispatch({
      type: this.types.CAR_MINE
    })
  },
  deleteCar(carId) {
    dispatcher.dispatch({
      type: this.types.CAR_DELETE,
      carId
    })
  }
}

export default CarActions
