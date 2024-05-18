import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import './printing_status.css';
import '../print_file/print_file/print_file.css'
import { printer_detail_cfm, print_config_cfm } from "../print_file/print_file/print_file"
import Modal from 'react-modal'
import moment from 'moment'
import { crossOriginResourcePolicy } from 'helmet';

const cookies = new Cookies();
const token = cookies.get('TOKEN');
const PrintDetail=({selectedId,printingLogList, isOpen, closeModal})=>{
  const [isLoadingDetail, setLoadingDetail] = useState(false);
  const [printerSelected,setPrinterSelected]=useState([]);
  const [printConfigSelected,setPrintConfigSelected]=useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    
    if (isOpen && (selectedId!=null)&&printingLogList) { 
      setLoadingDetail(true);
      axios.post('/api/viewPrinterInfo', {
        printer_id: printingLogList[selectedId].printer_id,
      })
        .then(response => setPrinterSelected(response.data.printer))
        .catch(error => {
          setErrorMessage(error.response.message);
          console.error('Error fetching printers:', error);
        });
      axios
        .post('/api/printingStatus/getConfigDetail', {
          print_request_id: printingLogList[selectedId].print_request_id,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setPrintConfigSelected(response.data.print_request);
          setLoadingDetail(false);
        })
        .catch(error => {
          setErrorMessage(error.response.message);
          console.error('Error fetching printers:', error);
        });
    }else{
      setLoadingDetail(false);
    }
  }, [selectedId]);

  const loadDetail=()=>{
    if ((selectedId===null)||isLoadingDetail||(!printingLogList)) {
      return <div className='App'>Loading...</div>;
    }
    else if(isOpen){
      return(
        <>
          <h2>Yêu cầu in số {printingLogList[selectedId].log_id}</h2>
          <div className='upload-file-ctn'>
            <label className='upload-file-lb' style={{fontWeight: "600"}}>File tải lên</label>
            <div className='upload-file-name' style={{fontWeight: "600"}}>{printConfigSelected.file_name}</div>
          </div>
          {printer_detail_cfm(printerSelected)}
          {print_config_cfm(printConfigSelected)}
          <h3>{errorMessage}</h3>
        </>
      )
    }
  }
  return(
    <>
      <span className='config-printbtn-span'>
        <Modal className={"popup-confirm-config"} overlayClassName={"cfm-config-ctn"}
          isOpen={isOpen}
          onRequestClose={() => closeModal()}
          ariaHideApp={false}
        >
          {loadDetail()}
          <div className='btn-ctn-cfm-cfg'>
            <button onClick={closeModal} className="cfm-config-btn">Đóng</button>
          </div>
        </Modal>
      </span>
    </>
  );
  
}
const PrintingStatus = () => {
  
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [printingLogList, setPrintingLogList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const [selectedId,setSelectedId]=useState();
  useEffect(() => {
    axios
      .post('/api/printingStatus/', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPrintingLogList(response.data.listPrintingLog);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
        console.error(error.response.data.message);
        setLoading(false);
      });
  }, [isLoading]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };  
  const changeVIStatus = (printing_status) => {
    switch (printing_status) {
      case 'Pending':
        return 'Đang chờ duyệt';
      case 'Accepted':
        return 'Đã được duyệt';
      case 'Denied':
        return 'Bị từ chối';
      case 'Completed':
        return 'Đã hoàn thành';
      default:
        return '';
    }
  };
  // useEffect(()=>{
  //   console.log(selectedId,' selected log id');
  // },[selectedId]);
  const singleDetail = (printingLog,index) => {
    return (
      <div className='printingLog-single-ctn' key={index} onClick={(e)=>{
        setSelectedId(index);
        openModal();
      }}>
        <div className='left-single-printingLog'>
          <p>Yêu cầu in số {printingLog.log_id}</p>
          <p>{moment(printingLog.start_time).format('YYYY-MM-DD HH:mm:ss')}</p>
        </div>
        <div className='right-single-printingLog'>
          <p>{changeVIStatus(printingLog.printing_status)}</p>
        </div>
      </div>
    );
  };
  const handleUpdateQueue = () => {
    setLoading(true);
  };
  const displayAllPrintReq = () => {
    if (isLoading) {
        return <div className='App'>Loading...</div>;
    }
    return (
      <>
        <div className='printingLog-queue-ctn'>
        {printingLogList.map((printingLog, index) => singleDetail(printingLog, index))}
        </div>
        <PrintDetail selectedId={selectedId} printingLogList={printingLogList} isOpen={isModalOpen} closeModal={closeModal} />
      </>
    );
  };
  return (<>
    <div className='pringting-status-ctn'>
      <h1>Lịch sử in ấn</h1>
      <div className='btn-printingLog-ctn'>
          <button onClick={handleUpdateQueue}>Cập nhật hàng chờ</button>
      </div>
      <h3>{errorMessage}</h3>
      {displayAllPrintReq()}
    </div>
  </>);
};

export default PrintingStatus;
