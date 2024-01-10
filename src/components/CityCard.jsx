import React from 'react';
import { Link } from 'react-router-dom';

const CityCard = ({ city, currentPage }) => {
    return (
        <Link to={`${city}?page=${currentPage}`} className='city-card'>
            <h3 className='city-card__name'>{city}</h3>
            <img
                type='image/webp'
                src={`../api-sncf/images/${city}.webp`}
                alt=''
                style={{ height: '100%', width: '100%', borderRadius: '.5rem' }}
            />
        </Link>
    );
};

export default CityCard;

