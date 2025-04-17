import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function TrainStations ({ stations }){
    const navigate = useNavigate()
    
    // Si une seule gare, rediriger automatiquement
    React.useEffect(() => {
        const stationKeys = Object.keys(stations)
        if (stationKeys.length === 1) {
            const [stationName] = stationKeys
            navigate(stations[stationName])
        }
    }, [stations, navigate])

    return (
        <div className='train-stations'>
            {Object.keys(stations).map((stationName) => (
                <NavLink
                    className={({ isActive }) => `train-stations__link ${isActive ? 'train-stations__link--active' : ''}`}
                    key={stationName}
                    to={`${stations[stationName]}`}
                >
                <span>{stationName}</span>
                </NavLink>
            ))}
        </div>
    )
}

export default TrainStations
