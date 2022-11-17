import { useEffect, useState } from "react";
import request from "../../utils/request";
import "./DetailProduct.css";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { apiURL } from "../../utils/callAPI";

function DetailProduct() {

    const [item, setItem] = useState([]);
    const [amount, setAmount] = useState({ value: 1 });

    const getInfoProduct = () => {
        request.get(`/product/${window.location.search.slice(4,)}`)
            .then(res => {
                console.log(res.data.result);
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
            console.log('Plus', amount.value+1)
        }
    }

    const handleMinus = () => {
        if (amount.value>1) {
            setAmount({ value: amount.value - 1 })
            console.log('Minus', amount.value-1)
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

    return (
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
                            <p>
                                <div className="input-group">
                                    <span className="input-group-btn input-group-prepend">
                                        <button className="btn btn-primary" onClick={() => handleMinus()} type="button">-</button>
                                    </span>
                                    <input id="quantity" type="text" value={amount.value} onChange={(e) => handleOnChance(e.target.value)} name="quantity" min={1} max={99} className="form-control"></input>
                                    <span className="input-group-btn input-group-append">
                                        <button className="btn btn-primary" onClick={() => handlePLus()} type="button">+</button>
                                    </span>
                                </div>
                            </p>
                        </div>
                        <hr />
                        <p>Giá bán tại shop: </p>
                        <div className="price">{item.price}đ / Bó</div>
                        <div className="btn-box">
                            <button className="hidden toggle-popupCart" type="button"></button>
                            <button className="btn btn-buy" type="button">Mua ngay</button>
                            <button className="btn btn-add-to-cart" type="button" href="">Thêm vào giỏ</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailProduct;