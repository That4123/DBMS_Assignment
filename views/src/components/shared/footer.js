import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import phoneIcon from "../../img/phone.png"
import mailIcon from "../../img/mail.png"
import locationIcon from "../../img/location.png"
function Footer() {
    return (
    <footer class="text-center text-lg-start bg-body-tertiary text-muted" style={{marginTop: "20px"}}>
    <section class="">
      <div class="">
       
        <div class="row mt-3">
         
          <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
          
            <h6 class="text-uppercase fw-bold mb-4">
              <i class="fas fa-gem me-3"></i>HCMUT_SPSS
            </h6>
            <img src="https://e-learning.hcmut.edu.vn/pluginfile.php/1/core_admin/logocompact/300x300/1685588876/logoBK.png"
                    alt="HCMUT Logo" width="150" height="150"/>
          </div>
          
         
          <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          
            <h6 class="text-uppercase fw-bold mb-4" > 
              WEBSITE
            </h6>
            <p>
              <a href="https://hcmut.edu.vn/" class="text-reset" >HCMUT</a>
            </p>
            <p>
              <a href="https://mybk.hcmut.edu.vn/" class="text-reset">MyBK</a>
            </p>
            <p>
              <a href="https://mybk.hcmut.edu.vn/bksi" class="text-reset">BKSI</a>
            </p>
          </div>
         
          <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
           
            <h6 class="text-uppercase fw-bold mb-4">Thông tin liên hệ</h6>
            <p>
                <img src={locationIcon} alt="locationIcon" style = {{width:"20px", height:"30px"}}></img>
                <i class="fas fa-home me-3"></i> 268 Lý Thường Kiệt, P.14, Q.10, TP.HCM
            </p>
            <p>
              <img src={mailIcon} alt="mailIcon" style = {{width:"20px", height:"20px"}}></img>
              <i class="fas fa-envelope me-3"></i>
              hcmut_spss@hcmut.edu.vn
            </p>
            <p>
                <img src={phoneIcon} alt="phoneIcon" style = {{width:"20px", height:"20px"}}></img>
                <i class="fas fa-phone me-3"></i>
                (028) 38 651 670 - (028) 38 647 256
            </p>
          </div>
        
        </div>
       
      </div>
    </section>
 
  
 
    <div class="text-center p-4" style={{backgroundColor:"rgba(0, 0, 0, 0.05)"}}>
      © 2023 Copyright: TN01_Nhom_03
    </div>
   
  </footer>
  )
}
export default Footer;