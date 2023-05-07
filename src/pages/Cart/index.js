import { Link, useNavigate } from "react-router-dom";
import { GrMap } from "react-icons/gr";
import "./Cart.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import request from "../../utils/request";
import { apiURL } from "../../utils/callAPI";
import { AiOutlineClose } from "react-icons/ai";
import { quantityProduct, removeProduct } from "../../redux/cartSlice";

import { NotificationManager } from 'react-notifications';
function Cart() {

    const userInfo = useSelector((state) => state.auth.login.currentUser);
    const { cart } = useSelector(state => state)
    const [listProduct, setListProduct] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDeleteProductCart = (id) => {
        dispatch(removeProduct({ id }))
        NotificationManager.success('Xóa thành công.');
    }
    
    const handleQuantityChange = (id, quantity) => {
        if (quantity === 0) return;
        if (quantity === 50) return;
        dispatch(quantityProduct({ id, quantity }));
    }
    
    function calcTotal () {
        if (cart.products.length) {
            return cart.products.reduce(
                (sum, product) => (
                    sum + (product.price * product.quantity)
                ), 0)
        } else {
            return 0
        }
    }

    const pay = () =>{
        navigate("/payment")
    }

    useEffect(()=>{calcTotal()},[listProduct]);

    useEffect(() => {
        setListProduct(cart.products)
    }, [cart])

    document.title = "Giỏ hàng"

    return (
        <div className="cart-box" id="cart-page">
            <div className="product-purchase">
                <div className="cart-list">
                    <div className="header-list">
                        <div className="header-item">Sản phẩm</div>
                        <div className="header-item">Đơn giá</div>
                        <div className="header-item">Số lượng</div>
                        <div className="header-item">Tổng cộng</div>
                    </div>
                    {listProduct && listProduct.map((item, index) =>
                        <div key={index} className="body-list">
                            <div className="body-item product-info">
                                <div className="cart-product">
                                    <div className="p-image">
                                        <img src={apiURL + `${item.image}`} alt="Bình Hoa Niềm Vui Nhỏ Bé 262" />
                                    </div>
                                    <div className="p-info">
                                        <Link className="p-name" to={"/"}>{item.product_name}</Link>
                                        {/* <a className="p-name" href="https://shop.dalathasfarm.com/a5/binh-hoa-niem-vui-nho-be-262-p1452.html" title="Bình Hoa Niềm Vui Nhỏ Bé 262">product name</a> */}
                                        {/* button flower love */}
                                        {/* <a className="wishlist" data-toggle="modal" data-keyboard="false" data-backdrop="static" data-target="#loginModal" title="Yêu thích"><img width="20" src="https://shop.dalathasfarm.com/public/dalathasfarm/images/like-2.png"/>Yêu thích</a> */}

                                    </div>
                                </div>
                            </div>
                            <div className="body-item price">
                                <span>{item.price.toLocaleString()} đ/ Bó</span>
                            </div>
                            <div className="body-item quantity">
                                <div className="input-group bootstrap-touchspin bootstrap-touchspin-injected">
                                    {/* Product amount */}
                                    <span className="input-group-btn input-group-prepend">
                                        <button className="btn btn-primary bootstrap-touchspin-down" onClick={() => handleQuantityChange(item.productId, item.quantity - 1)} type="button">-</button>
                                    </span>
                                    <input className="quantity-input form-control"
                                        type="text"
                                        disabled
                                        name="quantity"
                                        value={item.quantity}/>
                                    <span className="input-group-btn input-group-append">
                                        <button className="btn btn-primary bootstrap-touchspin-up" onClick={() => handleQuantityChange(item.productId, item.quantity + 1)} type="button">+</button>
                                    </span>

                                </div>
                                {/* <input name="item_qty_current" value={1} type="hidden" /> */}
                            </div>
                            <div className="body-item total">
                                <span>{(item.price * item.quantity).toLocaleString()} đ</span>
                                <button type="button" onClick={() => handleDeleteProductCart(item.productId)}>
                                    <AiOutlineClose style={{ fontSize: "20px", color: "red" }} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="temp-price">
                <div className="border-wrapp">
                    <div className="row ship-address">
                        <input type="hidden" name="city_id" id="city_id" value="30" />
                        <div className="title">
                            <span className="green">Giao hàng tới</span>
                        </div>
                        <div className="address py-3">
                            <GrMap className="icon-map" />
                            <span className="current-address" id="current_address" data-city="TP. Hồ Chí Minh">{"Bạn chưa có địa chỉ nhận hàng."}</span>
                        </div>
                    </div>
                </div>
                <div className="border-wrapp padding-0">
                    <div className="order-cart-header">
                        <p>Giỏ hàng của tôi</p>
                        <p className="total-item">10 SP</p>
                    </div>
                    <div className="order-cart-content">
                        <div className="order-cart-content-item">
                            <p>Tạm tính</p>
                            <p>{calcTotal().toLocaleString()} đ</p>
                        </div>
                        <div className="order-cart-content-item">
                            <p>Phí giao hàng tạm tính:</p><p>Miễn phí</p>
                        </div>
                        <br />
                        <div className="order-cart-content-item cart-all-total">
                            <p>Tổng cộng</p><p>{calcTotal().toLocaleString()} đ</p>
                        </div>
                        <small className="text-right">Giá đã bao gồm VAT</small>
                    </div>
                </div>
                <div className="btn-box">
                    <a className="btn btn-buy btn-confirm" onClick={()=>pay()}>TIẾP TỤC</a>
                </div>
            </div>
        </div>
    )
}

export default Cart;