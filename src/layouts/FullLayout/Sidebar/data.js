import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AlbumOutlinedIcon from '@mui/icons-material/AlbumOutlined';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import ViewListIcon from '@mui/icons-material/ViewList';
const Menuitems = [
  {
    title: "Dashboard",
    icon: DashboardOutlinedIcon,
    href: "/admin/dashboard",
  },
  {
    title: "Appointments",
    icon: EventAvailableIcon,
    href: "/admin/appointments",
  },
  {
    title: "Customers",
    icon: PeopleAltIcon,
    href: "/admin/customers",
  },
  {
    title: "Doctors",
    icon: MedicalInformationIcon,
    href: "/admin/doctors",
  },
  {
    title: "Add Product",
    icon: AlbumOutlinedIcon,
    href: "/admin/addproduct",
  },
  {
    title: "All Product",
    icon: AlbumOutlinedIcon,
    href: "/admin/allproducts",
  },
  {
    title: "All Orders",
    icon: ViewListIcon,
    href: "/admin/orders",
  },
  {
    title: "Contact",
    icon: ContactPhoneIcon,
    href: "/admin/contact-us",
  }
];

export default Menuitems;
