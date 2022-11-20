import logo from '../img/header-logo.png'
import { Link } from "react-router-dom"
import { useRef, useContext } from 'react'
import { Context } from '../Context'

export default function Header(){
  const seek = useRef(null)
  const searchForm = useRef(null)
  const {seeker, cart} = useContext(Context)

  function active(e) {
    const nav = [...document.querySelectorAll('.btn')]
    nav.forEach(item => item.classList.remove('active'))
    e.target.closest('.btn').classList.add('active')
  }

  function view(e) {
    searchForm.current.classList.toggle('invisible')
    if (seek.current.value !=="") {
      seeker(e, seek.current.value)
      seek.current.value = ""
    }
  }

  return(
    <header className="container">
      <div className="nav">
        <Link to="/"><img src={logo} alt="Bosa Noga" /></Link>
          <ul className="navbar-nav">
            <li onClick={active}><Link to="/"><button className="btn active">Главная</button></Link></li>
            <li onClick={active}><Link to="/catalog"><button className="btn">Каталог</button></Link></li>
            <li onClick={active}><Link to="/about"><button className="btn">О магазине</button></Link></li>
            <li onClick={active}><Link to="/contacts"><button className="btn">Контакты</button></Link></li>
          </ul>
      </div>
      <div className="search-cart">
        <form data-id="search-form" className="header-controls-search-form form-inline invisible" ref={searchForm}>
          <input className="form-control" placeholder="Поиск" ref={seek} />
        </form>
        <Link to='/catalog'>
          <div data-id="search-expander" className="header-controls-pic header-controls-search" onClick={view}></div>
        </Link>
        <Link to="/cart">
          <div className="header-controls-pic header-controls-cart">
            {cart.length > 0 && <div className="header-controls-cart-full">{cart.length}</div>}
            <div className="header-controls-cart-menu"></div>
          </div>
        </Link>
      </div>
    </header>
  )
}