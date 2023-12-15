import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import request from "../../utils/request";
import DetailOrderPopup from "../DetailOrderPopup";
import "./CustomerOrder.css"

function CustomerOrder(props) {

    const customer = useSelector(state => state.auth.login.currentUser);
    const [order, setOrder] = useState([]);

    //patination
    const [curPage, setCurPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex = curPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = order.slice(firstIndex, lastIndex);
    const nPage = Math.ceil(order?.length / recordsPerPage);
    const numbers = [...Array(nPage + 1).keys()].slice(1);

    //
    const [showPopup, setShowPopup] = useState(false);
    const [dataView, setDataView] = useState();


    useEffect(
        () => {
            request.get(`/purchase-order/${customer._id}`)
                .then(res => {
                    setOrder(res.data.PO);
                })
        }, []
    )

    const converseTime = (d) => {
        const date = new Date(d);
        return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
    }

    const totalPrice = (value) => {
        let total = 0;
        value.map(item => total += item.price)
        return total;
    }

    const viewDetail = (e) => {
        setShowPopup(true);
        setDataView(e);
    }

    return (
        <>
            <DetailOrderPopup
                data={dataView}
                show={showPopup}
                close={setShowPopup}
            />
            <div className="his-order">
                <p>Lịch sử mua hàng</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th style={{ width: 20 }} >STT</th>
                            <th style={{ width: "13%" }} >Mã ĐH</th>
                            <th style={{ width: "9%" }}>Ngày mua</th>
                            <th>Địa chỉ nhận</th>
                            <th style={{ width: "10%" }}>Tổng tiền</th>
                            <th>Trạng thái ĐH</th>
                            <th>Trạng thái TT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((value, index) =>
                            <tr key={index} onClick={() => viewDetail(value)}>
                                <td style={{ textAlign: "center" }}>{order.findIndex(item => item.tranCode === value.tranCode) + 1}</td>
                                <td style={{ width: "13%" }} >{value.tranCode}</td>
                                <td style={{ width: "9%" }}>{converseTime(value.createdAt)}</td>
                                <td style={{ width: "30%" }}>{value.receiveAddress}</td>
                                <td style={{ width: "10%" }}>{totalPrice(value.products).toLocaleString() + " đ"}</td>
                                <td>
                                    {
                                        value.deliveryStatus === 0 ? "Đang xử lý" :
                                            value.deliveryStatus === 1 ? "Đã tiếp nhận" :
                                                value.deliveryStatus === 2 ? "Đang vận chuyển" :
                                                    value.deliveryStatus === 3 ? "Đã nhận" : "Đã hủy"
                                    }
                                </td>
                                <td>
                                    {
                                        value.paymentStatus === "paid" ? "Đã thanh toán" :
                                            value.paymentStatus === "cod" ? "Thanh toán khi nhận hàng" :
                                                "Thanh toán không thành công"
                                    }
                                </td>
                            </tr>)}
                    </tbody>
                </table>
                <div style={{ display: "flow-root" }}>
                    <nav>
                        <ul className="patination">
                            <li className="page-item">
                                <p className="page-link" onClick={prePage}>Trước</p>
                            </li>
                            {
                                numbers.map((n, i) => (
                                    <li className={`page-item ${curPage === n ? 'active' : ""}`} key={i}>
                                        <p onClick={() => changeCPage(n)} href="#" className="page-item">
                                            {n}
                                        </p>
                                    </li>
                                ))
                            }
                            <li className="page-item">
                                <p href="#" className="page-link" onClick={nextPage}>Tiếp</p>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )

    function prePage() {
        if (curPage !== 1) {
            setCurPage(curPage - 1);
        }
    }

    function changeCPage(id) {
        setCurPage(id);
    }

    function nextPage() {
        if (curPage !== nPage) {
            setCurPage(curPage + 1);
        }
    }
}

export default CustomerOrder;
