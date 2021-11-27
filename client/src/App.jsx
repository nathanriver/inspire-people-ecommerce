import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import { autoLogin } from "./features/auth/authSlice";
import Routes from "./Routes";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";
import Snackbar from "./components/Snackbar";
import { setToken } from "./config";

if (localStorage.token) {
  setToken(localStorage.token);
}

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);

  useEffect(() => {
    const hideMenu = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", hideMenu);

    return () => {
      window.removeEventListener("resize", hideMenu);
    };
  });

  return (
    <Router>
      <NavBar toggle={toggle} />
      <SideBar toggle={toggle} isOpen={isOpen} />
      <Routes />
      <Snackbar />
      <Footer />
    </Router>
  );
};

export default App;
