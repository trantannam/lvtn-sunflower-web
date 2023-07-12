import { useNavigate } from "react-router-dom";
import { apiURL } from "../../utils/callAPI";
import "./SearchPopup.css";


function SearchPopup(props) {

    const navigate = useNavigate();

    function handleClick(id) {
        navigate(`/detail-product/${id}`)
    }

    return props.show ? (
        <div className="searh-popup">
            <div className="searh-wrap">
                {props.result.map((item, index) => 
                    <div key={index} className="item" onClick={()=>handleClick(item._id)}>
                        <img className="img-s" src={`${apiURL}`+item.image} alt=""/>
                        <div className="right-s">
                        <p className="title-s">{item.product_name}</p>
                        <p className="price-s">{item.price > 0 ? item.price.toLocaleString() : 0} đ / Bó</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    ) : "";
}

export default SearchPopup;