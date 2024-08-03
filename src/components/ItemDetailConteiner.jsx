import React, { useState, useEffect } from "react";
import './loader.css';
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import ItemQuantitySelector from "./ItemQuantitySelector";
import AddItemButton from "./AddItemButton";

const ItemDetailContainer = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [stock, setStock] = useState();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productDoc = doc(db, "productos", id);

                const docSnap = await getDoc(productDoc);

                if (docSnap.exists()) {
                    const productData = { id: docSnap.id, ...docSnap.data() };
                    setProduct(productData);
                    setStock(productData.stock);
                } else {
                    console.error("No existe el documento!");
                }
            } catch (error) {
                console.error("Error fetcheando producto: ", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct()
    }, [id])

    if (!product) return (
        <div className="is-flex is-justify-content-center is-align-items-center" style={{ height: '100vh' }}>
            <div className="loader">
            </div>
        </div>
    )


    return (
        <div className="is-flex is-flex-direction-row is-justify-content-space-around">
            <img className="image is-3by2" src={`${product.img}`} alt={product.name} />
            <div className="card">
                <section className="card-content">
                    <h1 className="is-size-1 has-text-centered has-text-weight-medium">{product.name}</h1>
                    <p className="mt-6 is-size-4 has-text-centered has-text-weight-light">{product.description}</p>
                    <p className="mt-6 pt-5 is-size-2 has-text-centered has-text-weight-bold">${product.price}</p>
                    {stock > 0 ? ( // Mostrar el selector de cantidad y el botón de agregar al carrito solo si hay stock disponible
                        <>
                            <ItemQuantitySelector quantity={quantity} setQuantity={setQuantity} stock={stock} />
                            <section className="has-text-centered">
                                <AddItemButton product={product} quantity={quantity} stock={stock} />
                            </section>
                        </>
                    ) : (
                        <p className="has-text-danger has-text-centered ">Fuera de stock</p> // Mostrar mensaje de fuera de stock si no hay stock disponible
                    )}
                </section>

            </div>
        </div >
    );
};

export default ItemDetailContainer;