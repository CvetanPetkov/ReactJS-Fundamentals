import React from 'react'
import toastr from 'toastr'

import CarActions from '../../actions/CarActions'
import CarStore from '../../stores/CarStore'
import CreateCarForm from './CreateCarForm'
import FormHelpers from '../common/forms/FormHelpers'

class CreateCarComponent extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      car: {
        make: 'Mazda',
        model: 'RX-8',
        year: 2006,
        engine: '1.5',
        price: 7000,
        image: 'https://upload.wikimedia.org/wikipedia/en/0/0e/RX8-MS.jpg',
        mileage: 245000
      },
      error: ''
    }

    this.handleCarCreation = this.handleCarCreation.bind(this)

    CarStore.on(
      CarStore.eventTypes.CAR_CREATED,
      this.handleCarCreation
    )
  }

  componentWillUnmount () {
    CarStore.removeListener(
      CarStore.eventTypes.CAR_CREATED,
      this.handleCarCreation
    )
  }

  handleCarChange (e) {
    FormHelpers.handleFormChange.bind(this)(e, 'car')
  }

  handleCarForm (e) {
    e.preventDefault()

    if (!this.validateCar()) {
      return
    }

    CarActions.register(this.state.car)
  }

  handleCarCreation (data) {
    if (!data.success) {
      let firstError = FormHelpers.getFirstError(data)

      this.setState({
        error: firstError
      })
    } else {
      toastr.success(data.message)
      this.props.history.push(`/cars/details/${data.car.id}`)
    }
  }

  validateCar () {
    const car = this.state.car
    let formIsValid = true
    let error = ''

    if (!car.make || !car.model || !car.year || !car.engine || !car.price || !car.image) {
      error = 'You have to fill all fields (only mileage is optional)'

      formIsValid = false
    }

    if (error) {
      this.setState({error})
    }

    return formIsValid
  }

  render () {
    return (
      <div>
        <h1>Create Car</h1>
        <CreateCarForm
          car={this.state.car}
          error={this.state.error}
          onChange={this.handleCarChange.bind(this)}
          onSave={this.handleCarForm.bind(this)} />
      </div>
    )
  }
}

export default CreateCarComponent
