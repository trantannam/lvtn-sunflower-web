import { Link } from "react-router-dom";
import { GrMap, GrPhone } from "react-icons/gr";
import { GiShoppingCart } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import "./header.css";

function Header(props) {



    return (
        <div id="middle-header">
                <div className="container">
                {/* <div className="container"> */}
                <div className="col-logo">
                    <Link to="/"><img src='/sunFlower.png' alt='logo' /></Link>
                </div>
                <div className="col-search">
                    <form method='get'>
                        <div className="input-group">
                            <input className="form-control" type="text" placeholder='search' />
                            <div className="input-group-append">
                                <button className="btn btn-search">
                                    <FaSearch className="icon" />
                                </button>
                            </div>
                        </div>
                    </form>
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
                                        <span id="cart-num"><p className="num">0</p></span>
                                    </Link>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                {/* </div> */}
            </div>
        </div>
    );
}
export default Header;