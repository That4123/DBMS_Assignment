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

function PublicTest() {
    const [commentFrame, setCommandFrame] = useState(null);
    const [memberConfig, setMemberConfig] = useState(null);
    // const [message, setMessage] = useState(null);
    const token = cookies.get("TOKEN");
    const navigate = useNavigate();
    useEffect(() => {
        axios.post("/api/authorization/student", {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setCommandFrame(
                <>
                    <div className="mb-3">
                        <label htmlFor="exampleInputCommandFrame" className="form-label">
                            Khung bình luận (chỉ có thể xuất hiện khi đã đăng nhập thành công bằng tài khoản sinh viên)
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputCommandFrame"
                            aria-describedby="emailHelp"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={() => { cookies.remove("TOKEN", { path: "/" }); navigate("/signin"); }}>
                        Đăng xuất
                    </button>
                </>
            );
        }).catch((error) => { });
        axios.post("/api/authorization/spso", {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setMemberConfig(
                <>
                    <button className="btn btn-primary">
                        Nút này chỉ có thể được thấy bởi nhân viên SPSO
                    </button>
                    <button type="submit" className="btn btn-primary" onClick={() => { cookies.remove("TOKEN", { path: "/" }); navigate("/signin"); }}>
                        Đăng xuất
                    </button>
                </>

            );
        }).catch((error) => { });
    }, [])
    return (
        <>
            <h1>Đây là trang không cần đăng nhập cũng vào được</h1>
            <h3>Tuy vậy, sẽ có những thứ ẩn cần đăng nhập với quyền nhất định để thấy được</h3>

            {commentFrame}
            {memberConfig}

            <p>
                Nút dưới đây sẽ dẫn đến trang ẩn. Trang ẩn chỉ có thể truy cập được khi đã đăng nhập bằng tài khoản quản trị viên.
            </p>
            <p>
                Nếu chưa đăng nhập hoặc tài khoản không đúng quyền, trình duyệt ngay lập tức sẽ điều hướng bạn về lại trang này.
            </p>
            <button className="btn btn-primary" onClick={() => { navigate("/protectedTest"); }}>
                Đến trang ẩn
            </button>
        </>

    )
}

export default PublicTest;