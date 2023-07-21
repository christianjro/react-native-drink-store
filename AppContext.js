import React, { createContext, useState } from 'react';

const AppContext = createContext()

const AppProvider = ({children}) => {
    const [ cart, setCart ] = useState([])

    function addToCart(drinkItem) {
        setCart( (prevCartState) => {
			const isItemInCart = prevCartState.some(item => item.id === drinkItem.id)
			if (isItemInCart) {
				const updatedCart = prevCartState.map(item => {
					if (item.id === drinkItem.id) {
						return { ...item, quantity: item.quantity + 1 }
					}
					else {
						return item
					}
				})
				return updatedCart
			}
			else {
				return [...prevCartState, {...drinkItem, quantity: 1}]
			}
		});
    }

    function removeFromCart(drinkItem) {
        setCart((prevCartState) => {
			const isItemInCart = prevCartState.some(item => item.id === drinkItem.id)
			if (isItemInCart) {
				const updatedCart = prevCartState.map(item => {
					if (item.id === drinkItem.id && item.quantity >= 1) {
						return {...item, quantity: item.quantity - 1}
					}
					else {
						return item
					}
				})
				// to remove items that are less than 0
				const filteredCart = updatedCart.filter(item => item.id !== drinkItem.id || item.quantity > 0) 
				return filteredCart
			} 
			else {
				return prevCartState.filter((item) => item !== drinkItem)
			}
		})
    }

    return (
        <AppContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppProvider }