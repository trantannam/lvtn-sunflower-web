import { Link, useNavigate } from "react-router-dom";
import { GrMap, GrPhone } from "react-icons/gr";
import { GiShoppingCart } from "react-icons/gi";
import { FaSearch, FaSoundcloud } from "react-icons/fa";
import "./header.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import request from "../../../../utils/request";
import SearchPopup from "../../../Search";


function Header(props) {

    const [listProduct, setListProduct] = useState([]);
    const [resultSearch, setResultSearch] = useState([]);
    const [keyWd, setKeyWd] = useState("");
    const [showSP, setShowSP] = useState(false);

    const { cart } = useSelector(state => state)
    const navigate = useNavigate();


    //get list products
    async function getListProduct() {
        await request.get('/product')
            .then(res => {
                setListProduct(res.data.data);
            })
    }
    useEffect(() => {
        getListProduct()
    }, [])

    //Xóa ký tự có dấu trong tiếng việt
    function removeAccents(str) {
        return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }

    //handle search when change keyword
    function handleSearch() {
        if (keyWd.length >= 2) {
            setShowSP(true);
            setResultSearch(
                listProduct.filter(
                    key => {
                        return removeAccents(key.product_name).toUpperCase().includes(removeAccents(keyWd).toUpperCase());
                    }
                )
            );
        } else (setShowSP(false))
    }
    useEffect(() => {
        handleSearch()
    }, [keyWd])

    //handle click button search
    function buttonSearch() {
        setShowSP(false)
        navigate("/search", { state: resultSearch });
    }


    return (
        <>
            <SearchPopup
                show={showSP}
                result={resultSearch}
            />
            <div id="middle-header">
                <div className="container">
                    <div className="col-logo">
                        <Link to="/"><img src='/sunFlower.png' alt='logo' /></Link>
                    </div>
                    <div className="col-search">

                        <div className="input-group">
                            <input className="form-control" type="text" onChange={(e) => setKeyWd(e.target.value)} placeholder='search' />
                            <div className="input-group-append">
                                <button className="btn btn-search" onClick={() => buttonSearch()}>
                                    <FaSearch className="icon" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-pull-menu">
                        <ul className="box-group pull-right">
                            <li>
                                <div className="group-item">
                                    <GrPhone className="icon" />
                                    <div className="item-text">
                                        <a>Liên hệ</a>
                                        <span>0982 461 654</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="group-item cart-item">
                                    <div className="icon">
                                        <Link to={"/Cart"}>
                                            <GiShoppingCart />
                                            <span id="cart-num"><p className="num">{cart?.products.length}</p></span>
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Header;