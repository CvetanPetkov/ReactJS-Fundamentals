import React from 'react'
import Input from '../common/forms/Input'

const CreateCarForm = (props) => (
  <form>
    <div>{props.error}</div>

    <Input
      name='make'
      type='text'
      placeholder='Make'
      value={props.car.make}
      onChange={props.onChange} />

    <Input
      name='model'
      type='text'
      placeholder='Model'
      value={props.car.model}
      onChange={props.onChange} />

    <Input
      name='year'
      type='number'
      placeholder='Year'
      value={props.car.year}
      onChange={props.onChange} />

    <Input
      name='engine'
      type='text'
      placeholder='Engine'
      value={props.car.engine}
      onChange={props.onChange} />

    <Input
      name='price'
      type='number'
      placeholder='Price'
      min='1'
      value={props.car.price}
      onChange={props.onChange} />

      <Input
        name='image'
        type='text'
        placeholder='Image'
        value={props.car.image}
        onChange={props.onChange} />

      <Input
        name='mileage'
        type='number'
        min='1'
        placeholder='Mileage'
        value={props.car.mileage}
        onChange={props.onChange} />

    <input type='submit' onClick={props.onSave} />
  </form>
)

export default CreateCarForm
