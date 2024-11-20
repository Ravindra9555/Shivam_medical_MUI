import React from "react";
import { Link, Outlet } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { IoIosSpeedometer } from "react-icons/io";
import { MdContactPhone } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { useUser } from "../../context/UserContext";
const UserShade = () => {
  // Define the list of menu items
  const menuItems = [
    {
      title: "Dashboard",
      icon: <IoIosSpeedometer />,
      link: "/user/userdashboard",
      submenu: [],
    },
    {
      title: "Appointments",
      icon: <FaCartArrowDown />,
      link: "/user/bookappointment",
      submenu: [],
    },
    // {
    //   title: "Orders",
    //   icon: <FaCartArrowDown />,
    //   link: "/user/orders",
    //   submenu: [],
    // },
  
  ];
  const { user } = useUser();
  const logout = () => {
    sessionStorage.removeItem("userToken");
    window.location.href = "/login";
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 secondary-background">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <Link
                to="/"
                className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
              >
                <span className="fs-5 d-none d-sm-inline text-dark">
                  Shivam Medical
                </span>
              </Link>
              <ul
                className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                id="menu"
              >
                {menuItems.map((item, index) => (
                  <li className="nav-item" key={index}>
                    <Link
                      to={item.link}
                      className="nav-link align-middle px-0"
                      data-bs-toggle={item.submenu.length > 0 ? "collapse" : ""}
                      aria-expanded={
                        item.submenu.length > 0 ? "false" : undefined
                      }
                    >
                      <i className="fs-4 primary-color">{item.icon}</i>
                      <span className="ms-1 d-none d-sm-inline text-dark">
                        {item.title}
                      </span>
                    </Link>
                    {item.submenu.length > 0 && (
                      <ul
                        className="collapse nav flex-column ms-1"
                        id={item.link.substring(1)}
                        data-bs-parent="#menu"
                      >
                        {item.submenu.map((subItem, subIndex) => (
                          <li className="w-100" key={subIndex}>
                            <Link to={subItem.link} className="nav-link px-0">
                              <span className="d-none d-sm-inline">
                                {subItem.title}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
              <hr />
            </div>
          </div>
          <div className="col py-3">
            <Navbar expand="lg" className="bg-body-tertiary">
              <Container fluid>
                {/* <Navbar.Brand as={Link} to="#">
                  Navbar scroll
                </Navbar.Brand> */}
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                  <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: "100px" }}
                    navbarScroll
                  >
                    {/* <Nav.Link as={Link} to="#action1">
                      Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="#action2">
                      Link
                    </Nav.Link> */}
                  </Nav>

                  <div className="dropdown ">
                    <Link
                      to="#"
                      className="d-flex align-items-center text-dark text-decoration-none dropdown-toggle"
                      id="dropdownUser1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src={user?.profilePic || "https://placeholder.com/100"}
                        alt="User"
                        width="50"
                        height="50"
                        className="rounded-circle"
                      />
                      <span className="d-none d-sm-inline mx-1">
                        {user.name}
                      </span>
                    </Link>
                    <ul
                      className="dropdown-menu dropdown-menu-light text-small shadow dropdown-menu-end"
                      style={{ maxHeight: "200px", overflowY: "auto" }}
                    >
                      {/* <li>
                        <Link className="dropdown-item" to="#">
                          New project...
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/users">
                          Manage users
                        </Link>
                      </li> */}
                      <li>
                        <Link className="dropdown-item" to="/userprofile">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Button
                          className="dropdown-item  btn-outline-danger btn"
                          onClick={logout}
                        >
                          Sign out
                        </Button>
                      </li>
                    </ul>
                  </div>
                </Navbar.Collapse>
              </Container>
            </Navbar>
            <div className="mt-2">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserShade;
