import React from 'react';
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
import './buyPaper.css'
import '../../styles/themify-icons/themify-icons.css';
import { useParams } from 'react-router-dom';
const cookies = new Cookies();
const token = cookies.get('TOKEN');


function BuyPaper() {
  const [paperNum, setPaperNum] = useState(null)
  const [reFresh, setReFresh] = useState(0)
  const [confirmBuyPaper, setConfirmBuyPaper] = useState()
  const [confirmPurchase, setConfirmPurchase] = useState()
  const [isValid, setIsValid] = useState(true);
  const [paperNumBuy, setPaperNumBuy] = useState({
    number_of_page: '',
    amount: '',
    register_date: '',
    status: 'Chưa thanh toán'
  })
  const resetPaperNumBuy=()=>{
    let newPaperNumBuy = {
    number_of_page: '',
    amount: '',
    register_date: '',
    status: 'Chưa thanh toán'
    }
    setPaperNumBuy(newPaperNumBuy)
  }

  const handleBuyPaper = (BuyDetail) => {
      // Gọi hàm thực hiện mua paper
      //Truyền vào object paperNumBuy
        axios.post('/api/buyPaper/register',BuyDetail,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response=>{
          console.log(response.data)
        })
        .catch(error => {
          console.error('Error register:', error)
        })
        setReFresh(prev=>prev+1);
        resetPaperNumBuy();
      setConfirmBuyPaper(null);
  }
  const handlePurchase = (id) =>{
      //Truyền vào id của purchase_log_id
      axios.post('/api/buyPaper/confirm',{purchase_log_id:id},{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response=>{
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error confirm purchase:', error)
      })
      setConfirmPurchase(1)
      // Thực hiện chuyển trạng thái của purchase log sang Đã thanh toán
      // Cộng thêm số trang tương ứng vào tài khoản sinh viên
  }
  const [paperPurchaseLog, setPaperPurchaseLog] = useState(null)
    useEffect(() =>{
        axios.post('/api/buyPaper/load',{},{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          console.log(response.data)
          setPaperNum(response.data[0].page_num_left)
        })
        .catch(error => console.error('Error fetching pageNumber:', error)) 

    }, [reFresh]);
    useEffect(()=>{
        axios.post('/api/buyPaper/log',{},{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response=>{
          console.log(response.data)
          setPaperPurchaseLog(response.data)
        })
        .catch(error => {
          console.error('Error fetching Purchase Log:', error)
        })
    },[reFresh])
    const handleInputChangeBuyPaper = (e) => {
      const { name, value } = e.target;
    setPaperNumBuy((prevCriteria) => ({ ...prevCriteria, [name]: value }));
    setPaperNumBuy((prev) => ({ ...prev, amount:  parseInt(value, 10) * 400 }));
    const isValidNumber = /^\d+$/.test(value);
    const isValidNumber2 = value >= 1?true:false;
    // Cập nhật trạng thái của isValid
    setIsValid(isValidNumber&&isValidNumber2);
    }
      return (
      <div>
        <h1 id='buy-service' style={{color: "black", marginRight: "30%", marginLeft: "40%"}}>Dịch vụ mua thêm trang in </h1>
        <div>
          <div className='Buy-paper-box'style={{marginLeft: "35%"}}>
            <div>
            <h3 >Số trang in hiện còn lại của sinh viên: </h3>
            <p style={{display:'inline-block'}}> {paperNum} </p>
            </div>
            <div>
            <label>Số trang in:</label>
            <input type="number" name="number_of_page" min={1} value={paperNumBuy.number_of_page} placeholder='1'  onChange={handleInputChangeBuyPaper} />
            </div>
            <div>
            <label>Thành tiền: </label>
            <p>{isValid?`${paperNumBuy.number_of_page*400} đồng`:'Vui lòng kiểm tra lại số lượng trang mua'}</p>
            </div>
            <button className='Switch-status-btn' onClick={()=>setConfirmBuyPaper(1) } disabled= {!isValid}>Xác nhận mua</button>
          </div>
          <div className='Purchase-log'>
            <h2>Lịch sử mua trang in</h2>
            {paperPurchaseLog&&(
              <div>
                <table>
                <thead>
                  <tr>
                    <th>MSSV</th>
                    <th>Mã hoá đơn</th>
                    <th>Ngày đăng kí mua</th>
                    <th>Số lượng mua</th>
                    <th>Thành tiền</th>
                    <th>Tình trạng</th>
                    <th>Ngày thanh toán</th>
                  </tr>
                </thead>
                <tbody>
                {paperPurchaseLog.map(purchase => (
                  <tr>
                    <td>{purchase.student_id}</td>
                    <td>{purchase.purchase_log_id}</td>
                    <td>{purchase.register_date}</td>
                    <td>{purchase.number_of_page}</td>
                    <td>{purchase.amount}</td>
                    <td>{purchase.status}</td>
                    <td>{purchase.status==='Chưa thanh toán'? <button className='Switch-status-btn' 
                    style={{display:'inline-block', float:'left', maxHeight:'30 px', padding: '2px'}}
                    onClick={()=>handlePurchase(purchase.purchase_log_id)}>Thanh toán</button> : purchase.purchase_date }</td>
                  </tr>
                  
              ))}
              </tbody>
              </table>
              
              </div>
            )}
          </div>
        </div>
        {confirmBuyPaper && (
        <div className='overlay'>  
        <div className="confirm-dialog">
          <div className="confirm-content1">
            <i className='ti-check'></i>
            <i>Xác nhận</i>
            <p>Xác nhận mua trang in? </p>
            <button className = "btn1 xacnhan"onClick={()=>handleBuyPaper(paperNumBuy)}>Xác nhận</button>
            <button className= "btn1 khong"onClick={()=> setConfirmBuyPaper(null)}>Không</button>
          </div>
        </div>
        </div>
      )}
      {confirmPurchase && (
        <div className='overlay'>  
        <div className="confirm-dialog">
          <div className="confirm-content2">
            <i className='ti-bell'></i>
            <i>Thông báo</i>
            <p>Sinh viên vui lòng vào trang BKPay để thanh toán trước khi hết hạn! </p>
            <button className= "btn1 "onClick={()=> {setConfirmPurchase(null); setReFresh(prev=>prev+1);}}>OK</button>
          </div>
        </div>
        </div>
      )}
      </div>
    );
  }
  
  export default BuyPaper;