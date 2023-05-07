import { ControlledMenu, MenuItem, useMenuState } from '@szhsin/react-menu';
import { useRef, useState } from "react";
import { FaRegNewspaper, FaStore, FaUserCircle, FaWhatsapp } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import LoginPopup from "../../../../components/Login";
// import UserMenu from "../../../UserMenu";
import { logOut } from "../../../../redux/apiRequest";
import ResgisterPopup from "../../../Resgister";
import "./topbar.css";


function Topbar() {
  const ref = useRef(null);
  const user = useSelector((state) => state.auth.login.currentUser);

  const [formLogin, setFormLogin] = useState(false);
  const [formResgister, setFormResgister] = useState(false);
  const dispatch = useDispatch();
  const accessToken = user?.accessToken;
  const id = user?._id;
  const [menu, setMenu] = useMenuState({open:false});

  const handleLogin = () => {
    if (user === null) {
      setFormLogin(true);
    } else { setMenu(true); }
  }

  const handleLogOut=()=>{
    logOut(dispatch,id,accessToken);
  }

  return (
    <>

      <LoginPopup
        showPopup={formLogin}
        closePopup={setFormLogin}
        setShowResgister={setFormResgister}
      />
      <ResgisterPopup
        showPopup={formResgister}
        closePopup={setFormResgister}
        setShowLogin={setFormLogin}
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
              <li  >
                <a ref={ref} onClick={() => handleLogin()}>
                  <FaUserCircle className='menu_logo' />
                  {!user ? 'Đăng nhập' : user.customer_name}
                </a>
                <ControlledMenu {...menu}
                  anchorRef={ref}
                  onClose={()=>setMenu(false)}
                  menuClassName={"user-menu"}
                >
                  <MenuItem className={"child-item"}>Thông tin tài khoản</MenuItem>
                  <MenuItem className={"child-item"} onClick={()=>handleLogOut()}><FiLogOut className="icon"/> <p>Đăng xuất</p></MenuItem>
                </ControlledMenu>
              </li>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Topbar;