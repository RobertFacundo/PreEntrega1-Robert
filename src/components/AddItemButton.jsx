import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import swal from 'sweetalert';

const AddItemButton = ({ product, quantity }) => {
    const { addItem, cartItems } = useContext(CartContext);
    const handleAddItem = async () => {
        if (product && product.id && quantity > 0) {
           
            const productStock = product.stock; 

           
            const existingItem = cartItems.find(cartItem => cartItem.id === product.id);
            const currentQuantity = existingItem ? existingItem.quantity : 0;

           
            const totalQuantity = currentQuantity + quantity;

           
            if (totalQuantity <= productStock) {
                const result = addItem(product, quantity);

                if (result) {
                    swal({
                        title: "¡Producto agregado!",
                        text: `${product.name} ha sido agregado al carrito.`,
                        icon: "success",
                        button: "Cerrar",
                    });
                } else {
                    swal({
                        title: "Lo sentimos",
                        text: "No se puede agregar más unidades de este producto al carrito.",
                        icon: "error",
                        button: "Cerrar",
                    });
                }
            } else {
                swal({
                    title: "Lo sentimos",
                    text: "No hay suficiente stock disponible para agregar más unidades al carrito.",
                    icon: "error",
                    button: "Cerrar",
                });
            }
        } else {
            swal({
                title: "Error",
                text: "No se pudo agregar el producto al carrito.",
                icon: "error",
                button: "Cerrar",
            });
        }
    };

    return (
        <button className="has-background-light is-size-5 mt-6 p-5" onClick={handleAddItem}>
            Agregar al carrito
        </button>
    );
};

export default AddItemButton;