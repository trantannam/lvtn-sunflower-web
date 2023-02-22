import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import request from "../../utils/request";
import "./DetailProduct.css";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { apiURL } from "../../utils/callAPI";
import { useNavigate } from "react-router-dom";
import AddressPopup from "../Address";

function DetailProduct() {

    const [showAddress, setShowAddress] = useState();

    const [item, setItem] = useState([]);
    const [amount, setAmount] = useState({ value: 1 });
    const infoCustomer = useSelector((state) => state.auth.login.currentUser);
    const navigate = useNavigate();

    const getInfoProduct = () => {
        request.get(`/product/${window.location.href.split("/")[4]}`)
            .then(res => {
                setItem(res.data.result)
            })
    }

    

    const handleOnChance = (e) => {
        setAmount({ value: parseInt(e) });
        console.log('Onchange', e)
    }

    const handlePLus = () => {
        if (amount.value < 99) {
            setAmount({ value: amount.value + 1 });
            console.log('Plus', amount.value + 1)
        }
    }

    const handleMinus = () => {
        if (amount.value > 1) {
            setAmount({ value: amount.value - 1 })
            console.log('Minus', amount.value - 1)
        }
    }

    useEffect(() => {
        getInfoProduct();
    }, []);

    var view = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true
    };

    document.title = `${item.productname}`

    function getCart(customerID, productID) {
        request.post("/cart/getcart", { customerID: customerID })
            .then(res => {
                if (res.data.success === false) {
                    request.post("/cart/createcart",
                        {
                            customerID: customerID,
                            product: {
                                productID: productID,
                                quantity: amount.value
                            }
                        }).then(res => {
                            navigate("/cart");
                            console.log("createCart: ", res)
                        })
                } else {
                    request.post("/cart/addcart", {
                        _id: res.data.listCart._id,
                        product: {
                            productID: productID,
                            quantity: amount.value
                        }
                    }).then(res => {
                        navigate("/cart");

                        console.log("addCart: ", res);
                    })
                }
                console.log("getCart: ", res)
            })
    }

    return (
        <>
        <AddressPopup 
            show={showAddress}
            close= {setShowAddress}
        />
        <div className="container">
            <div className="top-detail-product">
                <div className="row">
                    <div className="col-image">
                        <Slider {...view}  >
                            <img src={`${apiURL}` + item.image} />
                        </Slider>
                    </div>
                    <div className="col-info">
                        <h1 className="title" itemProp="name">{item.productname}</h1>
                        <div className="product-feture"><p>Sản phẩm bao gồm:</p></div>
                        <p className="image-notice"><small>Sản phẩm thực nhận có thể khác với hình đại diện trên website (đặc điểm thủ công và tính chất tự nhiên của hàng nông nghiệp)</small></p>

                        <hr />
                        <div className="product-info quantity">
                            <p>Số lượng</p>
                            
                                <div className="input-group">
                                    <span className="input-group-btn input-group-prepend">
                                        <button className="btn btn-primary" onClick={() => handleMinus()} type="button">-</button>
                                    </span>
                                    <input id="quantity" type="text" value={amount.value} onChange={(e) => handleOnChance(e.target.value)} name="quantity" min={1} max={99} className="form-control"></input>
                                    <span className="input-group-btn input-group-append">
                                        <button className="btn btn-primary" onClick={() => handlePLus()} type="button">+</button>
                                    </span>
                                </div>

                        </div>
                        <hr />
                        <p>Giá bán tại shop: </p>
                        <div className="price">{item.price > 0 ? item.price.toLocaleString() : 0} đ / Bó</div>
                        <div className="btn-box">
                            <button className="hidden toggle-popupCart" type="button"></button>
                            <button className="btn btn-buy"
                                onClick={()=>
                                    setShowAddress(true)
                                }
                                type="button"
                            >Mua ngay</button>
                            <button className="btn btn-add-to-cart" type="button" onClick={() => getCart(infoCustomer._id, item._id)}>Thêm vào giỏ</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default DetailProduct;