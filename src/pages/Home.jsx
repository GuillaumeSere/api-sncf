import React from 'react'
import CityCards from '../components/CityCards'

const Home = () => {
  return (
    <div className='home'>
      <div className='home__content-wrapper'>
        <h1 className='home__content-title'>Choisissez une ville pour afficher les horraires des trains</h1>
        <CityCards />
      </div>
    </div>
  )
}

export default Home
