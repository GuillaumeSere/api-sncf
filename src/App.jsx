import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TrainStation from './components/TrainStation'
import City from './pages/City'
import Home from './pages/Home'

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/:city' element={<City />}>
                    <Route path=':codeStation' element={<TrainStation />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App
