
import React from "react";
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ItemDetailContainer from "./components/ItemDetailConteiner";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<ItemListContainer greeting="Bienvenidos" subgreeting='Encontrá los mejores muebles y decoraciones para tu hogar' />} />
        <Route exact path="/category/:id" element={<ItemListContainer greeting="Productos por categoría" subgreeting='Encontrá los mejores muebles y decoraciones para tu hogar' />} />
        <Route path="/item/:id" element={<ItemDetailContainer />} />
      </Routes>
    </Router>
  )
}

export default App
