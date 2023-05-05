import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddressPopup from "../../components/Address";
import { apiURL } from "../../utils/callAPI";
import request from "../../utils/request";
import "./Payment.css";
import { MdHeadphones, MdOutlinePayments } from "react-icons/md";
import vnpaylogo from "../../img/logo/vnpay-logo2.png";
import { NotificationContainer, NotificationManager } from "react-notifications";

function Payment() {

    const user = useSelector((state) => state.auth.login.currentUser);

    const [cartId, setCardId] = useState("");

    //state address popup
    const [showAPopup, setShowAPopup] = useState(false);
    const [pushSuccessFully, setPushSuccessFully] = useState();

    //state info order
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [mail, setMail] = useState("");
    const [otherPhone, setOtherPhone] = useState("");
    const [hName, setHName] = useState(false);
    const [hPhone, setHPhone] = useState(false);

    const [gender, setGender] = useState(true);
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [ship, setShip] = useState(0);

    //state receive
    const [receiver, setReceiver] = useState("");
    const [phoneReceiver, setPhoneReceiver] = useState("");
    const [diliveryAdd, setDiliveryAdd] = useState([]);
    const [address, setAddress] = useState("")

    //type payment
    let orange = "rgb(255, 130, 0)";
    let white = "rgb(255, 255, 255)";
    let black = "rgb(0, 0, 0)";
    const [textBtn, setTextBtn] = useState("Thanh toán khi nhận hàng")
    const [bGCod, setBGCod] = useState(orange);
    const [textCod, setTextCod] = useState(white);
    const [bGVnp, setBGVnp] = useState(white);
    const [textVnp, setTextVnp] = useState(black);
    const [clicked, setClicked] = useState("cod");

    const navigate = useNavigate();

    const [receiveAtHome, setReceiveAtHome] = useState(true);


    useEffect(() => {
        if (user !== null && user !== undefined) {
            setName(user.customername);
            setPhone(user.phonenumber);
            setHName(true);
            setHPhone(true);
        }
    }, []);

    const getCartByID = async () => {
        try {
            await request.post("/cart/getcart", { customerID: user._id })
                .then(res => {
                    if (res.data.success) {
                        console.log("data", res.data)
                        setCardId(res.data._id)
                        setProducts(res.data.listCart.product)
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    const temporaryPay = () => {
        let temp = 0;
        products.map((item) => {
            temp = temp + item.quantity * item.productID.price;
            // console.log("price", window)
        });

        setTotal(temp);
    }

    const checkedAtHome = () => {
        setReceiveAtHome(true);
    }

    const checkedAtShop = () => {
        setReceiveAtHome(false);
    }

    const writeUserInfo = (e) => {
        if (e) {
            setReceiver(name);
            setPhoneReceiver(phone);
        } else {
            setReceiver('');
            setPhoneReceiver('');
        }
    }

    const orderProduct = async () => {
        if (name === "" || phone === "" || receiver === "" || phoneReceiver === "" || address === "") {
            NotificationManager.error("Bạn chưa nhập đầy đủ thông tin !")
        } else if (clicked === "cod") {
            request.post("/purchaseorder/create", {
                cart: cartId,
                customer: user._id,
                address: address,
                receiver: {
                    name: receiver,
                    gender: gender,
                    phone: phoneReceiver,
                    ortherphone: otherPhone
                },
                paymentstatus: "unpay"
            }).then(
                res => {
                    if (res.data.success === true) {
                        NotificationManager.success("Đặt hàng thành công")
                    }
                }
            )
        }else if (clicked === "vnp") {
            await request.post("/payment/create-url", {
                total: total,
                bankCode: "NCB",
                description: "thanh toan hoa don"
            })
                .then(res => {
                    if (res.data.success === true) {
                        window.location = res.data.data
                    }
                })
        }
    }

    const getAD = async () => {
        await request.post("/delivery/getAddress", { customerID: user._id })
            .then(
                res => {
                    setDiliveryAdd(res.data.data.division);
                    console.log("res", res.data.data.division);
                }
            )
    }


    const OnClickCod = () => {
        if (clicked === "vnp") {
            setBGCod(orange);
            setTextCod(white);
            setBGVnp(white);
            setTextVnp(black);
            setClicked("cod");
            setTextBtn("Thanh toán khi nhận hàng");
        }
    }

    const OnClickVnp = () => {
        if (clicked === "cod") {
            setBGCod(white);
            setTextCod(black);
            setBGVnp(orange);
            setTextVnp(white);
            setClicked("vnp");
            setTextBtn("Thanh toán qua VNPay");
        }
    }

    useEffect(() => temporaryPay(), [products])
    useEffect(() => {
        getCartByID();
    }, [])
    useEffect(() => {
        getAD();
    }, [])

    return (
        <>
            <AddressPopup
                show={showAPopup}
                close={setShowAPopup}
                success={setPushSuccessFully}
            />

            <div className="container">
                <div className="left">
                    <div className="info-order">
                        <div className="info-cus">
                            <p className="title">Thông tin khách hàng</p>
                            <div className="in-group">
                                <p className="child title">Họ và tên *</p>
                                <input className="input-t" readOnly={hName} onChange={(e) => setName(e.target.value)} value={name}></input>
                            </div>
                            <div className="in-group">
                                <p className="child title">Địa chỉ Email *</p>
                                <input className="input-t" onChange={(e) => setMail(e.target.value)} ></input>
                            </div>
                            <div className="in-group">
                                <p className="child title">Số điện thoại</p>
                                <input className="input-t" readOnly={hPhone} onChange={(e) => setPhone(e.target.value)} value={phone}></input>
                            </div>
                            <div className="in-group">
                                <p className="child title" onChange={(e) => setOtherPhone(e.target.value)}>Số điện thoại khác (nếu có)</p>
                                <input className="input-t"></input>
                            </div>
                        </div>
                    </div>
                    <div className="info-order">
                        <div className="info-diliver">
                            <p className="title">Thông tin nhận hàng</p>
                            <div className="in-group">
                                <label htmlFor={"home"} className="label-radio"><input onClick={() => checkedAtHome()} className="radio-button" id={"home"} defaultChecked={true} name={"location"} type={"radio"} />Nhận hàng tại nhà</label>
                                <label htmlFor={"shop"}><input onClick={() => checkedAtShop()} className="radio-button" id={"shop"} name={"location"} type={"radio"} />Nhận hàng tại cửa hàng</label>
                            </div>
                            <div className="in-group">
                                <label htmlFor={"iget"}><input onChange={(e) => writeUserInfo(e.target.checked)} className="radio-button" id={"iget"} name={"iget"} type={"checkbox"} />Tôi là người nhận hàng</label>
                            </div>
                            <div className="in-group">
                                <label ><input id={"male"} defaultChecked={true} onChange={e => setGender(e.target.id)} name="gender" type={"radio"} className="radio-button" />Nam</label>
                                <label ><input id={"female"} onChange={e => setGender(e.target.id)} name="gender" type={"radio"} className="radio-button" />Nữ</label>
                            </div>


                            <input className="input-t" onChange={(e) => setReceiver(e.target.value)} value={receiver} placeholder="Nhập họ tên người nhận *"></input>
                            <input className="input-t child" onChange={(e) => setPhoneReceiver(e.target.value)} value={phoneReceiver} placeholder="Số điện thoại *"></input>
                            <input className="input-t child" placeholder="Số điện thoại khác (không bắt buộc)"></input>
                            {receiveAtHome &&
                                <div className="Add-Address">
                                    {diliveryAdd === null ?
                                        <p className="p-emAdd">Chưa có địa chỉ giao hàng ?</p>
                                        :
                                        <div>
                                            <select
                                                className="form-control"
                                                onChange={(e) => setAddress(e.target.value)}
                                            >
                                                <option className="select-Address" value={""} defaultValue={"select"}>- Chọn địa chỉ -</option>
                                                {diliveryAdd.map((item) =>
                                                    <option
                                                        key={item._id}
                                                        value={`${item.describe}, ${item.ward}, ${item.district}, ${item.province}`}
                                                    >
                                                        {item.describe}, {item.ward}, {item.district}, {item.province}
                                                    </option>
                                                )}
                                            </select>
                                        </div>
                                    }
                                    <button
                                        className="btn btn-add"
                                        onClick={() => { setShowAPopup(true) }}
                                    >
                                        Thêm địa chỉ
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="info-order">
                        <div className="info-diliver">
                            <p className="title">Phương thức thanh toán</p>
                            {/* <div className="in-group"> */}
                            <div className="pay-off" onClick={() => OnClickCod()} style={{ backgroundColor: bGCod, color: textCod }}>
                                <MdOutlinePayments className="logo-payoff" />
                                <p style={{ margin: "0.3rem 0 0 3rem", fontSize: "1.2rem" }}>Thanh toán khi nhận hàng</p>
                            </div>
                            <div className="pay-onl" onClick={() => OnClickVnp()} style={{ backgroundColor: bGVnp, color: textVnp }}>
                                <img className="logo-vnpay" src={vnpaylogo} />
                                <p style={{ margin: "0.3rem 0 0 4rem", fontSize: "1.2rem" }}>Thanh toán qua vnpay</p>
                            </div>
                            {/* </div> */}
                        </div>
                        <button
                            className="btn-pay"
                            onClick={() => orderProduct()}
                        >{textBtn}</button>
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
                                {(total + ship).toLocaleString()} đ
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <NotificationContainer />
        </>
    );
}

export default Payment;