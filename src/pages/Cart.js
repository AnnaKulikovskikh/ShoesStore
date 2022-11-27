import { useContext, useRef } from "react"
import { Context } from '../Context'

export default function Cart() {
    // отображение заказанных товаров
    const { cart, outCart, emptyCart } = useContext(Context)
    let total = 0
    if (cart.length > 0) total = cart.reduce((sum, shoe) => sum + shoe.price * shoe.count, 0)
    const cartGoods = cart.map((item, index) => {
        return (
            <tr key={item.key}> 
                <td className="table">{index + 1}</td>
                <td className="table">{item.title}</td>
                <td className="table">{item.size}</td>
                <td className="table">{item.count}</td>
                <td className="table">{item.price}</td>
                <td className="table">{item.count*item.price}</td>
                <td className="table"><button className="btn-link" onClick={() => outCart(item.key)}>Удалить</button></td>
            </tr>
        )
    })

    //оформление заказа
    const tel = useRef(null)
    const address = useRef(null)
    const agree = useRef(null)

    function order(e) {
        e.preventDefault()
        if (!tel.current.value || !address.current.value) {
            alert('Введите телефон и адрес!')
            return null
        }
        if (!agree.current.checked) {
            alert('Необходимо согласие с правилами доставки!')
            return null
        }
        const purchase = cart.map(item => {
            return {"id": item.id, "price": item.price, "count": item.count}
        })
        const orderInfo = {
            "owner": {
                "phone": tel.current.value,
                "address": address.current.value
            },
            "items": purchase
        }

        const options = {
            method: "POST",
            body: JSON.stringify(orderInfo),
            headers: {"Content-Type": "application/json"}
        }

         fetch('http://localhost:7070/api/order', options)
            .then(res => {
                res.json()
                if (res.ok) {
                    tel.current.value = ""
                    address.current.value = ""
                    agree.current.checked = false
                    emptyCart()
                } else {
                    throw new Error(res.status)
                }
                
            })
    }

    return (
        <div className="cart">
            <h2>Корзина</h2>
            <table className="goods-list">
              <thead>
              <tr>
                <th className="table head">#</th>
                <th className="table head">Название</th>
                <th className="table head">Размер</th>
                <th className="table head">Количество</th>
                <th className="table head">Стоимость</th>
                <th className="table head">Итого</th>
                <th className="table head">Действие</th>
              </tr>
              </thead>
              <tbody>
                {cartGoods}
              <tr>
                <td className="table total" colSpan={5}>Общая стоимость</td>
                <td className="table total-price">{total}</td>
              </tr>
              </tbody>
            </table>

            <h2>Оформить заказ</h2>
            <form className="order-form" onSubmit={order}>
                <label htmlFor="tel">Телефон</label>
                <input placeholder="Ваш телефон" id="tel" type="tel" ref={tel} />
                <label htmlFor="adress">Адерс доставки</label>
                <input placeholder="Адрес доставки" id="adress" type="text" ref={address} />
                <label><input type="checkbox" ref={agree} />Согласен с правилами доставки</label>
                <button type="submit" className="btn-link">Оформить</button>
            </form>
        </div>
    )
}
