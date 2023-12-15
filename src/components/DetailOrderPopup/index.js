import { Link } from "react-router-dom";

function DetailOrderPopup(props) {

    const handleClickYes = () => {
        props.close(false);
    }

    const convertTime = (t) => {
        const d = new Date(t);
        return (d.getDate()) + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();
    }

    return props.show ? (
        <div style={{
            position: "fixed",
            left: 0,
            top: 0,
            backgroundColor: "rgb(0, 0, 0, 0.08)",
            width: "100%",
            height: "100vh",
            zIndex: 5,
        }} >
            <div style={{
                width: 650,
                height: "fit-content",
                margin: "0 auto",
                borderRadius: 8,
                top: "40%",
                transform: "translateY(-50%)",
                position: "relative",
                backgroundColor: "white",
                display: "block",
                boxShadow: "0 0 20px 5px rgb(179, 179, 179)",
            }}>
                <p style={{ textAlign: "center", fontSize: 28, padding: 20 }}
                    className="title">Thông tin đơn hàng</p>
                <div style={{ display: "flex", padding: 10 }}>
                    <p style={{ fontWeight: "bold", paddingRight: 5 }}>Người nhận:</p>
                    <p>{props.data?.receiver.name}</p>
                </div>
                <div style={{ display: "flex", padding: 10 }}>
                    <p style={{ fontWeight: "bold", paddingRight: 5 }}>Số điện thoại:</p>
                    <p>{props.data?.receiver.phone}</p>
                </div>
                <div style={{ display: "flex", width: "max-content", padding: 10 }}>
                    <p style={{ fontWeight: "bold", paddingRight: 5 }}>Địa chỉ nhận hàng:</p>
                    <p>{props.data?.receiveAddress}</p>
                </div>
                <div style={{ display: "flex", padding: 10 }}>
                    <p style={{ fontWeight: "bold", paddingRight: 5 }}>Thời gian đặt hàng:</p>
                    <p>{convertTime(props.data?.createdAt)}</p>
                </div>
                <div style={{ display: "flex", padding: 10 }}>
                    <p style={{ fontWeight: "bold", paddingRight: 5 }}>Thanh toán:</p>
                    <p>{props.data?.paymentStatus === "paid" ? "Đã thanh toán" :
                        props.data?.paymentStatus === "cod" ? "Thanh toán khi nhận hàng" : "Thanh toán không thành công"}</p>
                </div>
                <div style={{ display: "flex", padding: 10 }}>
                    <p style={{ fontWeight: "bold", paddingRight: 5 }}>Đơn hàng:</p>
                    <p>{props.data?.deliveryStatus === 0 ? "Đang xử lý" :
                        props.data?.deliveryStatus === 1 ? "Đã tiếp nhận" :
                            props.data?.deliveryStatus === 2 ? "Đang vận chuyển" :
                                props.data?.deliveryStatus === 3 ? "Giao hàng thành công" : "Đã hủy"}</p>
                </div>
                <div className="cart-list">
                    <div className="header-list">
                        <div className="header-item">Sản phẩm</div>
                        <div className="header-item">Đơn giá</div>
                        <div className="header-item">Số lượng</div>
                        <div className="header-item">Thành tiền</div>
                    </div>
                    {props.data?.products && props.data?.products.map((item, index) =>
                        <div key={index} className="body-list">
                            <div className="body-item product-info">
                                <div className="cart-product">
                                    <div style={{
                                        paddingLeft: 0,
                                        fontWeight: 700,
                                        fontSize: 18,
                                        paddingTop: 10,
                                    }}>
                                        <Link style={{ color: "rgb(50 50 50)" }} className="p-name" to={`/detail-product/${item._id}`}>{item?.product_name ? item?.product_name : item.name}</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="body-item price">
                                <span>{item.price.toLocaleString()} đ/ Bó</span>
                            </div>
                            <div className="body-item quantity">
                                <p style={{ paddingTop: 10, paddingLeft: 20 }}>{item.quantity}</p>
                            </div>
                            <div className="body-item total">
                                <span>{(item.price * item.quantity).toLocaleString()} đ</span>
                            </div>
                        </div>
                    )}
                </div>
                <div style={{ display: "flex", padding: 10 }}>
                    <p style={{ fontWeight: "bold", paddingTop: 2, fontSize: 20, paddingRight: 5 }}>Tổng cộng: </p>
                    <p style={{ fontWeight: "bold", fontSize: 22, color: "red" }}>{props.data?.totalEstimate.toLocaleString() + " đ"}</p>
                </div>

                <div className="confirm-btn">
                    <button className="confirm-btn btn" onClick={() => handleClickYes()}>Xác nhận</button>
                </div>
            </div>
        </div >
    ) : ""
}

export default DetailOrderPopup;