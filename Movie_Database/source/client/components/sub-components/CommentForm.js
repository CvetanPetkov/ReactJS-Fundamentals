import React from 'react'

import FormActions from '../../actions/FormActions'
import FormStore from '../../stores/FormStore'
import MovieActions from '../../actions/MovieActions'

export default class CommentForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = FormStore.getState()
    this.onChange = this.onChange.bind(this)
  }

  onChange (state) {
    this.setState(state)
  }

  componentDidMount () {
    FormStore.listen(this.onChange)
  }

  componentWillUnmount () {
    FormStore.unlisten(this.onChange)
  }

  handleSubmit (e) {
    e.preventDefault()

    if (!this.state.comment) {
      FormActions.commentValidationFail()
      return
    }

    MovieActions.addComment(this.props.movieId, this.state.comment)
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className={`form-group ${this.state.commentValidationState}`}>
          <label className='control-label' htmlFor='content'>Add comment</label>
          <textarea
            id='content'
            className='form-control'
            value={this.state.comment}
            onChange={FormActions.handleCommentChange}
            rows='5' />
          <span className={`help-block`}>{this.state.message}</span>
        </div>
        <div className='form-group'>
          <input type='submit' className='btn btn-primary' value='Comment' />
        </div>
      </form>
    )
  }
}
