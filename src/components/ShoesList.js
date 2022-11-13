import {Link} from 'react-router-dom'
// компонент выводит список карточек с товарами

export default function ShoesList(props) {
    
    const dispalayGoods = props.shoes.map(item => {
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
        <div className="cards">
            {dispalayGoods}
        </div>

    )
}
