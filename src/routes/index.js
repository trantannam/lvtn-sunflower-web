import Home from "../pages/Home";
import DetailProduct from "../pages/DetailProduct";
import Admin from "../pages/Admin";
import { HeaderAdmin } from "../components/Layout";
import Info from "../pages/Info";


//public routes for customer don't have account
const publicRoutes = [
    { path: '/', component: Home},
    { path: '/detailproduct', component: DetailProduct},
    { path: '/admin', component: Admin, layout: HeaderAdmin},
    { path: '/info', component: Info, layout: null },
]

const privateRoutes = []

export {publicRoutes, privateRoutes}