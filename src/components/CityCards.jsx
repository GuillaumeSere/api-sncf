import React from 'react'
import CityCard from './CityCard'
import stations from '../gares.json'

const CityCards = ({ searchTerm }) => {

    const cities = Object.keys(stations)

     // Filtrer les villes en fonction de la recherche
     const filteredCities = cities.filter((city) =>
     city.toLowerCase().includes(searchTerm.toLowerCase())
 );


  return (
    <div className='city-cards'>
        {filteredCities.map((city) => (
         <CityCard key={city} city={city} />
         ))
        }
    </div>
  )
}

export default CityCards
