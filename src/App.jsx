import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TrainStation from './components/TrainStation'
import City from './pages/City'
import Home from './pages/Home'
import Snowfall from 'react-snowfall'

function App() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
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
                    <Route path='/:city' element={<City />}>
                        <Route path=':codeStation' element={<TrainStation />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    )
}

export default App
