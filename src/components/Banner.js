import banner from '../img/banner.jpg'
import { Link } from "react-router-dom"

export default function Banner() {
    return (
        <div className='banner'>
            <Link to="/"><img src={banner} className="img-fluid" alt="К весне готовы!" /></Link>
            <h2 className="banner-header">К весне готовы!</h2>
        </div>
    )
}