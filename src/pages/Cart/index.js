import { Link } from "react-router-dom";
import { GrMap } from "react-icons/gr";
import "./Cart.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import request from "../../utils/request";
import { apiURL } from "../../utils/callAPI";
import { AiOutlineClose } from "react-icons/ai";

function Cart() {

    const userInfo = useSelector((state) => state.auth.login.currentUser);
    const [cartID, setCartID] = useState(null);
    const [listProduct, setListProduct] = useState([]);

    let temp = 0;
    const [total, setTotal] = useState(0);

    const handleOnChance = (e) => {
        // if (e !== NaN) {
        //     setAmount({ value: parseInt(e) });
        // }
    }

    const handlePLus = async (index) => {

        const plusArr = [...listProduct];

        plusArr[index].quantity = plusArr[index].quantity + 1;

        await request.post("/cart/updatecart", {
            _id: cartID,
            product: plusArr
        }).then(res => {
            setListProduct(res.data.cart.product);
            console.log("data",res.data.cart.product)
        })
    }

    const handleMinus = async (index) => {

        const minusArr = [...listProduct];

        minusArr[index].quantity = minusArr[index].quantity - 1;

        await request.post("/cart/updatecart", {
            _id: cartID,
            product: minusArr
        }).then(res => {
            setListProduct(res.data.cart.product);
        })
    }

    const getCartByID = async () => {
        try {
            await request.post("/cart/getcart", { customerID: userInfo._id })
                .then(res => {
                    if (res.data.success) {
                        setListProduct(res.data.listCart.product);
                        setCartID(res.data.listCart._id);
                        res.data.listCart.product.map(t => {
                            temp += (t.productID.price * t.quantity);
                            setTotal(temp);
                            console.log("total", total)
                        })
                    } else {

                    }
                    // console.log("getcart", res.data.listCart.product)
                })
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteProductCart = async (productID) => {

        await request.post("/cart/deletecart", {
            _id: cartID,
            product: {
                _id: productID
            }
        }).then(res => {
            alert("Xoa thanh cong", res);
            setListProduct(res.data.cart.product)
            console.log(res.data);
        })
    }
    
    const calcTotal=()=>{
        listProduct.map(item => {
            temp += (item.productID.price * item.quantity);
            setTotal(temp);
        })
    }

    useEffect(()=>{calcTotal()},[listProduct]);

    useEffect(() => 
        {getCartByID()}
    , [])

    document.title = "Gi??? h??ng"

    return (
        <div className="cart-box" id="cart-page">
            <div className="product-purchase">
                <div className="cart-list">
                    <div className="header-list">
                        <div className="header-item">S???n ph???m</div>
                        <div className="header-item">????n gi??</div>
                        <div className="header-item">S??? l?????ng</div>
                        <div className="header-item">T???ng c???ng</div>
                    </div>
                    {listProduct && listProduct.map((item, index) =>
                        <div key={index} className="body-list">
                            <div className="body-item product-info">
                                <div className="cart-product">
                                    <div className="p-image">
                                        <img src={apiURL + `${item.productID.image}`} alt="B??nh Hoa Ni???m Vui Nh??? B?? 262" />
                                    </div>
                                    <div className="p-info">
                                        <Link className="p-name" to={"/"}>{item.productID.productname}</Link>
                                        {/* <a className="p-name" href="https://shop.dalathasfarm.com/a5/binh-hoa-niem-vui-nho-be-262-p1452.html" title="B??nh Hoa Ni???m Vui Nh??? B?? 262">product name</a> */}
                                        {/* button flower love */}
                                        {/* <a className="wishlist" data-toggle="modal" data-keyboard="false" data-backdrop="static" data-target="#loginModal" title="Y??u th??ch"><img width="20" src="https://shop.dalathasfarm.com/public/dalathasfarm/images/like-2.png"/>Y??u th??ch</a> */}

                                    </div>
                                </div>
                            </div>
                            <div className="body-item price">
                                <span>{item.productID.price.toLocaleString()} ??/ B??</span>
                            </div>
                            <div className="body-item quantity">
                                <div className="input-group bootstrap-touchspin bootstrap-touchspin-injected">
                                    {/* Product amount */}
                                    <span className="input-group-btn input-group-prepend">
                                        <button className="btn btn-primary bootstrap-touchspin-down" onClick={() => handleMinus(index)} type="button">-</button>
                                    </span>
                                    <input className="quantity-input form-control"
                                        onChange={(e) => handleOnChance(e.target.value)}
                                        type={"text"}
                                        // inputMode={"numberic"}
                                        // autoComplete={"off"}
                                        pattern="\d*"
                                        name={"quantity"}
                                        value={item.quantity} min={0} max={99} />
                                    <span className="input-group-btn input-group-append">
                                        <button className="btn btn-primary bootstrap-touchspin-up" onClick={(e) => handlePLus(index)} type="button">+</button>
                                    </span>

                                </div>
                                {/* <input name="item_qty_current" value={1} type="hidden" /> */}
                            </div>
                            <div className="body-item total">
                                <span>{(item.productID.price * item.quantity).toLocaleString()} ??</span>
                                <button type="button" onClick={() => handleDeleteProductCart(item._id)}>
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
                            <span className="green">Giao h??ng t???i</span>
                        </div>
                        <div className="address py-3">
                            <GrMap className="icon-map" />
                            <span className="current-address" id="current_address" data-city="TP. H??? Ch?? Minh">{"B???n ch??a c?? ?????a ch??? nh???n h??ng."}</span>
                        </div>
                    </div>
                </div>
                <div className="border-wrapp padding-0">
                    <div className="order-cart-header">
                        <p>Gi??? h??ng c???a t??i</p>
                        <p className="total-item">10 SP</p>
                    </div>
                    <div className="order-cart-content">
                        <div className="order-cart-content-item">
                            <p>T???m t??nh</p>
                            <p>{total.toLocaleString()} ??</p>
                        </div>
                        <div className="order-cart-content-item">
                            <p>Ph?? giao h??ng t???m t??nh:</p><p>Mi???n ph??</p>
                        </div>
                        <br />
                        <div className="order-cart-content-item cart-all-total">
                            <p>T???ng c???ng</p><p>{total.toLocaleString()} ??</p>
                        </div>
                        <small className="text-right">Gi?? ???? bao g???m VAT</small>
                    </div>
                </div>
                <div className="btn-box">
                    <a className="btn btn-buy btn-confirm" href="https://shop.dalathasfarm.com/shopcart/checkout.html" title="CONFIRM CART">TI???P T???C</a>
                </div>
            </div>
        </div>
    )
}

export default Cart;