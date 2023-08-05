
import { useNavigate, useSearchParams } from "react-router-dom";
import "./VNPayReturn.css";
import { BsCheck2Circle, BsXCircle, BsEmojiWink, BsEmojiFrown } from "react-icons/bs"
import { useEffect, useState } from "react";
import request from "../../utils/request";


function VNPayReturn() {

    const [params] = useSearchParams();
    const navigate = useNavigate();
    const [successfully, setSuccessfully] = useState("");

    //time 20230718153733
    const convertTime = (t) => {
        const time = t.toString()
        return time.slice(8, 10) + ":" + time.slice(10, 12) + ":" + time.slice(12, 14) + "  " + time.slice(6, 8) + "-" + time.slice(4, 6) + "-" + time.slice(0, 4);
    }


    const handlleContinuous = () => {
        navigate("/");
    }

    // vnp_TransactionStatus trang thai giao dich
    // vnp_Amount tong tien thanh toan
    // vnp_OrderInfo thong tin don hang
    // vnp_PayDate thoi gian hoan tat giao dich
    // vnp_TransactionNo Ma giao dich thanh toan vnpay
    // vnp_TxnRef Ma tao url ===> lam ma don dat hang
    // url test http://localhost:3000/payment/vnpay_return?vnp_Amount=135000000&vnp_BankCode=NCB&vnp_BankTranNo=VNP14069590&vnp_CardType=ATM&vnp_OrderInfo=thanh+toan+hoa+don&vnp_PayDate=20230718153733&vnp_ResponseCode=00&vnp_TmnCode=08T2TCE9&vnp_TransactionNo=14069590&vnp_TransactionStatus=00&vnp_TxnRef=1689670313183&vnp_SecureHash=dcce4da7d959dd727ef5debcabc40b5084a1ccf0a1a21eb9590c530ca736d9009698eb98bd2e0818966929fd82e005745f10be9fba019eacdb0d20434ae88f38
    // vnp_ResponseCode=00

    const confirmTransaction = async () => {
        if (params.get("vnp_ResponseCode") === "00") {
            await request.post("/purchase-order/update-payment-status", { tranCode: params.get("vnp_TxnRef"), paymentStatus: "paid" })
                .then(res => {
                    if (res.data.success === true) {
                        setSuccessfully(true);
                    } else {
                        setSuccessfully(false);
                    }
                })
        }
    }

    useEffect(() => {
        confirmTransaction();
    }, [])

    return successfully ? (
        <div>
            <div className="vnp-return">
                <h1 className="title vnp-title">Kết quả giao dịch</h1>
                <div className="transaction-status">
                    <BsEmojiWink className="status-icon" />
                    <p>Thành Công</p>
                </div>
                <div className="transaction-info">
                    <p className="col1">Mã đơn đặt hàng:</p><p className="col2"> {params.get("vnp_TxnRef")} </p>
                    <p className="col1">Mã giao dịch:</p><p className="col2"> {params.get("vnp_TransactionNo")} </p>
                    <p className="col1">Tổng tiền thanh toán:</p><p className="col2"> {(params.get("vnp_Amount") / 100).toLocaleString() + " đ"}</p>
                    <p className="col1">Thời gian:</p><p className="col2"> {convertTime(params.get("vnp_PayDate"))} </p>
                    <p className="col1">Ghi chú:</p><p className="col2"> {params.get("vnp_OrderInfo")} </p>
                </div>
                <div className="transaction-button">
                    <button className="continuous " onClick={() => handlleContinuous()}>
                        Tiếp tục mua sắm
                    </button>
                </div>
            </div>
        </div>
    ) :
        (
            <div className="vnp-return">
                <h1 className="title vnp-title">Kết quả giao dịch</h1>
                <div className="transaction-status">
                    <BsEmojiFrown style={{ color: "red" }} className="status-icon" />
                    <p>Giao dịch thất bại</p>
                </div>
            </div>
        )
}

export default VNPayReturn;