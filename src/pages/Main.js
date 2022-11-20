import {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import SortMenu from '../components/SortMenu'
import ShoesList from '../components/ShoesList'
import {Context} from '../Context'

export default function Main() {
    const url = 'http://localhost:7070/api/'
    const { isLoadCategories, categories, selected, onSelectSort, isLoad, displayShoes, view, loadMore} = useContext(Context)

    //Хиты продаж
    const [hits, setHits] = useState([])
    const [isLoadHit, setLoadHit] = useState(false)

    useEffect(() => {
        fetch(`${url}top-sales`)
            .then(res => res.json())
            .then(data => {
                setHits(data)
                setLoadHit(true)
            })
    }, [])

        
    const dispalayHits = hits.map(item => {
        return (
             <div key={item.id} className="card">
                <img className="item-image" src={item.images[0]} alt={item.title} />
                <div className="item-description">
                    <div className="item-title">{item.title}</div>
                    <div className="item-price">{item.price} руб.</div>
                    <Link to={`/catalog/${item.id}`}><button className="btn-link">Заказать</button></Link>
                </div>
             </div>
        )
    })

    return (
        <div className="main">
            <h2>Хиты продаж!</h2>
            <div className="cards">
                {isLoadHit ? dispalayHits : 'loading'}
            </div>
            <h2>Каталог</h2>
            {isLoadCategories ? <SortMenu categories={categories} selected={selected} onSelectSort={onSelectSort} /> : 'loading'}
            {isLoad ? <ShoesList shoes={displayShoes}/> : 'loading'}
            {view && <button onClick={loadMore} className="btn-link">Загрузить еще</button>}
        </div>
    )
}