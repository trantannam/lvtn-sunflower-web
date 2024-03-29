import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import request from "../../utils/request";
import "./DetailProduct.css";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { apiURL } from "../../utils/callAPI";
import { useNavigate, useParams } from "react-router-dom";
import { addProductToCart } from "../../redux/cartSlice";
import { NotificationManager } from 'react-notifications';

function DetailProduct() {

    const [item, setItem] = useState([]);
    const [image, setImage] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const { cart } = useSelector(state => state);
    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        request.get(`/product/${id}`)
            .then(res => {
                const data = res.data.data;
                setItem(data);
                setImage(data.image)
                document.title = data.product_name;
            })
    }, [id]);
    const handleOnChance = (value) => {
        setQuantity(value);
    }

    const view = {
        customPaging: function (i) {
            return (
                <a>
                    {i && i.map((link, index) => <img key={index} src={`${apiURL}` + link} alt=" " />)}
                </a>
            );
        },
        variableWidth: true,
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,

    };

    const dispatch = useDispatch();

    const handleAddToCart = (id) => {
        const product = {
            name: item.product_name,
            image: item.image,
            price: item.price,
            product_type: item.product_type._id || '',
            quantity
        }
        const index = cart.products.findIndex((item) => item.productId === id);
        if (index >= 0) {
            if (Number(cart.products[index].quantity) + Number(quantity) > 50 || Number(cart.products[index].quantity) > 50) {
                NotificationManager.error('Sản phẩm vượt quá số lượng cho phép - 50 sản phẩm');
            } else {
                dispatch(addProductToCart({ id, product }))
                NotificationManager.success('Thêm giỏ hàng thành công.');
            }
        } else {
            dispatch(addProductToCart({ id, product }))
            NotificationManager.success('Thêm giỏ hàng thành công.');
        }
    }

    const handleBuyNow = (id) => {
        handleAddToCart(item._id);
        navigate("/cart")
    }
    return (
        <>
            <div className="container">
                <div style={{height:40}}/>
                <div className="top-detail-product">
                    <div className="row">
                        <div className="col-image" >
                            <Slider {...view.customPaging(image)} style={{ width: "500px", height: "500px" }} >
                                {image && image.map((link, index) =>
                                    <div key={index}>
                                        <img style={{ width: "100%", height: "inherit" }} src={`${apiURL}` + link} alt=" " />
                                    </div>
                                )}
                            </Slider>
                        </div>
                        <div className="col-info">
                            <h1 className="title" itemProp="name">{item.product_name}</h1>
                            {/* <div className="product-feture"><p>Sản phẩm bao gồm:</p></div> */}
                            <div className="product-feture"><p style={{ whiteSpace: "break-spaces" }}>{item.description}</p></div>
                            {/* <textarea value={item.description} style={{width:"100%", height:200}}></textarea> */}
                            <p className="image-notice"><small>Sản phẩm thực nhận có thể khác với hình đại diện trên website (đặc điểm thủ công và tính chất tự nhiên của hàng nông nghiệp)</small></p>

                            <hr />
                            <div className="product-info quantity">
                                <p>Số lượng</p>

                                <div className="input-group">
                                    <span className="input-group-btn input-group-prepend">
                                        <button className="btn btn-primary" onClick={() => setQuantity(item => item === 1 ? item : item -= 1)} type="button">-</button>
                                    </span>
                                    <input id="quantity" type="number" value={quantity} onChange={(e) => handleOnChance(e.target.value)} name="quantity" min={1} max={50} className="form-control"></input>
                                    <span className="input-group-btn input-group-append">
                                        <button className="btn btn-primary" onClick={() => setQuantity(item => item >= 50 ? 50 : item = Number(item) + 1)} type="button">+</button>
                                    </span>
                                </div>

                            </div>
                            <hr />
                            <p>Giá bán tại shop: </p>
                            <div className="price">{item.price > 0 ? item.price.toLocaleString() : 0} đ / Bó</div>
                            <div className="btn-box">
                                <button className="hidden toggle-popupCart" type="button"></button>
                                <button className="btn btn-buy"
                                    onClick={() =>
                                        handleBuyNow(item._id)
                                    }
                                    type="button"
                                >Mua ngay</button>
                                <button className="btn btn-add-to-cart" type="button" onClick={() => handleAddToCart(item._id)}>Thêm vào giỏ</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DetailProduct;