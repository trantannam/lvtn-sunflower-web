import "./CustomerInfo.css";
import { useSelector } from "react-redux";

function CustomerInfo(props) {

    const customer = useSelector(state => state.auth.login.currentUser);
    
    return (
        <div className="customer-info">
            <p> Thông tin tài khoản</p>
            <div className="account-infomation">
                <p> <span>Họ Tên</span><span>{customer.customer_name}</span></p>
                <p> <span>Giới tính</span><span>Nam</span></p>
                <p> <span>Ngày sinh</span><span></span></p>
                <p> <span>CMND/Passport</span><span></span></p>
                <p> <span>Địa chỉ</span><span></span></p>
                <p> <span>Email</span><span></span></p>
                <p> <span>Điện thoại di động</span><span>{customer.phone_number}</span></p>
            </div>
        </div>
    )
}

export default CustomerInfo;
