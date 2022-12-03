import React, { useRef } from "react";
import { GoThreeBars } from "react-icons/go";
import "./TopContent.css";
import AwesomeSlider from "react-awesome-slider";
import slider1 from "../../img/slider/slider1.jpg";
import slider2 from "../../img/slider/slider2.jpg";
import slider3 from "../../img/slider/slider3.jpg";
import slider4 from "../../img/slider/slider4.jpg";
import slider5 from "../../img/slider/slider5.jpg";
import AwesomeSliderStyles from "react-awesome-slider/src/styles"
import withAutoplay from "react-awesome-slider/dist/autoplay.js";
import { ControlledMenu, Menu, MenuButton, MenuItem, useMenuState } from "@szhsin/react-menu";

const AutoplaySlider = withAutoplay(AwesomeSlider);

function TopContent() {

    const [menu, setMenu] = useMenuState({ value: false });

    const ref = useRef();

    return (
        <div className="container">
            <div className="top-content-wrap">
                <div className="left-menu-main">

                    <Menu menuButton={
                        <div className="dropdown cate-main">
                            <button ref={ref} className="btn dropdown-toggle">
                                <GoThreeBars className="icon" style={{ maxWidth: 100 }} />
                                <p>Danh mục</p>
                                </button>
                        </div>}>
                        <MenuItem className={"menu-item"}>Hoa chậu thiết kế</MenuItem>
                        <MenuItem className={"menu-item"}>Hoa xinh giá tốt</MenuItem>
                        <MenuItem className={"menu-item"}>Hoa chậu</MenuItem>
                    </Menu>
                    {/* <ControlledMenu
                        {...menu}
                        onClose={() => setMenu(false)}
                        anchorRef={ref}
                        menuClassName={"accordion-menu"}
                    >
                        
                    </ControlledMenu> */}
                    {/* <nav className="accordion-menu">
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
                    </nav> */}
                </div>
                <div className="middle-banner">
                    <nav className="nav-extend">
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
                    <div className="banner">
                        <AutoplaySlider
                            play={true}
                            cancelOnInteraction={false}
                            interval={2000}
                        // cssModule={AwesomeSliderStyles}
                        >
                            <div data-src={slider1} />
                            <div data-src={slider2} />
                            <div data-src={slider3} />
                            <div data-src={slider4} />
                            <div data-src={slider5} />
                        </AutoplaySlider>
                    </div>
                </div>
                <div className="right-banner">
                    <ul className="services-box">
                        <li>
                            <div className="box-item">
                                <h4>Cam kết</h4>
                                <p>Giá cả hợp lý</p>
                            </div>
                        </li>
                        <li>
                            <div className="box-item">
                                <h4>Giao nhanh</h4>
                                <p>nội thành</p>
                            </div>
                        </li>
                        <li>
                            <div className="box-item">
                                <h4>Đảm bảo</h4>
                                <p>Sạch, tươi, mới</p>
                            </div>
                        </li>
                        <li>
                            <div className="box-item">
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