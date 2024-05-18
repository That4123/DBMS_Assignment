import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import hero from '../../img/hero.png'
import "./hero.css"

export default function Hero() {
  return (
    <div className="hero">
      <img 
        className="heroImg"
        src={hero}
        alt="logo"
      />
    </div>
  )
}