import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import SortMenu from '../components/SortMenu'
import ShoesList from '../components/ShoesList'

export default function Main() {
    const url = 'http://localhost:7070/api/'

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

    //Каталог
    const [catalog, setCatalog] = useState([])
    const [isLoad, setLoad] = useState(false)
    const [displayShoes, setDisplayShoes] = useState([])

    useEffect(() => {
        fetch(`${url}items`)
            .then(res => res.json())
            .then(data => {
                setCatalog(data)
                setDisplayShoes(data)
                setLoad(true)
            })
    }, [])

    // Категории товаров
    const [categories, setCategories] = useState([])
    const [isLoadCategories, setLoadCategories] = useState(false)
    const [selected, setSelected] = useState(-1)

    useEffect(() => {
        fetch(`${url}categories`)
            .then(res => res.json())
            .then(data => {
                setCategories([{"id": -1, "title": "Все"} ,...data])
                setLoadCategories(true)
            })
    }, [])

    function onSelectSort(sort) {
        setSelected(sort)
        if (sort === -1) {
            setDisplayShoes(catalog)
            return
        }
        setDisplayShoes(catalog.filter(item => item.category === sort))
    }

    // Дозагрузка
    const [view, setView] = useState(true)
    const [loadItem, setLoadItem] = useState(6)
    
    function loadMore(){
        setLoadItem(prev => prev + 6)
        fetch(`${url}items?offset=${loadItem}`)
            .then(res => res.json())
            .then(data => {
                setCatalog(prev => prev.concat(data))
                //onSelectSort(selected)
                if (selected === -1) {
                    setDisplayShoes(prev => prev.concat(data))
                } else {
                    setDisplayShoes(prev => prev.concat(data.filter(item => item.category === selected)))
                }
                
                if (data.length % 6 !== 0) setView(false) 
        })
    }

    return (
        <div className="main">
            <h2>Хиты продаж!</h2>
            <div className="cards">
                {isLoadHit ? dispalayHits : 'loading'}
            </div>
            <h2>Каталог</h2>
            {isLoadCategories ? <SortMenu categories={categories} selected={selected} onSelectSort={onSelectSort} /> : 'loading'}
            {isLoad ? <ShoesList shoes={displayShoes}/> : 'loading'}
            {view && <button onClick={loadMore} >Загрузить еще</button>}
        </div>
    )
}