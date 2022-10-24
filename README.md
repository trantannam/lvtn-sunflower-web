# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

<>
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
    <div id="middle-header">
      <div class="container">
        <div class="col-logo">
          <img src='/sunFlower.png' alt='logo'/>
        </div>
        <div class="col-search">
          <form method='get'>
            <div class="input-group">
              <input class="form-control" type="text" placeholder='search'/>
              <div class="input-group-append">
                <button class="btn btn-search">
                  <FaSearch class="icon"/>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div class="col-pull-menu">
          <ul class="box-group pull-right">
            <li>
              <div class="group-item">
                <GrMap class="icon"/>
                <div class="item-text">
                  <a>Giao đến</a>
                  <span>Cần Thơ</span>
                </div>
              </div>
            </li>
            <li>
              <div class="group-item">
                <GrPhone class="icon"/>
                <div class="item-text">
                  <a>Giao đến</a>
                  <span>Cần Thơ</span>
                </div>
              </div>
            </li>
            <li>
              <div class="group-item cart-item">
                <div class="icon">
                  <a href=''>
                    <GiShoppingCart/>
                    <span id="cart-num">0</span>
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="top-content-wrap">
        <div class="left-menu-main">
          <div class="dropdown cate-main">
            <button class="btn dropdown-toggle">
              <GoThreeBars class="icon" style={{maxWidth:100}}/>
              Danh mục</button>
          </div>
          <nav class="accordion-menu">
            <ul>
              <li>
                <a>
                  <span>Hoa chậu thiết kế</span>
                </a>
              </li>
              <li>
                <a>
                  <span>Hoa xinh giá tốt</span>
                </a>
              </li>
              <li>
                <a>
                  <span>Hoa chậu</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="middle-banner">
          <nav class="nav-extend">
            <ul>
              <li> 
                <a>
                  <span>
                    Su kien
                  </span>
                </a>
              </li>
              <li> 
                <a>
                  <span>
                    Giao nhanh
                  </span>
                </a>
              </li>
              <li> 
                <a>
                  <span>
                    Lan ho diep
                  </span>
                </a>
              </li>
              <li> 
                <a>
                  <span>
                    Hoa tang
                  </span>
                </a>
              </li>
              <li> 
                <a>
                  <span>
                    Danh cho doanh nghiep
                  </span>
                </a>
              </li>
            </ul>
          </nav>
          <div class="banner"></div>
        </div>
        <div class="right-banner">
          <ul class="services-box">
            <li>
              <div class="box-item">
                <h4>Cam kết</h4>
                <p>Giá cả hợp lý</p>
              </div>
            </li>
            <li>
            <div class="box-item">
                <h4>Giao nhanh</h4>
                <p>nội thành</p>
              </div>
            </li>
            <li>
            <div class="box-item">
                <h4>Đảm bảo</h4>
                <p>Sạch, tươi, mới</p>
              </div>
            </li>
            <li>
            <div class="box-item">
                <h4>Thân thiện</h4>
                <p>Môi trường sống</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container" id="product-cate-wrapper">
      <div class="product-type">
        <ul class="type-list">
          <li>
            <a>
              <span>1</span>
            </a>
          </li>
          <li>
            <a>
              <span>2</span>
            </a>
          </li>
          <li>
            <a>
              <span>3</span>
            </a>
          </li>
          <li>
            <a>
              <span>4</span>
            </a>
          </li>
          <li>
            <a>
              <span>5</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="container">
      <div class="group-product-wrap">
        <h2>HOA DEMO</h2>
        <div class="row product">
          <div class="col-product-item">
            <div class="product-item">
              <div class="product-img">
                <a href=''>
                  <img src={demo} alt='hoa'/>
                </a>
              </div>
              <div class="product-title">
                <a href=''>
                  <span>Hoa Demo</span>
                </a>
              </div>
              <div class="product-button-wrapper">
                <div class="product-price">
                  <b>
                    <span class="notranslate">1000000</span>
                  </b>
                </div>
                <div class="add-cart-wrapper">
                  <div class="btn-addcart-wrapper">
                    <button class="btn btn-addcart" type='button'>
                      <span class="__text">Mua Ngay</span>
                      <BiPlus class="__icon"/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-product-item">
            <div class="product-item">
              <div class="product-img">
                <a href=''>
                  <img src={demo} alt='hoa'/>
                </a>
              </div>
              <div class="product-title">
                <a href=''>
                  <span>Hoa Demo</span>
                </a>
              </div>
              <div class="product-button-wrapper">
                <div class="product-price">
                  <b>
                    <span class="notranslate">1000000</span>
                  </b>
                </div>
                <div class="add-cart-wrapper">
                  <div class="btn-addcart-wrapper">
                    <button class="btn btn-addcart" type='button'>
                      <span class="__text">Mua Ngay</span>
                      <BiPlus class="__icon"/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>


Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
