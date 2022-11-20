import { Link } from "react-router-dom"
//import { NavLink } from "react-router-dom"

export default function Footer(){
    // const activeStyle = {
    //   color: black
    // }

    return(
      <footer className="container bg-light footer">

        <section className="footer-section text-left">
          <h5>Информация</h5>
            <ul className="flex-column">
              <li className="nav-item"><Link to="/about"><button className="btn">О магазине</button></Link></li>
              <li className="nav-item"><Link to="/catalog"><button className="btn">Каталог</button></Link></li>
              <li className="nav-item"><Link to="/contacts"><button className="btn">Контакты</button></Link></li>
            </ul>
        </section>

        <section className="footer-section">
          <h5>Принимаем к оплате:</h5>
            <div className="footer-pay">
              <div className="footer-pay-systems footer-pay-systems-paypal"></div>
              <div className="footer-pay-systems footer-pay-systems-master-card"></div>
              <div className="footer-pay-systems footer-pay-systems-visa"></div>
              <div className="footer-pay-systems footer-pay-systems-yandex"></div>
              <div className="footer-pay-systems footer-pay-systems-webmoney"></div>
              <div className="footer-pay-systems footer-pay-systems-qiwi"></div>
            </div>
            <div className="footer-copyright">2009-2019 © BosaNoga.ru — модный интернет-магазин обуви и аксессуаров.
              Все права защищены.<br/>Доставка по всей России!
            </div>
        </section>

        <section className="footer-section text-right">
          <h5>Контакты:</h5>
          <a className="footer-contacts-phone" href="tel:+7-495-790-35-03">+7 495 79 03 5 03</a>
          <span className="footer-contacts-working-hours">Ежедневно: с 09-00 до 21-00</span>
          <a className="footer-contacts-email" href="mailto:office@bosanoga.ru">office@bosanoga.ru</a>
          <div className="footer-social-links">
            <div className="footer-social-link footer-social-link-twitter"></div>
            <div className="footer-social-link footer-social-link-vk"></div>
          </div>
        </section>

      </footer>
    )
}