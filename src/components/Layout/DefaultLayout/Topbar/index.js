import {FaRegNewspaper, FaStore, FaWhatsapp, FaUserCircle} from "react-icons/fa";


function Topbar(){
    return(
        <div id="top-bar">
            <div class="container">
              <div class="languages">
                <a class="languages-vietnamese">Vietnamese   |</a> 
                <a class="languages-english">  English</a>
              </div>
              <div class="top-bar-menu">
                <div class="menu">
                  <li><a><FaRegNewspaper className='menu-logo'/> Tin nổi bật</a></li>
                  <li><a><FaStore className='menu-logo'/> Cửa hàng</a></li>
                  <li><a><FaWhatsapp className='menu-logo'/> Hỗ trợ</a></li>
                  <li><a><FaUserCircle className='menu-logo'/> Đăng nhập</a></li>
                </div>
              </div>
            </div>
        </div>
    );
} 

export default Topbar;