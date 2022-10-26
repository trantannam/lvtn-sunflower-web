import React from "react";
import {GoThreeBars} from "react-icons/go";
import "./TopContent.css";

function TopContent() {
    return (
        <div class="container">
            <div class="top-content-wrap">
                <div class="left-menu-main">
                    <div class="dropdown cate-main">
                        <button class="btn dropdown-toggle">
                            <GoThreeBars class="icon" style={{ maxWidth: 100 }} />
                            Danh mục</button>
                    </div>
                    <nav class="accordion-menu">
                        <ul>
                            <li>
                                <a>
                                    <span>Hoa chậu thiết kế</span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <span>Hoa xinh giá tốt</span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <span>Hoa chậu</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div class="middle-banner">
                    <nav class="nav-extend">
                        <ul>
                            <li>
                                <a>
                                    <span>
                                        Su kien
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <span>
                                        Giao nhanh
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <span>
                                        Lan ho diep
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <span>
                                        Hoa tang
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <span>
                                        Danh cho doanh nghiep
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div class="banner"></div>
                </div>
                <div class="right-banner">
                    <ul class="services-box">
                        <li>
                            <div class="box-item">
                                <h4>Cam kết</h4>
                                <p>Giá cả hợp lý</p>
                            </div>
                        </li>
                        <li>
                            <div class="box-item">
                                <h4>Giao nhanh</h4>
                                <p>nội thành</p>
                            </div>
                        </li>
                        <li>
                            <div class="box-item">
                                <h4>Đảm bảo</h4>
                                <p>Sạch, tươi, mới</p>
                            </div>
                        </li>
                        <li>
                            <div class="box-item">
                                <h4>Thân thiện</h4>
                                <p>Môi trường sống</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default TopContent;