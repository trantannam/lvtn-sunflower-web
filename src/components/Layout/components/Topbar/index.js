import { useEffect, useState } from "react";
import { FaRegNewspaper, FaStore, FaWhatsapp, FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import LoginPopup from "../../../../components/Login";
import request from "../../../../utils/request";
import "./topbar.css";


function Topbar() {

  const [formLogin, setFormLogin] = useState(false);
  const [login, setLogin] = useState([]);
  const user = useSelector((state)=>state.auth.login.currentUser);

  console.log(login)

  return (
    <>
      <LoginPopup
        showPopup={formLogin}
        closePopup={setFormLogin}
        info={setLogin}
      />
      <div id="topbar">
        <div className="container">
          <div className={"languages"}>
            <a className="languages-vietnamese">Vietnamese   |</a>
            <a className="languages-english">  English</a>
          </div>
          <div className="topbar_menu">
            <div className="menu">
              <li><a><FaRegNewspaper className='menu_logo' /> Tin nổi bật</a></li>
              <li><a><FaStore className='menu_logo' /> Cửa hàng</a></li>
              <li><a><FaWhatsapp className='menu_logo' /> Hỗ trợ</a></li>
              <li>
                <a onClick={() => setFormLogin(true)}><FaUserCircle className='menu_logo' />{user === null ? 'Đăng nhập' : user.customername}</a>
              </li>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Topbar;