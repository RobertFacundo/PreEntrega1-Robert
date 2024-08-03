import React, { useState } from "react";
const ItemQuantitySelector = ({ quantity, setQuantity, stock }) => {
    const handleIncrease = () => {
        if (quantity < stock) {
            setQuantity(quantity + 1);
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className="container">
            <div className="columns is-centered">
                <div className="column is-two-third">
                    <div className="field has-addons is-fluid mt-3">
                        <p className="control">
                            <button className="button is-light" onClick={handleDecrease}>-</button>
                        </p>
                        <p className="control ">
                            <input className="input has-text-centered" type="text" value={quantity} readOnly />
                        </p>
                        <p className="control">
                            <button className="button is-light" onClick={handleIncrease}>+</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemQuantitySelector;