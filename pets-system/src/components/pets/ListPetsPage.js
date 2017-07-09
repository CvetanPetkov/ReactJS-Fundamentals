import React from 'react'
import queryString from 'query-string'
import PetActions from '../../actions/PetActions'
import PetStore from '../../stores/PetStore'

class ListPetsPage extends React.Component {
  constructor (props) {
    super(props)

    let query = queryString.parse(this.props.location.search)
    const page = parseInt(query.page, 10) || 1

    this.state = {
      pets: [],
      page: page
    }

    this.handlePetsFetch = this.handlePetsFetch.bind(this)

    PetStore.on(  //  attach listener to call when PetStore emits
      PetStore.eventTypes.PETS_FETCHED,
      this.handlePetsFetch
    )
  }

  componentDidMount () {
    PetActions.all(this.state.page)
  }

  componentWillUnmount () {
    PetStore.removeListener(
      PetStore.eventTypes.PETS_FETCHED,
      this.handlePetsFetch
    )
  }

  handlePetsFetch (data) {
    this.setState({
      pets: data
    })
  }

  goToPrevPage () {
    if (this.state.pets.length < 1 || this.state.page < 2) {
      return
    }

    let page = this.state.page
    page--

    this.setState({page})

    this.props.history.push(`/?page=${page}`)

    PetActions.all(page)
  }

  goToNextPage () {
    let page = this.state.page
    page++

    if (
      this.state.pets.length === 0 ||
      this.state.pets.length < 10) {
      return
    }

    this.setState({page})

    this.props.history.push(`/?page=${page}`)

    PetActions.all(page)
  }

  render () {
    let pets = 'No pets available'

    if (this.state.pets.length > 0) {
      pets = this.state.pets.map((pet) => (
        <div key={pet.id}>
          {pet.id} - {pet.name}
          <img src={pet.image} alt='pet' />
        </div>
      ))
    }

    return (
      <div>
        <h1>All Pets</h1>
        {pets}
        <div>
          <button onClick={this.goToPrevPage.bind(this)}>Prev</button>
          <button onClick={this.goToNextPage.bind(this)}>Next</button>
        </div>
      </div>
    )
  }
}

export default ListPetsPage
