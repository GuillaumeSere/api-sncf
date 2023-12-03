import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import animation from '../95504-bullet-train.json';
import QRcode from "./QRcode.jpg";

const Header = () => {
    return (
        <div className='header'>
            <span className='description-QR'>QR Code du Site</span>
            <img className='QR-code' src={QRcode} alt="" />
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
