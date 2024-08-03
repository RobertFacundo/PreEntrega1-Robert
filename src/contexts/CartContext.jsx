import React, { createContext, useEffect, useState } from "react";
import swal from 'sweetalert';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    
    useEffect(() => {
        try {
            const savedCartItems = localStorage.getItem('cartItems');
            if (savedCartItems) {
                const parsedItems = JSON.parse(savedCartItems);
                if (parsedItems.length > 0) {
                    setCartItems(parsedItems);
                }
            }
        } catch (error) {
            console.error("Error cargando localStorage:", error);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        } catch (error) {
            console.error("Error cargando localStorage:", error);
        }
    }, [cartItems]);

    const addItem = (item, quantity) => {
        const isSuccess = new Promise((resolve) => {
            setCartItems(prevItems => {
                const existingItem = prevItems.find(cartItem => cartItem.id === item.id);

                if (existingItem) {
                    const newQuantity = existingItem.quantity + quantity;

                    if (newQuantity <= item.stock) {
                        resolve(true);
                        return prevItems.map(cartItem =>
                            cartItem.id === item.id
                                ? { ...cartItem, quantity: newQuantity }
                                : cartItem
                        );
                    } else {
                        swal("Lo sentimos", "No se puede agregar más unidades de este producto al carrito.", "error");
                        resolve(false);
                        return prevItems;
                    }
                } else {
                    if (quantity <= item.stock) {
                        resolve(true);
                        return [...prevItems, { ...item, quantity }];
                    } else {
                        swal("Lo sentimos", "No se puede agregar más unidades de este producto al carrito.", "error");
                        resolve(false);
                        return prevItems;
                    }
                }
            });
        });

        return isSuccess;
    };

    const removeItem = (itemId) => {
        setCartItems(prevItems => {
            return prevItems
                .map(item => {
                    if (item.id === itemId) {
                        const newQuantity = item.quantity - 1;
                        if (newQuantity > 0) {
                            return { ...item, quantity: newQuantity };
                        }
                        return null;
                    }
                    return item;
                })
                .filter(item => item !== null);
        });
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, clearCart, removeItem, addItem, total }}>
            {children}
        </CartContext.Provider>
    );
};