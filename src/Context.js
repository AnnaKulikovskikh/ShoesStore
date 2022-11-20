import React, { useState, useEffect } from "react"
import { stringify } from "uuid"
const Context = React.createContext()

function ContextProvider(props) {
    const url = 'http://localhost:7070/api/'

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
     const [selected, setSelected] = useState(-1)
     const [categories, setCategories] = useState([])
     const [isLoadCategories, setLoadCategories] = useState(false)
     
     useEffect(() => {
         fetch(`${url}categories`)
             .then(res => res.json())
             .then(data => {
                 setCategories([{"id": -1, "title": "Все"} ,...data])
                 setLoadCategories(true)
             })
     }, [])
 
     function onSelectSort(sort) {
         setView(true)
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
     // http://localhost:7070/api/items?categoryId=X&offset=6
     // http://localhost:7070/api/items?categoryId=12&offset=6  
     //`${url}items?categoryId=${selected}&offset=${loadItem}`
     //if selected === -1  `${url}items?offset=${loadItem}`
 
     function loadMore(){
         setLoadItem(prev => prev + 6)
         let isUrl=`${url}items?offset=${loadItem}`
         //if (selected !== -1) isUrl = `${url}items?categoryId=${selected}&offset=${loadItem}`
         fetch(isUrl)
             .then(res => res.json())
             .then(data => {
                 setCatalog(prev => prev.concat(data))
                 //onSelectSort(selected)
                 if (selected === -1) {
                     setDisplayShoes(prev => prev.concat(data))
                 } else {
                     setDisplayShoes(prev => prev.concat(data.filter(item => item.category === selected)))
                 }
                 
                 if (data.length === 0 || data.length % 6 !== 0) setView(false) 
         })
     }

     //Поиск
     const [text, setText] = useState('Поиск')

     function seeker(e, text){
        e.preventDefault()
        setText(text)
        fetch(`${url}items?q=${text}`)
            .then(res => res.json())
            .then(data => setDisplayShoes(data))
    }

    //В корзину
    const [cart, setCart] = useState(
        () => JSON.parse(localStorage.getItem("cart")) || []
    )

    React.useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    function toCart(detail) {
        setCart(prev => [...prev, detail])
        //window.location.href = "/cart"
    }

    function outCart(id) {
        setCart(prev => prev.filter(item => item.id !== id))

    }

    function emptyCart() {
        console.log('clear')
        localStorage.clear()
        setCart([])
    }

    return (
        <Context.Provider value={{ isLoadCategories, categories, selected, onSelectSort, isLoad, displayShoes, view, loadMore, seeker, text, toCart, outCart, cart }}>
            {props.children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}