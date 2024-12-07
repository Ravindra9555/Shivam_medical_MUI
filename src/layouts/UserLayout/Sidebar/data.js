import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FeaturedPlayListOutlinedIcon from '@mui/icons-material/FeaturedPlayListOutlined';
const Menuitems = [
  {
    title: "Dashboard",
    icon: DashboardOutlinedIcon,
    href: "/user/dashboard",
  },
  {
    title: "Appointments",
    icon: CalendarMonthIcon,
    href: "/user/bookappointment",
  },
  {
    title: "Cart",
    icon: AddShoppingCartIcon,
    href: "/user/cart",
  },
  {
    title: "Buy Products",
    icon: AddToPhotosOutlinedIcon,
    href: "/user/products",
  },
  {
    title: "Orders",
    icon: FeaturedPlayListOutlinedIcon,
    href: "/user/orders",
  },

];

export default Menuitems;
