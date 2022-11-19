import './App.css'
import {Routes, Route} from "react-router-dom"
import Header from './components/Header'
import Banner from './components/Banner'
import Footer from './components/Footer'
import Main from './pages/Main'
import Catalog from './pages/Catalog'
import About from './pages/About'
import Contacts from './pages/Contacts'
import ShoeDetail from './pages/ShoeDetail'
import Cart from './pages/Cart'

function App() {
  return (
    <div className="app">
      <Header />
      <Banner />
      <Routes className="content">
        <Route exact path="/" element={<Main />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/catalog/:itemId" element={<ShoeDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App;
