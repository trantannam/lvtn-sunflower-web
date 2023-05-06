import Home from "../pages/Home";
import Admin from "../pages/Admin";
import { ChildLayout, HeaderAdmin } from "../components/Layout";
import Info from "../pages/Info";
import Cart from "../pages/Cart";
import DetailPage from "../pages/DetailPage";
import Payment from "../pages/Payment";


//public routes for customer don't have account
const publicRoutes = [
    { path: '/', component: Home},
    { path: '/detail-product/:id', component: DetailPage, layout: ChildLayout},
    { path: '/admin', component: Admin, layout: HeaderAdmin},
    { path: '/info', component: Info, layout: null },
    { path: '/cart', component: Cart },
    { path: '/payment', component: Payment}
]

const privateRoutes = []

export {publicRoutes, privateRoutes}