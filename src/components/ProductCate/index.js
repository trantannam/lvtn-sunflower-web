import demo from "../../img/18_800x800.jpg";
import {BiPlus} from "react-icons/bi";
import "./ProductCate.css";

function ProductCate() {
    return (
        <div class="container">
            <div class="group-product-wrap">
                <h2>HOA DEMO</h2>
                <div class="row product">
                    <div class="col-product-item">
                        <div class="product-item">
                            <div class="product-img">
                                <a href=''>
                                    <img src={demo} alt='hoa' />
                                </a>
                            </div>
                            <div class="product-title">
                                <a href=''>
                                    <span>Hoa Demo</span>
                                </a>
                            </div>
                            <div class="product-button-wrapper">
                                <div class="product-price">
                                    <b>
                                        <span class="notranslate">1000000</span>
                                    </b>
                                </div>
                                <div class="add-cart-wrapper">
                                    <div class="btn-addcart-wrapper">
                                        <button class="btn btn-addcart" type='button'>
                                            <span class="__text">Mua Ngay</span>
                                            <BiPlus class="__icon" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-product-item">
                        <div class="product-item">
                            <div class="product-img">
                                <a href=''>
                                    <img src={demo} alt='hoa' />
                                </a>
                            </div>
                            <div class="product-title">
                                <a href=''>
                                    <span>Hoa Demo</span>
                                </a>
                            </div>
                            <div class="product-button-wrapper">
                                <div class="product-price">
                                    <b>
                                        <span class="notranslate">1000000</span>
                                    </b>
                                </div>
                                <div class="add-cart-wrapper">
                                    <div class="btn-addcart-wrapper">
                                        <button class="btn btn-addcart" type='button'>
                                            <span class="__text">Mua Ngay</span>
                                            <BiPlus class="__icon" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCate;