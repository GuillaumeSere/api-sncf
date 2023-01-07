import React from 'react'
import CityCards from '../components/CityCards'
import Footer from '../components/Footer'
import Header from '../components/Header'


const Home = () => {
    return (
        <>
        <Header />
        <div className='home'>
            <div className='home__content-wrapper'>
            <h1 className='home__content-title'>Choisissez une ville pour afficher les horaires des trains</h1>
                <CityCards />
            </div>
        </div>
        <Footer />
        </>
    )
}

export default Home
