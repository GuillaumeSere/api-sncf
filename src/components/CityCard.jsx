import React from 'react'
import { Link } from 'react-router-dom'

const CityCard = ({ city }) => {
  return (
    <Link to={`${city}`} className='city-card'>
      <h3 className='city-card__name'>{city}</h3>
      <img type="image/jpeg" src={`/images/${city}.jpg`} alt="" style={{height: '100%', width: '100%', borderRadius: '.5rem'}} />
    </Link>
  )
}

export default CityCard
