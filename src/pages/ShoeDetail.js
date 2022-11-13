import { useState, useEffect } from "react"
import { useParams } from "react-router"

export default function ShoeDetail() {
    const {itemId} = useParams()
    const url = `http://localhost:7070/api/items/${itemId}`
    console.log(url)
    const [shoe, setShoe] = useState()
    // const sizes = shoe.sizes.map((value, index) => {
    //     return (
    //         <p key={index}>value.size</p>
    //     )
    // })

    useEffect((url) => {
        fetch(url)
          .then(res => res.json())
          .then(data => {
            setShoe(data)
            console.log(data)
        })
    }, [])

    return (
        <div className="shoe-card"> Shoe
            <h2>{shoe.title}</h2>
            <div className="shoe-content">
                <img src={shoe.images[0]} alt={shoe.title}/>
                <div className="shoe-text">
                    <div className="shoe-info">
                        <p>Артикул</p>
                        <p>{shoe.sku}</p>
                        <p>Производитель</p>
                        <p>{shoe.manufacturer}</p>
                        <p>Цвет</p>
                        <p>{shoe.color}</p>
                        <p>Материалы</p>
                        <p>{shoe.material}</p>
                        <p>Сезон</p>
                        <p>{shoe.season}</p>
                        <p>Повод</p>
                        <p>{shoe.reason}</p>
                        <p>Цена</p>
                        <p>{shoe.price} руб.</p>
                    </div>
                    <div className="shoe-sizes">
                        <p>Размеры в наличии</p>
                        
                    </div>
                    <div className="quantity">
                        <p>Количество</p>
                        <p>1</p>
                    </div>
                    <button>В корзину</button>
                </div>
            </div>
        </div>
    )
}