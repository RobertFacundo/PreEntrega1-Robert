
import React from "react";
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ItemDetailContainer from "./components/ItemDetailConteiner";
import { CartProvider } from "./contexts/CartContext";
import CheckOut from "./components/CheckOut";

function App() {
  return (
    <Router>
      <CartProvider>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<ItemListContainer greeting="Bienvenidos" subgreeting='Encontrá los mejores muebles y decoraciones para tu hogar' />} />
          <Route exact path="/category/:id" element={<ItemListContainer greeting="Productos por categoría" subgreeting='Encontrá los mejores muebles y decoraciones para tu hogar' />} />
          <Route exact path="/item/:id" element={<ItemDetailContainer />} />
          <Route exact path="/checkOut" element={<CheckOut />}/>
        </Routes>
      </CartProvider>
    </Router>
  )
}

export default App
