import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data";

const ItemDetailContainer = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const detalleProducto = products.find(p => p.id === id);
        setProduct(detalleProducto);
    })

    if (!product) return <div>Cargando...</div>

    return (
        <div className="is-flex is-flex-direction-row is-justify-content-space-around">
            <img className="image is-3by2" src={`../${product.img}`} alt={product.name} />
            <div className="card">
                <section className="card-content">
                    <h1 className="is-size-1 has-text-centered has-text-weight-medium">{product.name}</h1>
                    <p className="mt-6 is-size-4 has-text-centered has-text-weight-light">{product.description}</p>
                    <p className="mt-6 pt-5 is-size-2 has-text-centered has-text-weight-bold">${product.price}</p>
                    <section className="has-text-centered">
                        <button className="has-background-light is-size-5 mt-6 p-5 ">Agregar al carrito</button>
                    </section>
                </section>
            </div>
        </div>
    );
};

export default ItemDetailContainer;