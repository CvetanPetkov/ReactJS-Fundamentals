import {EventEmitter} from 'events'
import dispatcher from '../dispatcher'
import CarActions from '../actions/CarActions'
import CarData from '../data/CarData'

class CarStore extends EventEmitter {
  all (page) {
    CarData
      .all(page)
      .then((data) => {
        this.emit(this.eventTypes.CARS_ALL_SERVED, data)
      })
  }

  stats () {
    CarData
      .stats()
      .then((data) => {
        this.emit(this.eventTypes.CARS_STATS_SERVED, data)
      })
  }

  search (searchMake, page) {
    CarData
      .search(searchMake, page)
      .then((data) => {
      this.emit(this.eventTypes.CARS_SEARCH_RESPONSE, data)
      })
  }

  create (car) {
    CarData
      .create(car)
      .then((data) => {
        this.emit(this.eventTypes.CAR_CREATED, data)
      })
  }

  details (carId) {
    CarData
      .details(carId)
      .then((data) => {
        this.emit(this.eventTypes.CAR_DETAILS_SERVED, data)
      })
  }

  review (review, carId) {
    CarData
      .review(review, carId)
      .then((data) => {
        this.emit(this.eventTypes.CAE_REVIEW_SERVED, data)
      })
  }

  reviewsAll (carId) {
    CarData
      .reviewsAll(carId)
      .then((data) => {
        this.emit(this.eventTypes.CAR_REVIEWS_SERVED, data)
      })
  }

  carLikeUp (carId) {
    CarData
      .carLikeUp(carId)
      .then((data) => {
        this.emit(this.eventTypes.CAR_LIKE_UP_DONE, data)
      })
  }

  carMine () {
    CarData
      .carsMine()
      .then((data) => {
      this.emit(this.eventTypes.CAR_MINE_SERVED, data)
      })
  }

  deleteCar (carId) {
    CarData
      .deleteCar(carId)
      .then((data) => {
        this.emit(this.eventTypes.CAR_DELETED, data)
      })
  }

  handleAction (action) {
    switch (action.type) {

      case CarActions.types.CARS_ALL: {
        this.all(action.page)
        break
      }

      case CarActions.types.CARS_STATS: {
        this.stats()
        break
      }

      case CarActions.types.CARS_SEARCH: {
        this.search(action.searchMake, action.page)
        break
      }

      case CarActions.types.CAR_CREATE: {
        this.create(action.car)
        break
      }

      case CarActions.types.CAR_DETAILS: {
        this.details(action.carId)
        break
      }

      case CarActions.types.CAR_REVIEW: {
        this.review(action.review, action.carId)
        break
      }

      case CarActions.types.CAR_REVIEWS_ALL: {
        this.reviewsAll(action.carId)
        break
      }

      case CarActions.types.CAR_LIKE_UP: {
        this.carLikeUp(action.carId)
        break
      }

      case CarActions.types.CAR_MINE: {
        this.carMine()
        break
      }

      case CarActions.types.CAR_DELETE: {
        this.deleteCar(action.carId)
        break
      }

      default: break
    }
  }
}

let carStore = new CarStore()

carStore.eventTypes = {
  CARS_ALL_SERVED: 'cars_all_served',
  CARS_STATS_SERVED: 'cars_stats_served',
  CARS_SEARCH_RESPONSE: 'cars_search_response',
  CAR_CREATED: 'car_created',
  CAR_DETAILS_SERVED: 'car_details_served',
  CAE_REVIEW_SERVED: 'car_review_served',
  CAR_REVIEWS_SERVED: 'car_reviews_served',
  CAR_LIKE_UP_DONE: 'car_like_up_done',
  CAR_MINE_SERVED: 'car_mine_served',
  CAR_DELETED: 'car_deleted'
}

dispatcher.register(carStore.handleAction.bind(carStore))
export default carStore
