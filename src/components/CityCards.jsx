import React from 'react'
import CityCard from './CityCard'
import stations from '../gares.json'

const CityCards = () => {

    const cities = Object.keys(stations)

  return (
    <div className='city-cards'>
        {cities.map((city) => (
         <CityCard key={city} city={city} />
         ))
        }
    </div>
  )
}

export default CityCards
