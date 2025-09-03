import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Origin from './Origin'
import { calculateDelay, getFullMinutes, parseUTCDate } from './Utils'

const Arrivals = () => {

	const { codeStation } = useParams()
	const [nextArrivals, setNextArrivals] = useState([])

	useEffect(() => {
		axios.get( `https://api.sncf.com/v1/coverage/sncf/stop_areas/${codeStation}/arrivals`, {
			headers: {
				'Authorization': `${process.env.REACT_APP_API_KEY}`
			},
		})
		.then((response) => {
			const getVehicleJourneyId = (links = []) => {
				const vjLink = links.find((l) => l && (
					l.type === 'vehicle_journeys' ||
					l.type === 'vehicle_journey' ||
					(l.href && (l.href.includes('/vehicle_journeys/') || l.href.includes('/vehicle_journey/')))
				))
				return vjLink ? vjLink.id : null
			}

			const arrivals = response.data.arrivals
				.map((arrival) => ({
					id: getVehicleJourneyId(arrival.links || []),
					operator: '',
					transportationMode: arrival.display_informations.network,
					trainNumber: arrival.display_informations.headsign,
					baseArrivalTime: parseUTCDate(arrival.stop_date_time.base_arrival_date_time),
					realArrivalTime: parseUTCDate(arrival.stop_date_time.arrival_date_time),
					destination: arrival.display_informations.direction.split(' (')[0]
				}))
			
			setNextArrivals(arrivals)
		})
		.catch((error) => {
			console.error('Erreur lors de la récupération des arrivées:', error)
			setNextArrivals([])
		})
	}, [codeStation])

	const [isTimeDisplayed, setIsTimeDisplayed] = useState(true)

	useEffect(() => {
		const interval = setInterval(() => {
			setIsTimeDisplayed((prevIsTimeDisplayed => !prevIsTimeDisplayed))
		}, 5000)
		return () => {
			clearInterval(interval)
		}
	}, []);

  return (
    <div className='arrivals'>
      {nextArrivals.map((arrival, index) => (
        <div key={`${arrival.id || 'noid'}-${index}-${arrival.trainNumber}-${arrival.baseArrivalTime.getTime()}`} className={`arrival ${index % 2 ? '' : 'arrival--light'}`}>
            <p className='arrival__operator'>{arrival.operator}</p>
            <p className='arrival__train-type'>{arrival.transportationMode}</p>
            <p className='arrival__train-number'>{arrival.trainNumber}</p>
            <p className={`arrival__time ${isTimeDisplayed ? '' : 'arrival__time--disappear'}`}>
                {arrival.baseArrivalTime.getHours()}h{getFullMinutes(arrival.baseArrivalTime)}
            </p>
            <p className={`arrival__delay ${isTimeDisplayed ? 'arrival__delay--disappear' : ''}`}>
                {calculateDelay(arrival.baseArrivalTime, arrival.realArrivalTime)}
            </p>
            {arrival.id && <Origin idArrival={arrival.id} />}
        </div>
      ))}
    </div>
  )
}

export default Arrivals
