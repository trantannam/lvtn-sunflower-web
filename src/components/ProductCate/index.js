import React, { useEffect } from "react";
import { BiPlus } from "react-icons/bi";
import "./ProductCate.css";
import request from "../../utils/request";
import { useState } from "react";
import { GrFormAdd, GrFormSubtract } from 'react-icons/gr'
import { apiURL } from "../../utils/callAPI";


function ProductCate() {

    // const [pro, setPro] = useState([])
    const [productCategrory, setProductCategrory] = useState([]);
    // const [addItem, setAddItem] = useState(false);
    // const [showButton, setShowButton] = useState();

    async function getProduct() {
        await request.get(`/product`)
            .then(function (res) {
                setProductCategrory(res.data.products);
                // console.log('loi truy cap', res.data)
            })
            .catch((err) => {
                console.error('loi truy cap', err)
            })
    }

    console.log()

    useEffect(() => { getProduct(); }, [])
    // console.log('product',productCategrory)

    return (
        <div className="container">
            <div className="group-product-wrap">
                <h2>DANH MỤC SẢN PHẨM</h2>
                <div className="row product">

                    {/* product item render */}
                    {productCategrory.map((product, index) =>(
                        <div key={index} className="col-product-item">
                            <div className="product-item">
                                <div className="product-img">
                                    <a href={`/detailproduct/${product._id}`}>
                                        <img src={`${apiURL}` + product.image} alt='' />
                                    </a>
                                </div>
                                <div className="product-title">
                                    <a href=''>
                                        <span>{product.productname}</span>
                                    </a>
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

// {!addItem ?
//     <div className="btn-addcart-wrapper">
//         <button className="btn btn-addcart" type='button' onClick={() => handleClick(product, index)}>
//             <BiPlus className="__icon" />
//             <span className="__text">Mua Ngay</span>
//         </button>
//     </div>
//     :
//     <div className="btn-addcart-quantity-wrapper">
//         <button className="btn __item qty-icon">
//             <GrFormSubtract className="btn-addcart-quantity-wrapper icon" />
//         </button>
//         <input className="__item qty-input" type="text" />
//         <button className="btn __item qty-icon green">
//             <GrFormAdd className="btn-addcart-quantity-wrapper icon" />
//         </button>
//     </div>
// }

export default ProductCate;