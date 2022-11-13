//компоеннет выводит меню - Все - Мужская - Женская - Десткая

export default function SortMenu(props) {
    const menu = props.categories.map(item => {
        return (
        <li key={item.id}
            className={item.id===props.selected ? "active" : "li"}
            onClick={() => props.onSelectSort(item.id)}>
            {item.title}
        </li>
        )
    })

    return (
        <ul className="categories">
            {menu}
        </ul>
    )
}