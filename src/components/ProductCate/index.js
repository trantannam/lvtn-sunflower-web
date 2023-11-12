import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "./ProductCate.css";
import { apiURL } from "../../utils/callAPI";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import request from "../../utils/request";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import { NotificationManager } from "react-notifications";


function ProductCate(props) {

    const customer = useSelector(state => state.auth.login.currentUser);
    const [listLoveProducts, setListLovePhroducts] = useState([]);


    const getLoveProduct = async () => {
        await request.get(`/customer/love-product/${customer._id}`)
            .then(res => {
                if (res.data.success) {
                    console.log(res.data.list_loveproducts)
                    setListLovePhroducts(res.data.list_loveproducts)
                }
            })

    }

    useEffect(() => {
        getLoveProduct()
    }, [])

    const handleAddLoveProduct = async (product) => {
        await request.post("/customer/add-love-product", { id: customer._id, product: product })
            .then(res => {
                if (res.data.success) {
                    getLoveProduct();
                    NotificationManager.success("Thêm sản phẩm vào mục yêu thích thành công")
                } else {
                    NotificationManager.error("Có lỗi trong quá trình thêm sản phẩm vào mục yêu thích!")
                }
            })
            .catch(error => NotificationManager.error("Có lỗi trong quá trình thêm sản phẩm vào mục yêu thích!", error))

    }

    const handleRemoveLoveProduct = async (product) => {
        await request.post("/customer/remove-love-product", { id: customer._id, product: product })
            .then(res => {
                if (res.data.success) {
                    getLoveProduct();
                    NotificationManager.success("Xóa sản phẩm khỏi mục yêu thích thành công");
                } else {
                    NotificationManager.error("Có lỗi trong quá trình xóa sản phẩm khỏi mục yêu thích!");
                }
            })
            .catch(error =>
                NotificationManager.error("Có lỗi trong quá trình xóa sản phẩm khỏi mục yêu thích!", error)
            )
    }


    return (
        <div>
            <NotificationContainer />
            <div className="container">
                <div className="group-product-wrap">
                    <h2>{props.title.toUpperCase()}</h2>
                    <div className="row product">
                        {/* product item render */}
                        {props.listProduct.map((product, index) => (
                            <div key={index} className="col-product-item">
                                <div className="product-item">
                                    <div className="product-img">
                                        <Link to={`/detail-product/${product._id}`}>
                                            <img src={`${apiURL}` + product.image[0]} alt='' />
                                        </Link>
                                        {!listLoveProducts.includes(product._id) ? <AiOutlineHeart className="heart" onClick={() => handleAddLoveProduct(product._id)} /> : <AiFillHeart onClick={() => handleRemoveLoveProduct(product._id)} className="clicked-heart" />}
                                    </div>
                                    <div className="product-title">
                                        <Link to={`/detail-product/${product._id}`}>
                                            <span>{product.product_name}</span>
                                        </Link>
                                    </div>
                                    <div className="product-button-wrapper">
                                        <div className="product-price">
                                            <b>
                                                <span className="notranslate">Giá: {product.price.toLocaleString()} đ</span>
                                            </b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCate;