import React, {useState} from "react"
const Context = React.createContext()

function ContextProvider(props) {
    const [activeMenu, setActiveMenu] = useState()
    return (
        <Context.Provider value={{activeMenu}}>
            {props.children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}