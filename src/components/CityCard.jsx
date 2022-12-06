import React from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

const CityCard = ({ city }) => {
  return (
    <Link to={`${city}`} className='city-card'>
      <h3 className='city-card__name'>{city}</h3>
      <img  alt="" style={{
        height: '100%',
         width: '100%',
          borderRadius: '.5rem',
          backgroundImage: `url(../images/${city}.jpg)`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          }} />
    </Link>
  )
}

CityCard.propTypes = {
    city: propTypes.string.isRequired,
}

export default CityCard