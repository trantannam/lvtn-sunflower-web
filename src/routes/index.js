import Home from "../pages/Home";
import Admin from "../pages/Admin";
import { ChildLayout, HeaderAdmin } from "../components/Layout";
import Info from "../pages/Info";
import Cart from "../pages/Cart";
import DetailPage from "../pages/DetailPage";
import Payment from "../pages/Payment";
import Search from "../pages/Search";
import VNPayReturn from "../pages/VNPayReturn";
import Member from "../pages/Member";


//public routes for customer don't have account
const publicRoutes = [
    { path: '/', component: Home},
    { path: '/detail-product/:id', component: DetailPage},
    { path: '/admin', component: Admin, layout: HeaderAdmin},
    { path: '/info', component: Info, layout: null },
    { path: '/cart', component: Cart },
    { path: '/payment', component: Payment},
    { path: '/search', component: Search},
    { path: '/payment/vnpay_return', component: VNPayReturn, layout: null},
    { path: '/member', component: Member},
]

const privateRoutes = []

export {publicRoutes, privateRoutes}