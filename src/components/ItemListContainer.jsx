import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { products } from '../data'

const ItemListContainer = ({ greeting, subgreeting }) => {
    const { id } = useParams();
    const [productosFiltrados, setProductosFiltrados] = useState([]);

    useEffect(() => {
        if (id) {
            setProductosFiltrados(products.filter(product => product.category.toLowerCase() === id.toLowerCase()));
        } else {
            setProductosFiltrados(products);
        }
    }, [id]);

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
                                    <img src={`../${product.img}`} alt={product.name} />
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-content">
                                        <NavLink to={`/item/${product.id}`}>
                                            <p className="title is-4 has-text-weight-semibold">{product.name}</p>
                                            <p className="mt-2 subtitle is-6 is-italic has-text-weight-light">{product.description}</p>
                                           <span  className="is-flex is-flex-direction-row is-justify-content-space-around has-text-black-ter is-align-items-center">
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

//*ItemListContainer.jsx