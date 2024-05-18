import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import logo from '../../img/SIMSBCLogo.png'
import { createContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from 'axios';

const UserContext = createContext();

export default function Navbar() {
    const navigate = useNavigate();
    const [signin, setSignIn] = useState(false);
    const cookies = new Cookies();
    const [role, setRole] = useState(null);
    useEffect(() => {
        const token = cookies.get("TOKEN");
        if (!token) {
            setSignIn(false);
            setRole(null);
        }
        else {
            axios.post("/api/authorization/student", {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                setSignIn(true);
                setRole("Sinh viên");
            }).catch((error) => { });

            axios.post("/api/authorization/spso", {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                setSignIn(true);
                setRole("Nhân viên SPSO");
            }).catch((error) => { });

            axios.post("/api/authorization/financier", {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                setSignIn(true);
                setRole("Nhân viên văn phòng tài chính");
            }).catch((error) => { });

            axios.post("/api/authorization/admin", {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                setSignIn(true);
                setRole("Quản trị viên");
            }).catch((error) => { });
        }
    }, []);

    const handleSignOut = (e) => {
        cookies.remove('TOKEN', {
            path: "/",
        });
        setSignIn(false);
        setRole(null);
        navigate("signin");
    }

    let navItem = null, renderSignOut = null, renderSignIn = null;

    if (!signin) {
        navItem = (
            <>
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/" style={{color: "white", fontWeight: "600"}}>
                        Trang chủ
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/signup" style={{color: "white", fontWeight: "600"}}>
                        Đăng ký
                    </Link>
                </li>
            </>
        )
        renderSignIn = (
            <Link className="nav-link" to="/signin">
                Đăng nhập
            </Link>
        );
    }
    else {
        if (role === "Sinh viên") {
            navItem = (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/">
                            Trang chủ
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/printFile">
                            In ấn
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/printingStatus">
                            Lịch sử in ấn
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/buyPaper">
                            Mua trang in
                        </Link>
                    </li>
                </>
            );
        }
        else if (role === "Nhân viên SPSO") {
            navItem = (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/">
                            Trang chủ
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/printing-queue">
                            Quản lý hàng đợi
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/viewPermittedFileType">
                            Giới hạn in ấn
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/viewAllPrinter">
                            Quản lý máy in
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/printing-log">
                            Lịch sử in ấn
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/report">
                            Báo cáo thống kê
                        </Link>
                    </li>
                </>
            );
        }
        else {
            navItem = (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/" >
                            Trang chủ
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/wip">
                            Đang phát triển (WIP)...
                        </Link>
                    </li>
                </>
            );
        }
        renderSignOut = (
            <button type="submit" className="btn btn-primary" onClick={handleSignOut}>
                Đăng xuất
            </button>
        );
    }

    return (
        <nav className="navbar navbar-expand-lg border-bottom border-body">
            <div className="container-fluid" style={{ marginLeft: '50px', marginRight: '50px' }}>
                <img src="https://e-learning.hcmut.edu.vn/pluginfile.php/1/core_admin/logocompact/300x300/1685588876/logoBK.png"
                    alt="HCMUT Logo" width="50" height="50"/>
                <Link className="navbar-brand" to="/">
                    HCMUT_SPSS
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {navItem}
                    </ul>
                    {renderSignIn}
                    {renderSignOut}
                </div>
            </div>
        </nav>
    )

}