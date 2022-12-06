import React from 'react'
import CityCards from '../components/CityCards'

const Home = () => {
    return (
        <div className='home'>
            <h1 className='home__content-title'>Choisissez une ville pour afficher les horaires des trains</h1>
            <div className='home__content-wrapper'>
                <CityCards />
            </div>
        </div>
    )
}

export default Home
