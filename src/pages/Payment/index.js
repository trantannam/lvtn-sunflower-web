import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddressPopup from "../../components/Address";
import { apiURL } from "../../utils/callAPI";
import request from "../../utils/request";
import "./Payment.css";
import { MdHeadphones, MdOutlinePayments } from "react-icons/md";
import vnpaylogo from "../../img/logo/vnpay-logo2.png";
import { NotificationContainer, NotificationManager } from "react-notifications";
import { updateProduct } from "../../redux/cartSlice";
import ConfirmPopup from "../../components/ConfirmPopup";

function Payment() {

    //customer info 
    const user = useSelector((state) => state.auth.login.currentUser);
    const { cart } = useSelector(state => state)
    const dispatch = useDispatch();

    const [cartId, setCardId] = useState("");

    //state address popup
    const [showAPopup, setShowAPopup] = useState(false);
    const [pushSuccessFully, setPushSuccessFully] = useState();

    //confirmPopup state
    const [showCPopup, setShowCPopup] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    //state info order
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [mail, setMail] = useState("");
    const [otherPhone, setOtherPhone] = useState("");
    const [hName, setHName] = useState(false);
    const [hPhone, setHPhone] = useState(false);

    const [gender, setGender] = useState(true);
    const [products, setProducts] = useState([]);
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

    const tranCodeCOD = () => {
        let time = new Date();
        return time.getTime().toString() + Math.floor(Math.random() * 100);
    }

    useEffect(() => {
        if (user !== null && user !== undefined) {
            setName(user.customer_name);
            setPhone(user.phone_number);
            setHName(true);
            setHPhone(true);
        }
    }, []);

    function calcTotal() {
        if (cart.products.length) {
            return cart.products.reduce(
                (sum, product) => (
                    sum + (product.price * product.quantity)
                ), 0)
        } else {
            return 0
        }
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

    //useEffect cod 
    useEffect(() => {
        if (confirmed) {
            request.post("/purchase-order/create", {
                tranCode: tranCodeCOD(),
                customer: user._id,
                receiveAddress: address,
                receiver: {
                    name: receiver,
                    gender: gender,
                    phone: phoneReceiver,
                    ortherphone: otherPhone
                },
                totalEstimate: calcTotal(),
                products: cart.products || [],
                deliveryStatus: "waiting for progressing",
                paymentStatus: "cod"
            }).then(
                res => {
                    if (res.data.success === true) {
                        dispatch(updateProduct([]))
                        NotificationManager.success("Đặt hàng thành công")
                    }
                }
            )
        }
    }, [confirmed])

    const orderProduct = async () => {
        if (name === "" || phone === "" || receiver === "" || phoneReceiver === "" || address === "") {
            NotificationManager.error("Bạn chưa nhập đầy đủ thông tin !")
        } else if (clicked === "cod") {
            setShowCPopup(true);
        } else if (clicked === "vnp") {
            await request.post("/payment/create-url", {
                total: calcTotal(),
                bankCode: "NCB",
                description: "thanh toan hoa don"
            })
                .then(url_Res => {
                    if (url_Res.data.success === true) {
                        request.post("/purchase-order/create", {
                            customer: user._id,
                            receiveAddress: address,
                            tranCode: url_Res.data.tranCode,
                            receiver: {
                                name: receiver,
                                gender: gender,
                                phone: phoneReceiver,
                                ortherphone: otherPhone
                            },
                            products: cart.products || [],
                            totalEstimate: calcTotal(),
                            deliveryStatus: "waiting for progressing",
                            paymentStatus: "waiting for pay"
                        }).then(
                            res => {
                                if (res.data.success === true) {
                                    window.location = url_Res.data.data;
                                }
                            }
                        )
                        /* 
                ===> CSDL   + Thêm tranNO
                            + Thêm deliverystatus
                            + Thêm 1 trạng thái mới khi thanh toán "waiting for pay"
                ===> api    + Api vnpay có thêm tranNO
                ===> to do  + Chỉnh sửa PTTT "cod"
                            + Cập nhật vnp
                            + Khi thanh toán vnpay --> tạo đơn hàng
                            + Thiết kế api update PurchaseOrder
                            + Url_return xác thực qua tranNo===vnp_TxnRef
                        */
                    }
                })
        }
    }

    const getAD = async () => {
        await request.post("/delivery/getAddress", { customerID: user._id })
            .then(res => {
                const data = res.data.data
                if (data)
                    setDiliveryAdd(data.division || []);
            }
            )
    }

    // COD payment
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

    // VNP payment
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

    useEffect(() => {
        getAD();
    }, [])

    return (
        <>
            <ConfirmPopup
                show={showCPopup}
                close={setShowCPopup}
                title="Xác nhận đặt hàng"
                content="Nhấn xác nhận để tiếp tục đặt hàng"
                continue={setConfirmed}
            />


            <AddressPopup
                show={showAPopup}
                close={setShowAPopup}
                success={setPushSuccessFully}
            />

            <div className="container">
                <div className="left">
                    {/* Orderer info */}
                    <div className="info-order">
                        <div className="info-cus">
                            <p className="title">Thông tin khách hàng</p>
                            <div className="in-group">
                                <p className="child title">Họ và tên *</p>
                                <input className="input-t" readOnly={hName} onChange={(e) => setName(e.target.value)} value={user.customer_name}></input>
                            </div>
                            <div className="in-group">
                                <p className="child title">Địa chỉ Email *</p>
                                <input className="input-t" onChange={(e) => setMail(e.target.value)} ></input>
                            </div>
                            <div className="in-group">
                                <p className="child title">Số điện thoại</p>
                                <input className="input-t" onChange={(e) => setPhone(e.target.value)} value={user.phone_number}></input>
                            </div>
                            <div className="in-group">
                                <p className="child title" onChange={(e) => setOtherPhone(e.target.value)}>Số điện thoại khác (nếu có)</p>
                                <input className="input-t"></input>
                            </div>
                        </div>
                    </div>
                    <div className="info-order">
                        {/* receiver info */}
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
                            <div className="pay-cod" onClick={() => OnClickCod()} style={{ backgroundColor: bGCod, color: textCod }}>
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
                        {cart.products.length && cart.products.map((item, index) =>
                            <div key={index} className="info-product">
                                <div className="img-item">
                                    <img src={apiURL + `${item.image[0]}`} alt="" />
                                </div>
                                <div className="name-item">
                                    {item.name}
                                    <br />
                                    <br />
                                    x {item.quantity}
                                </div>
                                <div className="price-item">
                                    {item.price.toLocaleString()} đ
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
                                {calcTotal().toLocaleString()} đ
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
                                {(calcTotal() + ship).toLocaleString()} đ
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