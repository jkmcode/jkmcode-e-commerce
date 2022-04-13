import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SearchBox from "./SearchBox";
import LanguageSwitcher from "./LanguageSwitcher";
import { logout } from "../actions/userActions";
import { useTranslation } from "react-i18next";

function Header() {
  const { t } = useTranslation();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [navbar, setNavbar] = useState(false);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  const changeNavbar = () => {
    if (window.scrollY >= 50) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeNavbar);

  return (
    <header>
      <Navbar
        id="navbar"
        variant="dark"
        expand="xl"
        fixed="top"
        collapseOnSelect
        data-aos="fade-down"
        className={navbar ? "navbaractive" : "navbarcss"}
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>JKMCODE SHOP</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <SearchBox />
              <LinkContainer to="/cart">
                <Nav.Link className="margin">
                  <i className="fas fa-shopping-cart"></i>
                  {t("Header_btn_cart")}
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.username}>
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                      {t("Header_navdrodown_profile")}
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orders">
                    <NavDropdown.Item>
                      {t("Header_navdrodown_user_order")}
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    {t("Header_navdrodown_logout")}
                  </NavDropdown.Item>

                  {userInfo && userInfo.IsAdmin && (
                    <div>
                      <NavDropdown.Divider />
                      <LinkContainer to="/admin">
                        <NavDropdown.Item>
                          {t("Header_navdrodown_admin")}
                        </NavDropdown.Item>
                      </LinkContainer>
                    </div>
                  )}
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link className="margin">
                    <i className="fas fa-user"></i>
                    Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
            <LanguageSwitcher />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
