import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import request from "../../utils/request";
import "./CustomerOrder.css"

function CustomerOrder(props) {

    const customer = useSelector(state => state.auth.login.currentUser);
    const [order, setOrder] = useState([]);

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

    const totalPrice=(value)=>{
        let total=0;
        value.map(item=>total+=item.price)
        return total;
    }

    return (
        <div className="his-order">
            <p>Lịch sử mua hàng</p>
            <table className="table">
                <thead>
                    <tr>
                        <th style={{ width: "15%" }} >Mã ĐH</th>
                        <th style={{ width: "10%" }}>Ngày mua</th>
                        <th>Địa chỉ nhận</th>
                        <th style={{ width: "10%" }}>Tổng tiền</th>
                        <th>Trạng thái ĐH</th>
                        <th>Trạng thái TT</th>
                    </tr>
                </thead>
                <tbody>
                    {order.map((value, index) =>
                        <tr key={index}>
                            <th style={{ width: "15%" }} >{value.tranCode}</th>
                            <th style={{ width: "10%" }}>{converseTime(value.createdAt)}</th>
                            <th>{value.receiveAddress}</th>
                            <th style={{ width: "10%" }}>{totalPrice(value.products)}</th>
                            <th>{value.deliveryStatus}</th>
                            <th>{value.paymentStatus}</th>
                        </tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default CustomerOrder;
