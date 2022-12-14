import Home from "../pages/Home";
import Admin from "../pages/Admin";
import { ChildLayout, HeaderAdmin } from "../components/Layout";
import Info from "../pages/Info";
import Cart from "../pages/Cart";
import DetailPage from "../pages/DetailPage";


//public routes for customer don't have account
const publicRoutes = [
    { path: '/', component: Home},
    { path: '/detailproduct/:id', component: DetailPage, layout: ChildLayout},
    { path: '/admin', component: Admin, layout: HeaderAdmin},
    { path: '/info', component: Info, layout: null },
    { path: '/cart', component: Cart },
]

const privateRoutes = []

export {publicRoutes, privateRoutes}