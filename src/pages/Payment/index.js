import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { render } from "react-dom";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AddressPopup from "../../components/Address";
import { apiURL } from "../../utils/callAPI";
import request from "../../utils/request";
import "./Payment.css";
import {publicIpv4} from "public-ip";

function Payment() {

    const user = useSelector((state) => state.auth.login.currentUser);

    const [gender, setGender] = useState(true);
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [phone, setPhone] = useState("");
    const [otherPhone, setOtherPhone] = useState("");
    const [products, setProducts] = useState([]);
    const [showAPopup, setShowAPopup] = useState(false);
    const [total, setTotal] = useState(0);
    const [ship, setShip] = useState(0);
    const navigate = useNavigate();


    useEffect(() => {
        if (user !== null && user !== undefined) {
            setName(user.customername);
            setPhone(user.phonenumber)
        }
    }, []);

    const getCartByID = async () => {
        try {
            await request.post("/cart/getcart", { customerID: user._id })
                .then(res => {
                    if (res.data.success) {
                        console.log("data", res.data)
                        setProducts(res.data.listCart.product)
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    const temporaryPay=()=>{
        let temp = 0;
        products.map((item)=>{
            temp= temp + item.quantity*item.productID.price;
            // console.log("price", window)
        });
        
        setTotal(temp);
    }
    const getTimeNow=()=>{
        let d = new Date();
        let yyyy = d.getFullYear().toString();
        let MM = d.getMonth() + 1;
        let dd = d.getDate();
        let hh = d.getHours();
        let mm = d.getMinutes();
        let ss = d.getSeconds();
        if (MM<10){
            MM = "0"+MM;
        }
        if (dd < 10){
            dd = "0" +dd;
        }
        if (hh < 10){
            hh = "0" +hh;
        }
        if (mm < 10){
            mm = "0" +mm;
        }
        if (ss < 10){
            ss = "0" +ss;
        }
        let date = yyyy+MM+dd+hh+mm+ss;
        console.log("date",date)
        return(date);
    }

    const expireDate=()=>{
        let d = new Date();
        
        let yyyy = d.getFullYear.toString();
        let MM = d.getMonth() + 1;
        let dd = d.getDate();
        let hh = d.getHours();
        let mm = d.getMinutes();
        let ss = d.getSeconds();
        if (MM<10){
            MM = "0"+MM;
        }
        if (dd < 10){
            dd = "0" +dd;
        }
        if (hh < 10){
            hh = "0" +hh;
        }
        if (mm < 10){
            mm = "0" +mm;
        }
        if (ss < 10){
            ss = "0" +ss;
        }
        let date = yyyy+MM+dd+hh+mm+ss;
        console.log("date",date)
        return(date);
    }
    useEffect(()=>temporaryPay(), [products])
    //"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp
    //https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
    //?vnp_Amount=1806000
    //&vnp_Command=pay
    //&vnp_CreateDate=20210801153333
    //&vnp_CurrCode=VND
    //&vnp_IpAddr=127.0.0.1
    //&vnp_Locale=vn
    //&vnp_OrderInfo=Thanh+toan+don+hang+%3A5
    //&vnp_OrderType=other
    //&vnp_ReturnUrl=https%3A%2F%2Fdomainmerchant.vn%2FReturnUrl
    //&vnp_TmnCode=DEMOV210
    //&vnp_TxnRef=5
    //&vnp_Version=2.1.0
    //&vnp_SecureHash=3e0d61a0c0534b2e36680b3f7277743e8784cc4e1d68fa7d276e79c23be7d6318d338b477910a27992f5057bb1582bd44bd82ae8009ffaf6d141219218625c42 
    const orderProduct = async() => {
        window.location=`https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=${(total+ship)*100}&vnp_Command=pay&vnp_CreateDate=${getTimeNow()}&vnp_CurrCode=VND&vnp_IpAddr=127.0.0.1&vnp_Locale=vn&vnp_OrderInfo=Thanh toan don hang&vnp_OrderType=other&vnp_ReturnUrl=http://localhost:3000/payment&vnp_TmnCode=08T2TCE9&vnp_TxnRef=5&vnp_Version=2.1.0&vnp_SecureHash=MGOFSAFMWYRAPNCLNEXFUYYRQXZFXOCR&vnp_ExpireDate=${expireDate()}`;
    }

    useEffect(() => {
        getCartByID();
    }, [])

    return (
        <>
            <AddressPopup
                show={showAPopup}
                close={setShowAPopup}
            />
            <div className="container">
                <div className="left">
                    <div className="info-order">
                        <div className="info-cus">
                            <p className="title">Thông tin khách hàng</p>
                            <div className="in-group">
                                <p className="child title">Họ và tên</p>
                                <input className="input-t" value={name}></input>
                            </div>
                            <div className="in-group">
                                <p className="child title">Địa chỉ Email</p>
                                <input className="input-t" ></input>
                            </div>
                            <div className="in-group">
                                <p className="child title">Số điện thoại</p>
                                <input className="input-t" value={phone}></input>
                            </div>
                            <div className="in-group">
                                <p className="child title">Số điện thoại khác (nếu có)</p>
                                <input className="input-t"></input>
                            </div>
                        </div>
                    </div>
                    <div className="info-order">
                        <div className="info-diliver">
                            <p className="title">Địa chỉ giao hàng</p>
                            <div className="in-group">
                                <label htmlFor={"home"} className="label-radio"><input className="radio-button" id={"home"} defaultChecked={true} name={"location"} type={"radio"} />Nhận hàng tại nhà</label>
                                <label htmlFor={"shop"}><input className="radio-button" id={"shop"} defaultChecked={true} name={"location"} type={"radio"} />Nhận hàng tại cửa hàng</label>
                            </div>
                            <div className="in-group">
                                <label htmlFor={"iget"}><input className="radio-button" id={"iget"} defaultChecked={true} name={"iget"} type={"checkbox"} />Tôi là người nhận hàng</label>
                            </div>
                            <div className="in-group">
                                <label ><input id={"male"} defaultChecked={true} onChange={e => setGender(e.target.id)} name="gender" type={"radio"} className="radio-button" />Nam</label>
                                <label ><input id={"female"} onChange={e => setGender(e.target.id)} name="gender" type={"radio"} className="radio-button" />Nữ</label>
                            </div>
                            <input className="input-t" placeholder="Nhập họ tên người nhận"></input>
                            <input className="input-t child" placeholder="Số điện thoại"></input>
                            <input className="input-t child" placeholder="Số điện thoại khác (không bắt buộc)"></input>
                            <input className="input-t add" placeholder="Chưa có địa chỉ giao hàng"></input>
                            <button
                                className="btn btn-add"
                                onClick={() => { setShowAPopup(true) }}
                            >
                                Thêm địa chỉ
                            </button>
                        </div>
                    </div>
                    <div className="info-order">
                        <div className="info-diliver">
                            <p className="title">Phương thức thanh toán</p>
                            <div className="in-group">
                                <label
                                    htmlFor={"tra"}
                                    className="label-radio">
                                    <input
                                        className="radio-button"
                                        id={"receit"}
                                        defaultChecked={true}
                                        name={"payment"}
                                        type={"radio"}
                                    />
                                    Thanh toán khi nhận hàng
                                </label>
                                <label
                                    htmlFor={"online"}
                                    className="label-radio"
                                >

                                    <input
                                        className="radio-button"
                                        id={"vnpay"}
                                        // defaultChecked={true}
                                        name={"payment"}
                                        type={"radio"}
                                    />
                                    Thanh toán qua vnpay
                                </label>
                            </div>
                            <button
                                className="btn btn-pay"
                                onClick={() => orderProduct()}
                            >Thanh toan</button>

                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="info-payment">
                        <div className="title">
                            Sản phẩm
                        </div>
                        <hr style={{ border: "1px solid rgb(200, 200, 200)" }} />
                        {products.map((item, index) =>
                            <div key={index} className="info-product">
                                <div className="img-item">
                                    <img src={apiURL + `${item.productID.image}`} />
                                </div>
                                <div className="name-item">
                                    {item.productID.productname}
                                </div>
                                <div className="price-item">
                                    {item.productID.price.toLocaleString()} đ
                                </div>
                            </div>)}
                    </div>
                    <div className="info-payment">
                        <div className="title">
                            Đơn hàng
                        </div>
                        <hr style={{ border: "1px solid rgb(200, 200, 200)" }} />
                        <div className="info-product">
                            <div className="name-item">
                                Tạm tính
                            </div>
                            <div className="price-item">
                                {total.toLocaleString()} đ
                            </div>
                        </div>
                        <div className="info-product">
                            <div className="name-item">
                                Phí ship
                            </div>
                            <div className="price-item">
                                {ship.toLocaleString()} đ
                            </div>
                        </div>

                        <hr style={{ border: "1px solid rgb(200, 200, 200)" }} />
                        <div className="info-product">
                            <div className="name-item">
                            Tổng cộng
                            </div>
                            <div className="price-item">
                                {(total+ ship).toLocaleString()} đ
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Payment;