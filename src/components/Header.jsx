import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import animation from '../95504-bullet-train.json';

const Header = () => {
    return (
        <div className='header'>
            <Player
                autoplay
                loop
                src={animation}
                className='animation'
                style={{ height: '400px', width: '500px',marginTop:'-8rem' }}
            >
            </Player>
         
        </div>
    )
}

export default Header
