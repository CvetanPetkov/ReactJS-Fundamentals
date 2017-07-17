import React from 'react'
import FormHelpers from '../common/forms/FormHelpers'
import ReviewCreateForm from './ReviewCreateForm'
import CarActions from '../../actions/CarActions'

class ReviewCreateComponent extends React.Component {
  constructor (props) {
    super (props)

    let carId = this.props.carId

    this.state = {
      carId: carId,
      review: {
        comment: '',
        rating: 0
      },
      error: ''
    }
  }

  handleReviewChange (e) {
    FormHelpers.handleFormChange.bind(this)(e, 'review')
  }

  handleReviewForm (e) {
    e.preventDefault()

    if (!this.state.review.comment || !this.state.review.rating) {
      return
    }

    CarActions.review(this.state.review, this.state.carId)
  }

  render () {
    return (
      <div className='review-form'>
        <h4>You can write a review and leave a rating</h4>
        <ReviewCreateForm
          comment={this.state.comment}
          error={this.state.error}
          onChange={this.handleReviewChange.bind(this)}
          onSave={this.handleReviewForm.bind(this)} />
      </div>
    )
  }
}

export default ReviewCreateComponent
