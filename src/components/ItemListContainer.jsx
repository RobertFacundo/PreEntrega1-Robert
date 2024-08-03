import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import './loader.css';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebase";

const ItemListContainer = ({ greeting, subgreeting }) => {
    const { id } = useParams();
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsCollection = collection(db, "productos");

                const q = id
                    ? query(productsCollection, where("category", "==", id.toLowerCase()))
                    : query(productsCollection);

                const querySnapshot = await getDocs(q);
                const productos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

                setProductosFiltrados(productos)
            } catch {

                console.error("Error fetcheando producto: ", error);
            } finally {
                setLoading(false);

            }
        };

        fetchProducts();
    }, [id]);

    if (loading) return (
        <div className="is-flex is-justify-content-center is-align-items-center" style={{ height: '100vh' }}>
            <div className="loader">
            </div>
        </div>
    )

    return (
        <div className="container">
            <h2 className="is-size-5 has-text-weight-semibold">{greeting}</h2>
            <h5 className="is-size-6 ml-6 is-italic has-text-weight-light">
                {id ? `${id.charAt(0).toUpperCase() + id.slice(1)}` : subgreeting}
            </h5>
            <div className="columns is-multiline mt-3 is-centered">
                {productosFiltrados.map(product => (
                    <div key={product.id} className="column is-one-quarter">
                        <div className="card">
                            <div className="card-image">
                                <figure className="image is-4by3">
                                    <img src={`${product.img}`} alt={product.name} />
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-content">
                                        <NavLink to={`/item/${product.id}`}>
                                            <p className="title is-4 has-text-weight-semibold">{product.name}</p>
                                            <p className="mt-2 subtitle is-6 is-italic has-text-weight-light">{product.description}</p>
                                            <span className="is-flex is-flex-direction-row is-justify-content-space-around has-text-black-ter is-align-items-center">
                                                <p className="has-text-weight-bold">${product.price}</p>
                                                <button className="has-background-light p-3">Ver detalles</button>
                                            </span>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default ItemListContainer;

