import { Link } from "react-router-dom";
import { GrMap } from "react-icons/gr";
import "./Cart.css";
import { useState } from "react";

function Cart() {
    const [amount, setAmount] = useState({ value: 1 });

    const handleOnChance = (e) => {
        if(e!==NaN){
            setAmount({ value: parseInt(e) });
        }
    }

    const handlePLus = () => {
        if (amount.value < 99) {
            setAmount({ value: amount.value + 1 });
        }
    }

    const handleMinus = () => {
        if (amount.value > 1) {
            setAmount({ value: amount.value - 1 });
        }
    }

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
                    <div className="body-list">
                        <div className="body-item product-info">
                            <div className="cart-product">
                                <div className="p-image">
                                    <img src="https://tools.dalathasfarm.com/public/products/ADF3/ADF39AP262/AA0_5550wm_800x800.jpg" alt="Bình Hoa Niềm Vui Nhỏ Bé 262" />
                                </div>
                                <div className="p-info">
                                    <Link className="p-name" to={"/"}>product name</Link>
                                    {/* <a className="p-name" href="https://shop.dalathasfarm.com/a5/binh-hoa-niem-vui-nho-be-262-p1452.html" title="Bình Hoa Niềm Vui Nhỏ Bé 262">product name</a> */}
                                    {/* button flower love */}
                                    {/* <a className="wishlist" data-toggle="modal" data-keyboard="false" data-backdrop="static" data-target="#loginModal" title="Yêu thích"><img width="20" src="https://shop.dalathasfarm.com/public/dalathasfarm/images/like-2.png"/>Yêu thích</a> */}

                                </div>
                            </div>
                        </div>
                        <div className="body-item price" data-price="500000">
                            <span>999999 d/binh</span>
                        </div>
                        <div className="body-item quantity">
                            <div className="input-group bootstrap-touchspin bootstrap-touchspin-injected">
                                {/* Product amount */}
                                <span className="input-group-btn input-group-prepend">
                                    <button className="btn btn-primary bootstrap-touchspin-down" onClick={() => handleMinus()} type="button">-</button>
                                </span>
                                <input className="quantity-input form-control" onChange={(e) => handleOnChance(e.target.value)} type={"text"} inputMode={"numberic"} autocomplete={"off"} pattern="\d*" name={"quantity"} value={amount.value} min={0} max={99} />
                                <span className="input-group-btn input-group-append">
                                    <button className="btn btn-primary bootstrap-touchspin-up" onClick={() => handlePLus()} type="button">+</button>
                                </span>

                            </div>
                            {/* <input name="item_qty_current" value={1} type="hidden" /> */}
                        </div>
                        <div className="body-item total"><span>999999999999d</span>
                            <button type="button">
                                <img width="20" src="https://shop.dalathasfarm.com/public/dalathasfarm/images/close.png" />
                            </button>
                        </div>
                    </div>
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
                            <span className="current-address" id="current_address" data-city="TP. Hồ Chí Minh">Quận 1, TP. Hồ Chí Minh</span>
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
                            <p>5.000.000đ</p>
                        </div>
                        <div className="order-cart-content-item">
                            <p>Phí giao hàng tạm tính:</p><p>Miễn phí</p>
                        </div>
                        <br />
                        <div className="order-cart-content-item cart-all-total">
                            <p>Tổng cộng</p><p>5.000.000đ</p>
                        </div>
                        <small className="text-right">Giá đã bao gồm VAT</small>
                    </div>
                </div>
                <div className="btn-box">
                    <a className="btn btn-buy btn-confirm" href="https://shop.dalathasfarm.com/shopcart/checkout.html" title="CONFIRM CART">TIẾP TỤC</a>
                </div>
            </div>

        </div>
    )
}

export default Cart;