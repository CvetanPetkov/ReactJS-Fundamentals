import Data from './Data'

const baseUrl = 'cars'

class CarData {
  static all (page) {
    return Data.get(`${baseUrl}/all?page=${page}`)
  }

  static stats () {
    return Data.get('stats')
  }

  static search (searchMake, page) {
    if (!page) {
      return Data.get(`${baseUrl}/all?search=${searchMake}`)
    } else {
      return Data.get(`${baseUrl}/all?page=${page}&search=${searchMake}`)
    }

  }

  static create (car) {
    return Data.post(`${baseUrl}/create`, car, true)
  }

  static details (carId) {
    return Data.get(`${baseUrl}/details/${carId}`, true)
  }

  static review (review, carId) {
    return Data.post(`${baseUrl}/details/${carId}/reviews/create`, review, true)
  }

  static reviewsAll (carId) {
    return Data.get(`${baseUrl}/details/${carId}/reviews`, true)
  }

  static carLikeUp (carId) {
    return Data.postNoBody(`${baseUrl}/details/${carId}/like`, true)
  }

  static carsMine () {
    return Data.get(`${baseUrl}/mine`, true)
  }

  static deleteCar (carId) {
    return Data.postNoBody(`${baseUrl}/delete/${carId}`, true)
  }

}

export default CarData
