import './DetectFlower.css';
import { GiFlowerEmblem } from 'react-icons/gi'
import DetectPopup from './DetectPopup';
import { useState } from 'react';

function DetectFlower() {

    const [detectPopup, setDetectPopup] = useState(false);

    return (
        <div>
            <DetectPopup detect={detectPopup} setDetect={()=>setDetectPopup()} />
            <div className='detect' onClick={()=>setDetectPopup(true)}>
                <GiFlowerEmblem className='icon' />
            </div>
        </div>
    )
}

export default DetectFlower;