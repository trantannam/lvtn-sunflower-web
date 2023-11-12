import axios from 'axios';
import { useRef, useState } from 'react';
import './DetectFlower.css';


const DetectPopup = (props) => {

    const canvasRef = useRef();

    const [image, setImage] = useState("");
    const [stt, setStt] = useState(false);
    const img = new Image()
    const formData = new FormData();

    const handleOnChange = (event) => {
        setImage(event.target.files[0])
        setStt(false)
    }

    const handleConfirm = async () => {
        formData.append("image_file", image, "image_file")
        await axios.post("http://10.13.129.226:8080/detect", formData, {
            headers: {
                "Access-Control-Allow-Origin": '*',
                "Content-Type": 'multipart/form-data'
            }
        })
            .then(res => {
                setStt(true);
                console.log("data", res.data)
                img.src = URL.createObjectURL(image)
                img.onload = async () => {
                    const canvas = canvasRef.current;
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    ctx.strokeStyle = "#00FF00";
                    ctx.lineWidth = 3;
                    ctx.font = "18px serif";
                    res.data.forEach(([x1, y1, x2, y2, label]) => {
                        ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
                        ctx.fillStyle = "#00ff00";
                        const width = ctx.measureText(label).width;
                        ctx.fillRect(x1, y1, width + 10, 25);
                        ctx.fillStyle = "#000000";
                        ctx.fillText(label, x1, y1 + 18);
                    });
                }
            })
    }


    return props.detect ?
        (<div>
            <div className="detect-popup">
                <div className="detect-wrap">
                    <p className="title">Nhận diện hoa</p>
                    <p className="content">Nhấn chọn để lấy ảnh nhận diện</p>
                    <div className='i-m'>
                        <input id="flower" type='file' onChange={(event) => handleOnChange(event)} style={{ width: "100%", paddingBottom: 20 }}></input>
                        {
                            !stt ?
                                image && <img src={URL.createObjectURL(image)} />
                                : <canvas style={{maxHeight:500}} ref={canvasRef} />
                        }
                    </div>
                    <div className="detect-btn">
                        <button className="detect-btn btn" onClick={() => handleConfirm()}>Xác nhận</button>
                        <button className="detect-btn btn" onClick={() => props.setDetect(false)}>Hủy</button>
                    </div>
                </div>
            </div>
        </div>)
        : <div></div>
}

export default DetectPopup;