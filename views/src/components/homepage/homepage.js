import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './homepage.css'; // Import the CSS file for styling

function Homepage() {
  const [greetingFromServer, setGreetingFromServer] = useState(null);
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
  const navigate = useNavigate();

  const backgrounds = [
    'https://e-learning.hcmut.edu.vn/theme/boost/images/slbk.jpg?1701272658035',
    'https://e-learning.hcmut.edu.vn/theme/boost/images/slbktv.jpg?1701272656955'
  ];

  useEffect(() => {
    axios.get('/api/homepage')
      .then((response) => {
        console.log(response);
        setGreetingFromServer(response.data.greeting);
      })
      .catch((error) => {
        console.error("Error!!!!!!", error);
      });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentBackgroundIndex(prevIndex => (prevIndex + 1) % backgrounds.length);
    }, 5000); // Set interval to 3 seconds (3000 milliseconds)

    return () => clearInterval(intervalId); 
  }, [currentBackgroundIndex]);

  const backgroundImageStyle = {
    backgroundImage: `url(${backgrounds[currentBackgroundIndex]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', // Adjust the height as needed
  };

  return (
    <>
      <div className="homepage-container" style={backgroundImageStyle}></div>
      <section class="py-8 py-md-11 " style={{marginTop: "1rem"}}>
        <div class="container">
          <div class="row">
            

            <div class="col-12 col-md-4">
              <div class="card  mb-6 mb-md-0" style={{width: "18rem"}}>
                <div class="card-body">
                  <h5 class="card-title text-center text-success" style={{fontSize: "x-large"}}><i class="bi bi-globe"></i>
                  </h5>
                  <h6 class="card-subtitle mb-2 text-body-secondary">Giới thiệu</h6>
                  <p class="card-text">HCMUT_SPSS là dịch vụ in ấn thông minh phục vu cho sinh viên và cán bộ trường Đại học Bách Khoa, ĐHQG-HCM. Hệ thống được quản lý
                  dưới quyền của SPSO.
                  </p>

                </div>
              </div>
            </div>

            <div class="col-12 col-md-4">
              <div class="card mb-6 mb-md-0" style={{width: "18rem"}}>
                <div class="card-body ">
                  <h5 class="card-title text-center text-success" style={{fontSize: "x-large"}}><i class="bi bi-suitcase"></i>
                  </h5>
                  <h6 class="card-subtitle mb-2 text-body-secondary">Mục tiêu</h6>
                  <p class="card-text">Hệ thống với mục tiêu mang lại trải nghiệm tốt nhất cho sinh viên và cán bộ khi thực hiện in ấn ngay tại trường học
                  và dễ dàng trong việc quản lý thời gian hoàn thành in ấn.
                  </p>

                </div>
              </div>
            </div>


            <div class="col-12 col-md-4 ">
              <div class="card  mb-6 mb-md-0" style={{width: "18rem"}}>
                <div class="card-body">
                  <h5 class="card-title text-center text-success" style={{fontSize: "x-large"}}><i
                      class="bi bi-telephone"></i>
                  </h5>
                  <h6 class="card-subtitle mb-2 text-body-secondary">Quy định</h6>
                  <p class="card-text">Các tài liệu được in cần đảm bảo quy định về nội dung, không được chứa những nội dung không phù hợp. Ngoải ra các loại file in và dung lượng file
                  cũng cần đáp ứng đúng quy định của hệ thống.</p>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      <div className="container-info">
          <div> Hệ thống bao gồm </div>
          <div className="number"> 10+</div>
          <div> Máy in</div>
          <div>Phục vụ cho hơn</div>
          <div className="number">15.000</div>
          <div>Cán bộ và sinh viên</div>
      </div>
    </>
    
  );
}

export default Homepage;
