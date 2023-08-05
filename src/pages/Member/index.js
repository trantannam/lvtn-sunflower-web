import "./Member.css";
import { BiUser } from "react-icons/bi";
import { useState } from "react";
import CustomerInfo from "../../components/CustomerInfo";
import CustomerOrder from "../../components/CustomerOrder";
import CustomerLoveList from "../../components/CustomerLoveList";
import { useLocation } from "react-router-dom";

function Member() {

    const location = useLocation();
    const [isClicked, setIsClicked] = useState(location.state.clicked);

    return (
        <div className="wrapper">
            <div className="left-wrap">
                <div className="user">
                    <BiUser className="member-avatar" />
                    <div className="member-name">
                        <p>Tài khoản</p>
                        <p>Tran Duy Tan</p>
                    </div>
                </div>
                <hr />
                <div className="member-menu">
                    <div className="menu">
                        <p onClick={() => setIsClicked('myinfo')}>Thông tin tài khoản</p>
                        <p onClick={() => setIsClicked('myorder')}>Đơn hàng của tôi</p>
                        <p onClick={() => setIsClicked('likelist')}>Danh sách yêu thích</p>
                    </div>
                </div>
            </div>
            <div className="right-wrap">
                <div className="show-result">
                    {isClicked === 'myinfo' && <CustomerInfo />}
                    {isClicked === 'myorder' && <CustomerOrder />}
                    {isClicked === 'likelist' && <CustomerLoveList />}
                </div>
            </div>
        </div>
    )
}

export default Member;