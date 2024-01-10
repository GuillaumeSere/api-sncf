import React from 'react';
import { Link } from 'react-router-dom';

const CityCard = ({ city, currentPage }) => {
    // Placeholder image path
    const defaultImagePath = '../api-sncf/images/default.webp';

    return (
        <Link to={`${city}?page=${currentPage}`} className='city-card'>
            <h3 className='city-card__name'>{city}</h3>
            <img
                type='image/webp'
                src={`../api-sncf/images/${city}.webp`}
                alt=''
                onError={(e) => {
                    e.target.src = defaultImagePath; // Set default image if the specific image fails to load
                }}
                style={{ height: '100%', width: '100%', borderRadius: '.5rem' }}
            />
        </Link>
    );
};

export default CityCard;



