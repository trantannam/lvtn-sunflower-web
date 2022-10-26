import { FaRegNewspaper, FaStore, FaWhatsapp, FaUserCircle } from "react-icons/fa";
import "./topbar.css";


function Topbar() {
  return (
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
            <li><a><FaUserCircle className='menu_logo' /> Đăng nhập</a></li>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;