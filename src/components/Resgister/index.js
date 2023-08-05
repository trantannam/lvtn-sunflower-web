import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';
import { useState } from "react";
import "./Resgister.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import NotificationContainer from 'react-notifications/lib/NotificationContainer';
import request from '../../utils/request';


const ResgisterPopup = (props) => {

    const [pass, setPass] = useState();
    const [rePass, setRePass] = useState();
    const [customer, setCustomer] = useState();
    const [phone, setPhone] = useState();
    const [gender, setGender] = useState("male");
    const [showPass, setShowPass] = useState(false);
    const [showRePass, setShowRePass] = useState(false);

    const showLoginPopup = () => {
        props.closePopup(false);
        props.setShowLogin(true);
    }

    const getValue = (e) => {
        if (e !== [undefined, null, NaN]) {
            if (e.target.id === "name") {
                setCustomer(e.target.value);
            }
            if (e.target.id === "phone") {
                setPhone(e.target.value);
            }
            if (e.target.id === "pass") {
                setPass(e.target.value);
            }
            if (e.target.id === "repass") {
                setRePass(e.target.value);
            }
        }
    }

    const handleResgister = () => {

        const info = {
            customer_name: customer,
            phone_number: phone,
            gender: gender,
            password: pass
        }
        console.log("info", info)

        if (customer === undefined || customer === null) {
            NotificationManager.warning('Bạn chưa nhập họ và tên','Cảnh báo', 3000);
        } else
        if (phone === undefined || phone === null) {
            NotificationManager.warning('Bạn chưa nhập số điện thoại','Cảnh báo', 3000);
        } else
        if(pass === undefined || pass === null){
            NotificationManager.warning('Bạn chưa nhập mật khẩu', 'Cảnh báo', 3000);
        } else 
        if (pass !== rePass) {
            NotificationManager.error('Bạn đã nhập sai mật khẩu', 'Lỗi!', 5000);
        } else{
            request.post("/customer/register", info)
                .then(res=>{
                    if(res.data.success===true){
                        showLoginPopup();
                        NotificationManager.success('Đăng ký thành công');
                    }
                })
        }
    }

    return props.showPopup ? (
        <>
            <div className="resgister-popup">
                <div className="resgister-dialog">
                    <div className="header">
                        <button className="close" onClick={() => props.closePopup(false)} type="button">x</button>
                        <h4>Tạo tài khoản mới</h4>
                    </div>
                    <div className="input-group">
                        <p>Họ và Tên</p>
                        <input id="name" onChange={e => getValue(e)} className="form-control" placeholder="Họ và Tên" />
                    </div>
                    <div className="input-group">
                        <p>Số điện thoại</p>
                        <input id="phone" onChange={e => getValue(e)} className="form-control" placeholder="Số điện thoại" />
                    </div>
                    <div className="input-group">
                        <p>Mật khẩu</p>
                        <input type={showPass ? "text" : "password"} id="pass" onChange={e => getValue(e)} className="form-control" placeholder="Mật khẩu" />
                        {showPass ?
                        <AiOutlineEye className="showpass" onClick={()=>setShowPass(false)}/> :
                        <AiOutlineEyeInvisible className="showpass" onClick={()=>setShowPass(true)}/>}
                    </div>
                    <div className="input-group">
                        <p>Nhập lại mật khẩu</p>
                        <input type={showRePass ? "text" : "password"} id="repass" onChange={e => getValue(e)} className="form-control" placeholder="Nhập lại mật khẩu" />
                        {showRePass ?
                        <AiOutlineEye className="showpass" onClick={()=>setShowRePass(false)}/> :
                        <AiOutlineEyeInvisible className="showpass" onClick={()=>setShowRePass(true)}/>}
                    </div>
                    <div className="input-group">
                        <label htmlFor={"male"}><input id={"male"} defaultChecked={true} onChange={e => setGender(e.target.id)} name="gender" type={"radio"} className="radio-button" placeholder="Nhập lại mật khẩu" />Nam</label>
                        <label htmlFor={"female"}><input id={"female"} onChange={e => setGender(e.target.id)} name="gender" type={"radio"} className="radio-button" placeholder="Nhập lại mật khẩu" />Nữ</label>
                    </div>
                    <div className="input-group login-button"><button onClick={() => handleResgister()} className="btn btn-login" >Đăng Ký </button></div>
                    <div className="input-group login-button" style={{ margin: "10px 0" }}>
                        <p>Bạn đã có tài khoản?
                            <button
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: "coral",
                                    fontWeight: 700,
                                    fontSize: "1rem",
                                    font: "inherit",
                                    marginLeft: "5px",
                                    cursor: "pointer"
                                }}
                                onClick={() => showLoginPopup()}
                            >
                                Đăng nhập
                            </button>
                        </p>
                    </div>
                </div>
            </div>
            <NotificationContainer />
        </>
    ) : ""
}

export default ResgisterPopup;