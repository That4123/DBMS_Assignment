import FileUpload from '../file_upload/file_upload.js';
import ChoosePrinter from '../choose_printer/choose_printer.js';
import PrintingConfig from '../print_config/print_config.js';
import { useState,useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
import "./print_file.css"
import "../print_config/print_config.css"
import Modal from 'react-modal'
import axios from 'axios';
import Cookies from "universal-cookie";
const cookies = new Cookies();
const ModalNoti=({isModalNotiOpen,setModalNoti,message})=>{
  return(
    <Modal
      className={"popup-complete-config"}
      overlayClassName={"complete-config-ctn"}
      isOpen={isModalNotiOpen}
      onRequestClose={() => setModalNoti(false)}
      ariaHideApp={false}
    >
      <h2>Thông báo</h2>
      <span className="span-complete-config">
        <p className="complete-noti-content">{message}</p>
        <button onClick={() => setModalNoti(false)} className="complete-noti-btn">
          Đóng
        </button>
      </span>
    </Modal>
  )
}
const printer_detail_cfm=(printerDetail)=>{
  return(
    <>
      <label className='selected-printer-confirm-lb' style={{fontWeight: "600"}}>Máy in đã chọn</label>
      <div className='selected-printer-confirm-ctn' style={{fontWeight: "600"}}>
        <h6>Máy in {printerDetail.printer_id}</h6>
        <div className='slt-prt-info'>
          <span className='slt-prt-cfm-left'>
            <p className='cfm-config-p'>Tên thương hiệu:{printerDetail.brand} </p>
            <p className='cfm-config-p'>Mẫu: {printerDetail.model}</p>
            <p className='cfm-config-p'>Cơ sở: {printerDetail.campusName}</p>
            <p className='cfm-config-p'>Tòa: {printerDetail.buildingName}</p>
            <p className='cfm-config-p'>Phòng: {printerDetail.roomNumber}</p>
          </span>
          <span className='slt-prt-cfm-right'>
            <p className='cfm-config-p'>Mô tả: {printerDetail.description}</p>
            <p className='cfm-config-p'>Tình trạng: {printerDetail.printer_status} </p>
          </span>
        </div>
      </div>
    </>
  );
};
const print_config_cfm=(print_request)=>{
  return(
    <>
      <label className='selected-printer-confirm-lb'>Cấu hình in</label>
      <div className='selected-printer-confirm-ctn'>
        <div className='slt-cfg-cfm-left' style={{fontWeight: "600"}}>
          <p className='cfm-config-p'>Khổ giấy: {print_request.paper_size}</p>
          <p className='cfm-config-p'>{ (print_request.is_double_side)? 'In hai mặt':'In một mặt'}</p>
          <p className='cfm-config-p'>Số bản in: {print_request.number_of_copies}</p>
          <p className='cfm-config-p'>Trang in: {print_request.pages_to_print}</p>
          <p className='cfm-config-p'>Loại in: {print_request.print_type}</p>
        </div>
      </div>
    </>
  );
};
const PrintingFile = () => {
  const token = cookies.get("TOKEN");
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState('upload');
  const [isModalNotiOpen,setModalNoti]=useState(false);
  const [responseMessage,setResponseMessage]=useState('');
  const [sharedState, setSharedState] = useState({
    printer_id: '',
    file_path: '',
    file_name: '',
    paper_size:'',
    pages_to_print:'',
    is_double_side:'',
    number_of_copies:'',
    print_type:'',
  });
  const [completeState,setCompleteState]=useState(sharedState);
  const handleValueChange = (name, value) => {
    setSharedState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const renderPage = () => {
    switch (currentPage) {
      case 'upload':
        return <FileUpload sharedState={sharedState} setSharedState={handleValueChange}/>;
        break;
        case 'printer':
         return <ChoosePrinter sharedState={sharedState} setSharedState={handleValueChange}/>;
        break;
      case 'config':
        return <PrintingConfig sharedState={sharedState}
          setSharedState={handleValueChange} 
          handleSubmit={handleSubmit}/>;
        break;
      default:
        return <FileUpload value={sharedState} onValueChange={handleValueChange}/>;
    }
  };  
  const [printerDetail,setPrinterDetail ]=useState(0);
  useEffect(() => {
    axios.post('/api/viewPrinterInfo',{
      printer_id:completeState.printer_id,
    })
      .then(response => setPrinterDetail(response.data.printer))
      .catch(error => console.error('Error fetching printers:', error));
  }, [completeState.printer_id]);
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const [isModalCompleteOpen, setModalCompleteOpen] = useState(false);

  const handleComplete = () =>{
    axios.post("/api/printFile/makeUpdateRequest", {
      sharedState,
    },{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => {
            console.log(111);
            setCompleteState(sharedState);
            setResponseMessage(response.data.message);
            setModalNoti(true);
        })
        .catch((error) => {
          if (error.response) {
            setResponseMessage(error.response.data.message);
            setModalNoti(true);
          }
        })
      
  }

  const [errorMessage, setErrorMessage] = useState(null);
  const handleSubmit = () => {
    if (errorMessage) return;
    axios.post("/api/printFile/makePrintRequest", {
      completeState,sharedState
    },{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => {
          setResponseMessage(response.data.message);
          setModalNoti(true);
        })
        .catch((error) => {
          if (error.response) {

            setResponseMessage(error.response.data.message);
            setModalNoti(true);
          }
        })
  }
  return (
    <div>
        <div className="title-config-container">
            <h1 style={{color: "black"}}>In ấn</h1>
            <h5>Vui lòng thiết lập các thông tin sau đây</h5>
        </div>
        <div className="prtview-button-container">
            <span className='config-button-span'>
                <button className='configbtn' onClick={() => setCurrentPage('upload')}>Tải file lên</button>
                <button className='configbtn' onClick={() => setCurrentPage('printer')}>Chọn máy in</button>
                <button className='configbtn' onClick={() => setCurrentPage('config')}>Cấu hình in</button>
            </span>
            <span className='config-printbtn-span'>
                <button className='config-printbtn' onClick={openModal}> In </button>
                    <Modal className={"popup-confirm-config"} overlayClassName={"cfm-config-ctn"}
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        ariaHideApp={false}
                    >
                        <h2>Xác nhận in ấn</h2>
                        <div className='upload-file-ctn'>
                          <label className='upload-file-lb' style={{fontWeight: "600"}}>File tải lên</label>
                          <div className='upload-file-name'style={{fontWeight: "600"}} >{completeState.file_name}</div>
                        </div>
                        {printer_detail_cfm(printerDetail)}
                        {print_config_cfm(completeState)}
                        <div className='btn-ctn-cfm-cfg'>
                          <p className='cfm-config-p'style={{fontWeight: "600"}}>Chắc chắn đây là thiết lập của bạn?</p>
                          <button onClick={() => {closeModal(); handleSubmit()}} className="cfm-config-btn">Đúng. Yêu cầu in</button>
                        </div>
                    </Modal>
            </span>
        </div>
      <div>
        {renderPage()}
        {
          <div className='config-container'>
            <div className="attribute-config side-page-config">
              <button value="1" className="back-btn">
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Quay lại
                </Link>
              </button>
              <button value="2" className="complete-btn" onClick={() => handleComplete()}>
                Hoàn thành
              </button>
            </div>
          </div>
        }
        <ModalNoti isModalNotiOpen={isModalNotiOpen} setModalNoti={setModalNoti} message={responseMessage} />
      </div>
    </div>
  );
};
export { printer_detail_cfm, print_config_cfm };
export default PrintingFile;