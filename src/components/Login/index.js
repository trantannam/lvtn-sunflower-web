import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import request from "../../utils/request";
import {useDispatch, useSelector} from "react-redux";
import "./LoginPopup.css"
import { loginUser } from "../../redux/apiRequest";

const LoginPopup = (props) => {

    const [phoneNumber, setPhoneNumber] = useState("");
    const [passWord, setPassWord] = useState("");
    const [info, setInfo] = useState([]);
    const dispatch = useDispatch();
    const naviagte = useNavigate();
    const user = useSelector((state)=>state.auth.login.currentUser);

    // const authCustomer = async () => {
    //     await request.post("/customer/login", { phonenumber: phoneNumber, password: passWord })
    //         .then(res => {
    //             setInfo(res.data)
    //             console.log("res", res);
    //         })
    //         .catch((err) => {
    //             console.error(err)
    //         })
    // }

    const handleLogin = async () => {
        if (passWord !== "" && phoneNumber !== "") {
            await loginUser({ phonenumber: phoneNumber, password: passWord }, dispatch, naviagte);
            // console.log("user", user)
            // props.info(user);
            props.closePopup(false);
        } else (alert('ban chua nhap pass hay sdt'))
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
                    <input className="form-control" placeholder="Mật khẩu" onChange={(e) => setPassWord(e.target.value)} />
                </div>
                <div className="form-group checkbox-group">
                    <div className="remember-me">
                        <label className="check"><input type={"checkbox"} />Ghi nhớ mật khẩu</label>
                    </div>
                    <div><Link className="forgot-password">Quên mật khẩu?</Link></div>
                </div>
                <div className="form-group login-button"><button className="btn btn-login" onClick={() => handleLogin()}>Đăng nhập</button></div>
                <div className="form-group login-button"><p>Bạn chưa có tài khoản?<Link>Tạo mới</Link></p></div>
            </div>
        </div>
    ) : ""
}

export default LoginPopup;