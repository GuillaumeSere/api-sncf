import React, { useEffect, useState} from 'react'
import axios from 'axios'

const Stops = ({idDeparture}) => {

    const [nextStops, setNextStops] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!idDeparture) {
            setIsLoading(false)
            return
        }

        setIsLoading(true)
        setError(null)
        
        axios.get(`https://api.sncf.com/v1/coverage/sncf/vehicle_journeys/${idDeparture}`,{
            headers: {
                'Authorization': `${process.env.REACT_APP_API_KEY}`,
            },
        })
        .then((response) => {
            if (response.data.vehicle_journeys && response.data.vehicle_journeys.length > 0) {
                const stops = response.data.vehicle_journeys[0].stop_times.map(
                    (stop) => stop.stop_point.name
                )
                setNextStops(stops)
            } else {
                setNextStops([])
            }
        })
        .catch((error) => {
            console.warn(`Impossible de récupérer les arrêts pour le voyage ${idDeparture}:`, error.message)
            setError(error.message)
            setNextStops([])
        })
        .finally(() => {
            setIsLoading(false)
        })
    }, [idDeparture])

  return (
    <div className='departure__stops'>
      {isLoading ? (
        <div className='stops-loading'>Chargement des arrêts...</div>
      ) : error ? (
        <div className='stops-error'>Arrêts non disponibles</div>
      ) : nextStops.length > 0 ? (
        <ul className='stops'>
          {nextStops.map((stop, index) => (
              <li className='stops__station' key={`${stop}-${index}`}>
                  {stop}
                  <img src='../images/yellow.jpg' alt='yellow point'style={{
                      display: `${index === nextStops.length - 1 ? 'none' : 'inline'}`
                  }} />
              </li>
          ))}
        </ul>
      ) : (
        <div className='stops-empty'>Aucun arrêt disponible</div>
      )}
    </div>
  )
}

export default Stops
