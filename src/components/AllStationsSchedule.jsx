import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { parseUTCDate, calculateDelay } from './Utils'

const AllStationsSchedule = ({ stations }) => {
    const [schedules, setSchedules] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Pour chaque gare de la ville, récupérer les horaires
        const schedulesPromises = Object.entries(stations).map(([stationName, stationId]) => 
            axios.get(`https://api.sncf.com/v1/coverage/sncf/stop_areas/${stationId}/departures`, {
                headers: {
                    'Authorization': `${process.env.REACT_APP_API_KEY}`
                }
            })
            .then(response => ({
                stationId,
                stationName,
                departures: response.data.departures.map(departure => ({
                    id: departure.links[1].id,
                    trainNumber: departure.display_informations.headsign,
                    destination: departure.display_informations.direction.split('(')[0],
                    baseDepartureTime: parseUTCDate(departure.stop_date_time.base_departure_date_time),
                    realDepartureTime: parseUTCDate(departure.stop_date_time.departure_date_time)
                }))
            }))
        )

        Promise.all(schedulesPromises)
            .then(results => {
                const schedulesMap = {}
                results.forEach(result => {
                    schedulesMap[result.stationId] = {
                        name: result.stationName,
                        departures: result.departures
                    }
                })
                setSchedules(schedulesMap)
                setLoading(false)
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données:', error)
                setLoading(false)
            })
    }, [stations])

    if (loading) {
        return <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
    }

    return (
        <div className="all-stations-schedule">
            <h2 className="all-stations-schedule__title">Horaires des prochains départs</h2>
            <div className="all-stations-schedule__grid">
                {Object.entries(schedules).map(([stationId, stationData]) => (
                    <div key={stationId} className="all-stations-schedule__card">
                        <h3 className="all-stations-schedule__station-name">{stationData.name}</h3>
                        <div className="all-stations-schedule__departures">
                            {stationData.departures.slice(0, 5).map((departure, index) => (
                                <div key={`${stationId}-${index}`} className="all-stations-schedule__departure">
                                    <div className="all-stations-schedule__departure-header">
                                        <span className="all-stations-schedule__train-number"><p>N° du Train:</p> {departure.trainNumber}</span>
                                        <span className="all-stations-schedule__destination">{departure.destination}</span>
                                    </div>
                                    <div className="all-stations-schedule__departure-time">
                                        <span className="all-stations-schedule__time">
                                           <p> Départ:</p> {departure.baseDepartureTime.toLocaleTimeString()}
                                        </span>
                                        {calculateDelay(departure.baseDepartureTime, departure.realDepartureTime) > 0 && (
                                            <span className="all-stations-schedule__delay">
                                                +{calculateDelay(departure.baseDepartureTime, departure.realDepartureTime)} min
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllStationsSchedule 