import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const AdminLayout = lazy(() => import("../layouts/FullLayout/FullLayout.js"));
const UserLayout = lazy(() => import("../layouts/UserLayout/FullLayout.js"));
/****End Layouts*****/

/*****Pages******/
const Dashboard1 = lazy(() => import("../views/dashboards/Dashboard1.js"));

const AdminDashboard = lazy(() => import("../views/AdminDashbaord /Dashboard.jsx"));



// user
const Error = lazy(() => import("../components/error/Error.jsx"));
const Home = lazy(() => import("../components/landing/Home"));
const Login = lazy(() => import("../components/userauth/Login"));
const Signup = lazy(() => import("../components/userauth/Signup"));
const ForgetPassword = lazy(() =>import("../components/userauth/ForgetPassword"));
const BookAppointment = lazy(() => import("../pages/user/BookAppointment"));
const  Userdashboard = lazy(()=>import("../pages/user/UserDashbaord"));
//  admin
const AdminLogin = lazy(() => import("../components/adminAuth/AdminLogin.jsx"));
const AdminProfile = lazy(() => import("../pages/Admin/AdminProfile"));
const AllAdmin = lazy(() => import("../pages/Admin/AllAdmins"));
const Appointments = lazy(() => import("../pages/Admin/Appointment"));
const Doctor = lazy(() => import("../pages/Admin/Doctor"));
const ResetPassword = lazy(() => import("../components/userauth/ResetPassword"));
const ContactUs = lazy(() => import("../pages/Admin/ContactUs"));
const Customers = lazy(() => import("../pages/Admin/Customers"));
const BookAppointmentByAdmin = lazy(()=> import("../pages/Admin/BookAppointment"))
const UserRegistration = lazy(()=> import("../pages/Admin/UserRegistration"));

//  ecommerce  

const ProductList  =  lazy(()=> import("../views/ecommerce/ProductList.jsx"));
const Cart = lazy (()=> import ("../views/ecommerce/User/Cart.jsx"));
 const AddProduct = lazy(()=> import ("../views/ecommerce/Admin/AddProduct.jsx"))
 const AllProducts = lazy(()=> import ("../views/ecommerce/Admin/AllProductList.jsx"));
 const EditProduct = lazy(()=> import ("../views/ecommerce/Admin/EditProduct.jsx"));
 const ShippingCart = lazy(()=> import ("../views/ecommerce/User/ProductAndShippingAddress.jsx"));
 const ProductOnWebsite= lazy(()=>import("../views/ecommerce/ProductsOnWebsite.jsx"));
 const Orders = lazy(()=> import("../views/ecommerce/User/Orders.jsx"));
 const AdminOrders = lazy(() => import("../views/ecommerce/Admin/AdminOrders.jsx"));
 const OrderDetails = lazy(()=> import("../views/ecommerce/Admin/OrderDetails.jsx"))

const ThemeRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forgot-password",
    element: <ForgetPassword />,
  },
  {
    path: "/reset-password/:resetToken",
    element: <ResetPassword />,
  },
  {
    path: "*",
    element: <Error />,
  },
  {
    path: "/adminlogin",
    element: <AdminLogin />,
  },
  {
    path: "/products",
    element: <ProductOnWebsite />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },

  // Admin routes
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "", element: <Navigate to="dashboard" /> },
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "appointments", element: <Appointments /> },
      { path: "doctors", element: <Doctor /> },
      { path: "admins", element: <AllAdmin /> },
      { path: "profile", element: <AdminProfile /> },
      { path: "contact-us", element: <ContactUs /> },
      { path: "customers", element: <Customers /> },
      { path: "orders", element: <AdminOrders /> },
      { path: "userregister", element: <UserRegistration /> },
      { path: "bookappointmentbyadmin", element: <BookAppointmentByAdmin /> },
      { path: "addproduct", element: <AddProduct /> },
      { path: "allproducts", element: <AllProducts /> },
      { path: "editproduct/:id", element: <EditProduct /> },
      { path: "orderdetails/:id", element: <OrderDetails /> },
      { path: "*", element: <Error /> },
    ],
  },

  // User routes
  {
    path: "/user",
    element: <UserLayout />,
    children: [
      { path: "", element: <Navigate to="dashboard" /> },
      { path: "dashboard", element: <Userdashboard /> },
      { path: "bookappointment", element: <BookAppointment /> },
      { path: "cart", element: <ShippingCart /> },
      { path: "products", element: <ProductList /> },
      { path: "orders", element: <Orders /> },
      { path: "*", element: <Error /> },
    ],
  },
];

export default ThemeRoutes;
