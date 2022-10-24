import {GrMap, GrPhone} from "react-icons/gr";
import {GiShoppingCart} from "react-icons/gi";
import {FaSearch} from "react-icons/fa";

function Header() {
    return (
        <div id="middle-header">
            <div class="container">
                <div class="col-logo">
                    <img src='/sunFlower.png' alt='logo' />
                </div>
                <div class="col-search">
                    <form method='get'>
                        <div class="input-group">
                            <input class="form-control" type="text" placeholder='search' />
                            <div class="input-group-append">
                                <button class="btn btn-search">
                                    <FaSearch class="icon" />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col-pull-menu">
                    <ul class="box-group pull-right">
                        <li>
                            <div class="group-item">
                                <GrMap class="icon" />
                                <div class="item-text">
                                    <a>Giao đến</a>
                                    <span>Cần Thơ</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="group-item">
                                <GrPhone class="icon" />
                                <div class="item-text">
                                    <a>Giao đến</a>
                                    <span>Cần Thơ</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="group-item cart-item">
                                <div class="icon">
                                    <a href=''>
                                        <GiShoppingCart />
                                        <span id="cart-num">0</span>
                                    </a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <h1>Chua co gi moi</h1>
        </div>
    );
}
export default Header;