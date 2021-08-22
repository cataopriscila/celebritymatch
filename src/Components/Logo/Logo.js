import Tilt from 'react-tilt';
import './Logo.css';
import oscar from './oscar.png'

export default function Logo () {
    return(
        <div className='ma3 mt0 pl4'>
        <Tilt className="Tilt br3 shadow-1" options={{ max: 35 }} style={{ height: 90, width: 90 }} >
            <div className="Tilt-inner"><img style={{paddingTop:15, height: 60}} alt='logo' src={oscar}/>
            </div>
        </Tilt>
        </div>
    );

}