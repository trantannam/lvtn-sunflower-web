import { useEffect, useState } from "react";
import request from "../../utils/request";
import "./ContentProduct.css";

function ContentProduct() {

    const [productType, setProductType] = useState([])

    const getProductType = () =>{
        request.get(`product-type`)
        .then((res)=>{
            setProductType(res.data.data)
        })
    }

    useEffect(getProductType,[]);

    return (
        <div className="container" id="product-cate-wrapper">
            <div className="product-type">
                <ul className="type-list">
                    {productType.map((item, index)=>
                    <li key={index}>
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