import React from 'react';
import { useLocation } from 'react-router-dom';
import CityCard from './CityCard';
import stations from '../gares.json';

const CityCards = ({ searchTerm, cardsPerPage }) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const currentPage = parseInt(searchParams.get('page')) || 1; // Utilisez la valeur de la page dans l'URL ou 1 par défaut

    const cities = Object.keys(stations);

    // Filtrer les villes en fonction de la recherche
    const filteredCities = cities.filter((city) =>
        city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const visibleCities = filteredCities.slice(indexOfFirstCard, indexOfLastCard);

    return (
        <div className='city-cards'>
            {visibleCities.map((city) => (
                <CityCard key={city} city={city} currentPage={currentPage} />
            ))}
        </div>
    );
};

export default CityCards;


