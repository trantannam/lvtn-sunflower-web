import React, { useEffect } from "react";
import { BiPlus } from "react-icons/bi";
import "./ProductCate.css";
import request from "../../utils/request";
import { useState } from "react";
import { GrFormAdd, GrFormSubtract } from 'react-icons/gr'
import { apiURL } from "../../utils/callAPI";
import { Link } from "react-router-dom";


function ProductCate() {

    const [productCategory, setProductCategory] = useState([]);

    async function getProduct() {
        await request.get(`/product`)
            .then(function (res) {
                setProductCategory(res.data.data);
            })
            .catch((err) => {
                console.error('loi truy cap', err)
            })
    }

    useEffect(() => { getProduct(); }, [])

    return (
        <div className="container">
            <div className="group-product-wrap">
                <h2>DANH MỤC SẢN PHẨM</h2>
                <div className="row product">

                    {/* product item render */}
                    {productCategory.map((product, index) =>(
                        <div key={product._id} className="col-product-item">
                            <div className="product-item">
                                <div className="product-img">
                                    <Link to={`/detail-product/${product._id}`}>
                                        <img src={`${apiURL}` + product.image} alt='' />
                                    </Link>
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
    );
}

export default ProductCate;