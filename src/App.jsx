import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TrainStation from './components/TrainStation'
import City from './pages/City'
import Home from './pages/Home'
import AllStationsSchedule from './components/AllStationsSchedule'
import Snowfall from 'react-snowfall'

function App() {
    return (
        <div className='App'>
              { /*  <Snowfall
                style={{
                    position: 'fixed',
                    width: '100vw',
                    height: '100vh',
                }}
            />*/ }
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/toutes-les-gares' element={<AllStationsSchedule />} />
                <Route path='/:city' element={<City />}>
                    <Route path=':codeStation' element={<TrainStation />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App
