import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet } from "react-router-dom";
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from "./navbar";
import Footer from "./footer";


function Header() {
    return (
        <div style={{display:"flex", flexDirection:"column",justifyContent:"space-between", minHeight: "100vh"}}>
            <Navbar />
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default Header;