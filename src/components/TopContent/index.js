import React, { useEffect, useRef, useState } from "react";
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
import { FaHandHoldingUsd, FaShippingFast, FaSeedling } from "react-icons/fa";
import { IoIosRibbon } from "react-icons/io";
import { ControlledMenu, Menu, MenuButton, MenuItem, useMenuState } from "@szhsin/react-menu";
import request from "../../utils/request";

const AutoplaySlider = withAutoplay(AwesomeSlider);

function TopContent(props) {

    const [menu, setMenu] = useMenuState({ initialOpen: true });

    const ref = useRef();

    const [productType, setProductType] = useState([])

    const getProductType = () => {
        request.get(`product-type`)
            .then((res) => {
                setProductType(res.data.data)
            })
    }

    useEffect(getProductType, []);

    return (
        // <div className="container">
            <div className="top-content-wrap">
                <div className="left-menu-main">

                    <Menu {...menu} menuButton={
                        <div className="dropdown cate-main">
                            <button ref={ref} className="btn dropdown-toggle">
                                <GoThreeBars className="icon" style={{ maxWidth: 100 }} />
                                <p>Danh mục</p>
                            </button>
                        </div>}
                        boundingBoxPadding={"2"}
                        arrow={true}
                    >
                        {productType.map((item, index) =>
                            <MenuItem
                                key={index}
                                className={"menu-item"}
                                onClick={() => props.click(item._id)}
                            >
                                {item.name}
                            </MenuItem>
                        )}
                    </Menu>
                </div>
                <div className="middle-banner">
                    <div className="banner">
                        <AutoplaySlider
                            play={true}
                            cancelOnInteraction={false}
                            interval={2000}
                            style={{ height: 300 }}
                            cssModule={AwesomeSliderStyles}
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
                                <FaHandHoldingUsd style={{ fontSize: 60, marginBottom: 10, color: "#00833d" }} />
                                <h4>Cam kết</h4>
                                <p>Giá cả hợp lý</p>
                            </div>
                        </li>
                        <li>
                            <div className="box-item">
                                <FaShippingFast style={{ fontSize: 60, marginBottom: 10, color: "#f58831" }} />
                                <h4>Giao nhanh</h4>
                                <p>nội thành</p>
                            </div>
                        </li>
                        <li>
                            <div className="box-item">
                                <IoIosRibbon style={{ fontSize: 60, marginBottom: 10, color: "#f58831" }} />
                                <h4>Đảm bảo</h4>
                                <p>Sạch, tươi, mới</p>
                            </div>
                        </li>
                        <li>
                            <div className="box-item">
                                <FaSeedling style={{ fontSize: 60, marginBottom: 10, color: "#00833d" }} />
                                <h4>Thân thiện</h4>
                                <p>Môi trường sống</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        // </div>
    );
}

export default TopContent;