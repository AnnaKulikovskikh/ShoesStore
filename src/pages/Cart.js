export default function Cart() {
    return (
        <div className="cart">
            <h2>Корзина</h2>
            <div className="goods-list">
                <div className="table head">#</div>
                <div className="table head">Название</div>
                <div className="table head">Размер</div>
                <div className="table head">Количество</div>
                <div className="table head">Стоимость</div>
                <div className="table head">Итого</div>
                <div className="table head">Действие</div>
                <div className="table">1</div>
                <div className="table"></div>
                <div className="table"></div>
                <div className="table"></div>
                <div className="table"></div>
                <div className="table"></div>
                <div className="table"><button className="btn-link">Удалить</button></div>
                <div className="total">Общая стоимость</div>
                <div className="total-price"></div>
            </div>
            <h2>Оформить заказ</h2>
            <form class="order-form">
                <label for="tel">Телефон</label>
                <input placeholder="Ваш телефон" id="tel" type="tel"/>
                <label for="adress">Адерс доставки</label>
                <input placeholder="Адрес доставки" id="adress" type="text"/>
                <label><input type="checkbox" />Согласен с правилами доставки</label>
                <button type="submit" className="btn-link">Оформить</button>
            </form>
        </div>
    )
}