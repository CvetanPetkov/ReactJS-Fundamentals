import React from 'react'
import Input from '../common/forms/Input'

const SearchCarForm = (props) => (
  <div className='search-wrapper'>
    <form>
      <div>{props.error}</div>

      <Input
        name='comment'
        type='text'
        placeholder='Comment'
        value={props.comment}
        onChange={props.onChange} />

      <Input
        name='rating'
        type='number'
        min='1'
        max='5'
        placeholder='Rating'
        value={props.rating}
        onChange={props.onChange}/>

      <input type='submit' onClick={props.onSave} value='Send Review' />
    </form>
  </div>
)

export default SearchCarForm
