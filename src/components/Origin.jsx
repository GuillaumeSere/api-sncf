import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Origin = ({ idArrival}) => {

    const [stops, setStops] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!idArrival) {
            setIsLoading(false)
            return
        }

        setIsLoading(true)
        setError(null)

        axios.get(`https://api.sncf.com/v1/coverage/sncf/vehicle_journeys/${idArrival}`, {
            headers: {
                'Authorization': `${process.env.REACT_APP_API_KEY}`
            },
        })
        .then((response) => {
            if (response.data.vehicle_journeys && response.data.vehicle_journeys.length > 0) {
                const stopsApi = response.data.vehicle_journeys[0].stop_times.map(
                    (stop) => stop.stop_point.name
                )
                setStops(stopsApi)
            } else {
                setStops([])
            }
        })
        .catch((error) => {
            console.warn(`Impossible de récupérer les arrêts pour le voyage ${idArrival}:`, error.message)
            setError(error.message)
            setStops([])
        })
        .finally(() => {
            setIsLoading(false)
        })
    }, [idArrival])

  return (
    <>
      {isLoading ? (
        <p className='arrival__origin'>Chargement...</p>
      ) : error ? (
        <p className='arrival__origin'>Origine non disponible</p>
      ) : stops.length > 0 ? (
        <p className='arrival__origin'>{stops[0]}</p>
      ) : (
        <p className='arrival__origin'>Origine inconnue</p>
      )}
      
      <div className='arrival__stops'>
        {isLoading ? (
          <div className='stops-loading'>Chargement des arrêts...</div>
        ) : error ? (
          <div className='stops-error'>Arrêts non disponibles</div>
        ) : stops.length > 0 ? (
          <ul className='stops'>
              {stops.map((stop, index) => (
                  <li className='stops__station' key={`${stop}-${index}`}>
                      {stop}
                      <img src='../images/yellow.jpg' alt='yellow point' style={{
                          display: `${index === stops.length - 1 ? 'none' : 'inline'}`
                      }}/>
                  </li>
              ))}
          </ul>
        ) : (
          <div className='stops-empty'>Aucun arrêt disponible</div>
        )}
      </div>
    </>
  )
}

export default Origin
