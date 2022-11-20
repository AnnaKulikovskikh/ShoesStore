import { useState, useEffect, useRef, useContext } from "react"
import { useParams } from "react-router"
import { Context } from '../Context'

export default function ShoeDetail() {
    const {toCart} = useContext(Context)
    const quantity = useRef(null)
    const {itemId} = useParams()
    const [shoe, setShoe] = useState()
    const [sizes, setSeizes] = useState('loading')
    const [load, setLoad] = useState(false)
    const [count, setCount] = useState(1)
    const [chosenSize, setChosenSize] = useState(null)
    const url = `http://localhost:7070/api/`

    useEffect(() => {
        fetch(`${url}items/${itemId}`)
            .then(res => res.json())
            .then(data => {
                setShoe(data)
                setLoad(true)
                setSeizes(data.sizes.filter(item => item.avalible)
                    .map((value, index) => <li key ={index} onClick={sizeChose}>{value.size}</li>)
                )
                if (sizes.length === 0) quantity.classList.add('invisible')
            })
    }, [])

    function sizeChose(e) {
        [...document.querySelectorAll('li')].forEach(item => item.classList.remove('chosen-size'))
        e.target.classList.add('chosen-size')
        setChosenSize(e.target.textContent)
    }
    
    function View() {
        return (
            <div className="shoe-card">
                <h2 className="text-center">{shoe.title}</h2>
                <div className="shoe-content">
                    <img src={shoe.images[0]} alt={shoe.title}/>
                    <div className="shoe-text">
                        <div className="shoe-info">
                            <div>Артикул</div>
                            <div>{shoe.sku}</div>
                            <div>Производитель</div>
                            <div>{shoe.manufacturer}</div>
                            <div>Цвет</div>
                            <div>{shoe.color}</div>
                            <div>Материалы</div>
                            <div>{shoe.material}</div>
                            <div>Сезон</div>
                            <div>{shoe.season}</div>
                            <div>Повод</div>
                            <div>{shoe.reason}</div>
                            <div>Цена</div>
                            <div>{shoe.price} руб.</div>
                        </div>
                        <div className="shoe-sizes">
                            <div>Размеры в наличии</div>
                            <ul className="shoe-sizes-list">
                                {sizes}
                            </ul>
                        </div>
                        <div className="quantity" ref={quantity}>
                            <div>Количество</div>
                            <div className="counter">
                                <div className="plus" onClick={() => count > 1 ? setCount(prev => prev - 1) : setCount(count)}>-</div>
                                <div className="count">{count}</div>
                                <div className="plus" onClick={() => count < 10 ? setCount(prev => prev + 1) : setCount(count)}>+</div>
                            </div>
                        </div>
                        {chosenSize && <button 
                            onClick={() => toCart({
                                id: itemId, title: shoe.title, size: chosenSize , count: count, price: shoe.price
                                })}>В корзину</button>}
                    </div>
                </div>
            </div>    
        )
    }

    return (
        <>
            {load ? <View /> : 'loading'}
        </>
    )
}