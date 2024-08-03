import React, {useContext} from "react";
import { CartContext } from "../contexts/CartContext";

const CarWidget = () => {
    const {cartItems} = useContext(CartContext)
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    return (
        <div className="cart-widget pb-3">
            <i className="fas fa-shopping-cart fa-2x "></i>
            <span className="tag is-rounded has-background-grey-light has-text-white">{totalItems}</span>
        </div>
    );
}

export default CarWidget;

//*CartWidget.jsx