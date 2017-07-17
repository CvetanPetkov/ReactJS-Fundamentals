class FormHelpers {
  static handleFormChange (e, stateField) {
    const target = e.target
    const field = target.name
    const value = target.value

    const state = this.state[stateField]
    state[field] = value

    this.setState({[stateField]: state})
  }

  static handleSinglePropChange (e, stateField) {
    const target = e.target
    const field = target.name
    const value = target.value

    const state = this.state
    state[field] = value

    this.setState({[stateField]: value})
  }

  static getFirstError (data) {
    let firstError = data.message
    if (data.errors) {
      firstError = Object
        .keys(data.errors)
        .map(k => data.errors[k])[0]
    }

    return firstError
  }
}

export default FormHelpers
