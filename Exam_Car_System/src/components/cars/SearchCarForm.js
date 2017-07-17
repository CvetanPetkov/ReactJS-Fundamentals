import React from 'react'
import Input from '../common/forms/Input'

const SearchCarForm = (props) => (
  <div className='search-wrapper'>
    <form>
      <div>{props.error}</div>

      <Input
        name='make'
        type='text'
        placeholder='Make'
        value={props.searchMake}
        onChange={props.onChange} />

      search only on this page <input type='radio' name='onThisPage' value='true' onChange={props.onRadio} />

      <input type='submit' onClick={props.onSave} value='Search' />
    </form>
  </div>
)

export default SearchCarForm

