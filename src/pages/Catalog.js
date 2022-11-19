import { useRef } from "react"

export default function Catalog() {
    const seek = useRef(null)

    return (
        <div className="catalog">
            <form className="seek">
                <input ref={seek} placeholder="Поиск" />
            </form>
        </div>
    )
}