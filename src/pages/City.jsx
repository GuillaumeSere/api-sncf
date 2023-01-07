import React from 'react'
import {  NavLink, Outlet, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import TrainStations from '../components/TrainStations'
import stations from '../gares.json'

const City = () => {

    const {city} = useParams()

  return (
    <>
    <div className='city'>
      <h2 className='city__name'>{city}</h2>
      <TrainStations stations={stations[city]} />
      <Outlet />
      <NavLink to="/" className='home__link'>Acceuil</NavLink>
    </div>
    <Footer />
    </>
  )
}

export default City
