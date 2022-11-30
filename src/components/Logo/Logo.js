import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className='ma4 mt0 '>
            <Tilt gyroscope={true} tiltMaxAngleX={45} tiltMaxAngleY={45} className='Tilt br2 shadow-2' style={{width: '150px', height: '150px'}}>
                <div className='Tilt-inner pa3 '>
                    <img style={{paddingTop: '5px'}} src={brain} alt=""/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;