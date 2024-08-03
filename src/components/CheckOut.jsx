import React, { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { db } from "../services/firebase";
import { collection, addDoc, doc, writeBatch, getDoc } from 'firebase/firestore';

const CheckOut = () => {
    const { cartItems, total, clearCart, removeItem } = useContext(CartContext);
    const [orderId, setOrderId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        phone: '',
        email: '',
        emailConfirm: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.email != formData.emailConfirm) {
            alert("Los correos electrónicos no coinciden");
            return;
        }

        const order = {
            items: cartItems,
            total,
            ...formData,
            date: new Date().toISOString(),
            status: 'generada'
        };

        try {
           
            const docRef = await addDoc(collection(db, 'orders'), order);
            setOrderId(docRef.id);

            
            const batch = writeBatch(db);

            for (const item of cartItems) {
                const itemRef = doc(db, 'productos', item.id);
                const itemDoc = await getDoc(itemRef);

                if (itemDoc.exists()) {
                    const newStock = itemDoc.data().stock - item.quantity;

                    if (newStock < 0) {
                        throw new Error(`Stock insuficiente para el producto ${item.name}`);
                    }

                    batch.update(itemRef, { stock: newStock });
                } else {
                    throw new Error(`Producto ${item.id} no encontrado`);
                }
            }

            await batch.commit();

            clearCart();

        } catch (error) {
            console.error("Error al generar la orden o actualizar el stock: ", error);
        }
    };

    if (orderId) {
        return (
            <div className="container is-flex is-flex-direction-column mt-6 is-align-items-center" >
                <div className="has-text-centered">
                <h1 className="title has-text-success">Orden generada con éxito</h1>
                <p><br />El ID de su orden es <strong>{orderId}</strong>.</p>
                <p><br />Gracias por su compra.</p>
            </div>
            </div>
        );
    }

    return (
        <div className="container">
            <h1 className="title">Checkout</h1>
            <div className="columns">
                <div className="column is-one-third">
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="label">Nombre</label>
                            <div className="control">
                                <input className="input" type="text" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Apellido</label>
                            <div className="control">
                                <input className="input" type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Teléfono</label>
                            <div className="control">
                                <input className="input" type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control">
                                <input className="input" type="email" name="email" value={formData.email} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Confirmar Email</label>
                            <div className="control">
                                <input className="input" type="email" name="emailConfirm" value={formData.emailConfirm} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button className="has-background-light  p-5 is-link" type="submit">Generar Orden</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="column is-two-thirds">
                    <div className="is-flex is-justify-content-center is-align-items-center mb-4">
                        <h2 className="title is-4 mr-3">Resumen de productos</h2>
                        <button className="button is-light" onClick={clearCart}>Limpiar Carrito</button>
                    </div>
                    <ul className="columns is-multiline mt-2">
                        {cartItems.map(item => (
                            <li key={item.id} className="columns is-vcentered">
                                <div className="column is-half">
                                    <figure className="image is-128x128">
                                        <img src={item.img} alt={item.name} />
                                    </figure>
                                </div>
                                <div className="column is-half">
                                    <p><strong>{item.name}</strong></p>
                                    <p>Cantidad: {item.quantity}</p>
                                    <p>Precio: ${item.price}</p>
                                    <button className="button is-light is-small mt-3" onClick={() => removeItem(item.id)}>Eliminar Item</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p className="is-size-4 has-text-weight-bold is-flex is-justify-content-center is-align-items-center ">Total: ${total}</p>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;