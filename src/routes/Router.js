import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const AdminLayout = lazy(() => import("../layouts/FullLayout/FullLayout.js"));
const UserLayout = lazy(() => import("../layouts/UserLayout/FullLayout.js"));
/****End Layouts*****/

/*****Pages******/
const Dashboard1 = lazy(() => import("../views/dashboards/Dashboard1.js"));

const Spinner = lazy(()=> import("../views/Spinner/Spinner.js"));


// user
const Error = lazy(() => import("../components/error/Error.jsx"));
const Home = lazy(() => import("../components/landing/Home"));
const Login = lazy(() => import("../components/userauth/Login"));
const Signup = lazy(() => import("../components/userauth/Signup"));
const ForgetPassword = lazy(() =>import("../components/userauth/ForgetPassword"));
const UserAppointments = lazy(()=> import("../components/pages/user/Appointments"))
const BookAppointment = lazy(() => import("../components/pages/user/BookAppointment"));
const  Userdashboard = lazy(()=>import("../components/pages/user/UserDashbaord"));
//  admin
const AdminLogin = lazy(() => import("../components/adminAuth/AdminLogin"));
const AdminProfile = lazy(() => import("../components/pages/Admin/AdminProfile"));
const AllAdmin = lazy(() => import("../components/pages/Admin/AllAdmins"));
const Appointments = lazy(() => import("../components/pages/Admin/Appointment"));
const Doctor = lazy(() => import("../components/pages/Admin/Doctor"));
const ResetPassword = lazy(() => import("../components/userauth/ResetPassword"));
const ContactUs = lazy(() => import("../components/pages/Admin/ContactUs"));
const Customers = lazy(() => import("../components/pages/Admin/Customers"));
const AdminOrders = lazy(() => import("../components/pages/Admin/AdminOrders.jsx"));
const Dashboard = lazy(() => import("../components/pages/Admin/Dashboard"));
const BookAppointmentByAdmin = lazy(()=> import("../components/pages/Admin/BookAppointment"))
const UserRegistration = lazy(()=> import("../components/pages/Admin/UserRegistration"));

//  ecommerce  

const ProductList  =  lazy(()=> import("../views/ecommerce/ProductList.jsx"));
const Cart = lazy (()=> import ("../views/ecommerce/Cart.jsx"));
 const AddProduct = lazy(()=> import ("../views/ecommerce/AddProduct.jsx"))
 const AllProducts = lazy(()=> import ("../views/ecommerce/AllProductList.jsx"));
 const EditProduct = lazy(()=> import ("../views/ecommerce/EditProduct.jsx"));
 const ShippingCart = lazy(()=> import ("../views/ecommerce/ProductAndShippingAddress.jsx"));
 const ProductOnWebsite= lazy(()=>import("../views/ecommerce/ProductsOnWebsite.jsx"));
 const Orders = lazy(()=> import("../views/ecommerce/Orders.jsx"));
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
      { path: "dashboard", element: <Dashboard1 /> },
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
