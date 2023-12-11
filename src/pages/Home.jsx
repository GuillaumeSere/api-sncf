import React, { useState } from 'react'
import CityCards from '../components/CityCards'
import Footer from '../components/Footer'
import Header from '../components/Header'


const Home = () => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
           console.log('Search Term:', e.target.value);
    };

    return (
        <>
            <Header />
            <div className='home'>
                <div className='home__content-wrapper'>
                    <h1 className='home__content-title'>Choisissez une<span> ville </span>pour afficher les <span>horaires</span> des trains</h1>
                    <input
                        className='input-search'
                        type='text'
                        placeholder='Rechercher une gare...'
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <CityCards searchTerm={searchTerm} />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home
