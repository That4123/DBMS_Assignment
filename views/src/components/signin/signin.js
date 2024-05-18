import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios'
import { useState, useEffect } from "react";
import Header from '../shared/header';
import Cookies from "universal-cookie";
const cookies = new Cookies();

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    // const [login, setLogin] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("/api/signin", {
            email,
            password
        })
            .then((response) => {
                cookies.set("TOKEN", response.data.token, {
                    path: "/",
                });
                setTimeout(() => {
                    window.location.reload();
                }, 100);
                if (response.data.member.role == "Sinh viên") {
                    navigate("/printFile");
                }
                else if (response.data.member.role == "Nhân viên SPSO") {
                    navigate("/printing-queue");
                }
                else {
                    navigate("/wip");
                }
            })
            .catch((error) => {
                if (error.response) {
                    setErrorMessage(error.response.data.message);
                }
            })
    }
    return (
        <form>
            <div className="mb-3" style={{marginLeft: "20%", marginRight: "20%"}}>
                <label htmlFor="exampleInputEmail1" className="form-label">
                    Email
                </label>
                <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-3" style={{marginLeft: "20%", marginRight: "20%"}}>
                <label htmlFor="exampleInputPassword1" className="form-label">
                    Mật khẩu
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary" onClick={(e) => handleSubmit(e)} style={{marginLeft: "20%", marginRight: "20%"}}>
                Đăng nhập
            </button>
            <p>{errorMessage ? errorMessage : ""}</p>
        </form>
    )

}
export default SignIn;