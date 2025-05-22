import React from 'react';
import { Link } from 'react-router-dom';

const CityCard = ({ city, currentPage }) => {
    // Chemin des images depuis le dossier public
    const defaultImagePath = '/images/default.webp';

    return (
        <Link to={`${city}?page=${currentPage}`} className='city-card'>
            <h3 className='city-card__name'>{city}</h3>
            <img
                type='image/webp'
                src={`/images/${city}.webp`}
                alt={`Image de ${city}`}
                onError={(e) => {
                    e.target.src = defaultImagePath;
                }}
                style={{ height: '100%', width: '100%', borderRadius: '.5rem' }}
            />
        </Link>
    );
};

export default CityCard;



