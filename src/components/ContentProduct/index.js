import { useEffect, useState } from "react";
import request from "../../utils/request";
import "./ContentProduct.css";

function ContentProduct() {

    const [productType, setproductType] = useState([])

    const getProductType = () =>{
        request.get(`producttype`)
        .then((res)=>{
            // console.log(res.data);
            setproductType(res.data.producttype)
        })
    }

    useEffect(getProductType,[]);

    return (
        <div className="container" id="product-cate-wrapper">
            <div className="product-type">
                <ul className="type-list">
                    {productType.map((item, index)=>
                    <li id={index}>
                        <a>
                            <span>{item.name}</span>
                        </a>
                    </li>)}
                </ul>
            </div>
        </div>
    );
}

export default ContentProduct;