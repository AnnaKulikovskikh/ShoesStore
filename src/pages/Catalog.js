import { useRef, useContext } from "react"
import SortMenu from '../components/SortMenu'
import ShoesList from '../components/ShoesList'
import {Context} from '../Context'

export default function Catalog() {
    const seek = useRef(null)
    const { isLoadCategories, categories, selected, onSelectSort, isLoad, displayShoes, view, loadMore, seeker, text} = useContext(Context)

    return (
        <div className="main">
            <h2>Каталог</h2>
            <form className="seek-catalog" onSubmit={(e)=>seeker(e, seek.current.value)}>
                <input ref={seek} placeholder={text} />
            </form>
            {isLoadCategories ? <SortMenu categories={categories} selected={selected} onSelectSort={onSelectSort} /> : 'loading'}
            {isLoad ? <ShoesList shoes={displayShoes}/> : 'loading'}
            {view && <button onClick={loadMore} className="btn-link">Загрузить еще</button>}
        </div>
    )
}