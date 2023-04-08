import DefaultLayout from "../layout/DefaultLayout";

// Public
import ProductList from "../view/public/Product/ProductList";
import ProductDetail from "../view/public/Product/ProductDetail";
import ProductSearch from "../view/public/Product/ProductSearch";
import NewsList from "../view/public/News/NewsList";
import NewsDetail from "../view/public/News/NewsDetail";
import Login from "../view/public/Auth/Login";
import Register from "../view/public/Auth/Register";
import About from "../view/public/About";
import Contact from "../view/public/Contact";
import Map from "../view/public/Map";
import Home from "../view/public/Home";
import Cart from "../view/public/Cart";
import NotFound from "../view/public/NotFound";

// Private
import Checkout from "../view/private/Checkout";
import UserInfomation from "../view/private/UserInfomation";

const publicRoutes = [
  { path: "/", component: Home, layout: DefaultLayout },
  { path: "/product", component: ProductList, layout: DefaultLayout },
  { path: "/product/:id", component: ProductList, layout: DefaultLayout },
  {
    path: "/product-search/:textSearch",
    component: ProductSearch,
    layout: DefaultLayout,
  },
  {
    path: "/product-detail/:id",
    component: ProductDetail,
    layout: DefaultLayout,
  },
  { path: "/about", component: About, layout: DefaultLayout },
  { path: "/news", component: NewsList, layout: DefaultLayout },
  { path: "/news/:id", component: NewsDetail, layout: DefaultLayout },
  { path: "/map", component: Map, layout: DefaultLayout },
  { path: "/contact", component: Contact, layout: DefaultLayout },
  { path: "/login", component: Login, layout: DefaultLayout },
  { path: "/register", component: Register, layout: DefaultLayout },
  { path: "/cart", component: Cart, layout: DefaultLayout },
  { path: "*", component: NotFound, layout: DefaultLayout },
];

const privateRoutes = [
  { path: "/checkout", component: Checkout, layout: DefaultLayout },
  {
    path: "/user-information/:id",
    component: UserInfomation,
    layout: DefaultLayout,
  },
];

export { publicRoutes, privateRoutes };
