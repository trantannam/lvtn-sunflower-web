import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./LoginPopup.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { loginUser } from "../../redux/apiRequest";
import { NotificationManager } from 'react-notifications';

const LoginPopup = (props) => {

    const [phoneNumber, setPhoneNumber] = useState("");
    const [passWord, setPassWord] = useState("");
    const [showPass, setShowPass] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogin = async () => {
        if (passWord !== "" && phoneNumber !== "") {
            await loginUser({ phone_number: phoneNumber, password: passWord }, dispatch, navigate);
            NotificationManager.success('Đăng nhập thành công');
            props.closePopup(false);
        } else (alert('Bạn chưa nhập đầy đủ thông tin'))
    }

    const showResgisterPopup = () => {
        props.closePopup(false);
        props.setShowResgister(true);
    }

    return props.showPopup ? (
        <div className="popup">
            <div className="popup-dialog">
                <div className="header">
                    <button onClick={() => props.closePopup(false)} className="close" type="button">x</button>
                    <h4>Đăng nhập</h4>
                </div>
                <div className="form-group">
                    <p>Đăng nhập bằng số điện thoại</p>
                    <input className="form-control" placeholder="Số điện thoại" onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
                <div className="form-group">
                    <p>Mật khẩu</p>
                    <input type={showPass ? "text" : "password"} className="form-control" placeholder="Mật khẩu" onChange={(e) => setPassWord(e.target.value)} />
                    {showPass ?
                        <AiOutlineEye className="show-passwork" onClick={()=>setShowPass(false)}/> :
                        <AiOutlineEyeInvisible className="show-passwork" onClick={()=>setShowPass(true)}/>}
                </div>
                <div className="form-group checkbox-group">
                    <div className="remember-me">
                        <label className="check"><input type={"checkbox"} />Ghi nhớ mật khẩu</label>
                    </div>
                    <div><Link className="forgot-password">Quên mật khẩu?</Link></div>
                </div>
                <div className="form-group login-button"><button className="btn btn-login" onClick={() => handleLogin()}>Đăng nhập</button></div>
                <div className="form-group login-button">
                    <p>Bạn chưa có tài khoản?
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
                            onClick={() => showResgisterPopup()}
                        >
                            Tạo mới
                        </button>
                    </p>
                </div>
            </div>
        </div>
    ) : ""
}

export default LoginPopup;