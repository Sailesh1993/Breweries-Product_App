import React from "react";
import './index.css';

import ListWithSearch from "./components/ListWithSearch";
import SingleProductPage from "./pages/SingleProductPage";
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import ContactPage from "./pages/ContactPage";

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<ListWithSearch />} >
        </Route> 
        <Route path="/products/:id" element={<SingleProductPage />} />
        <Route path="/contact" element={<ContactPage/>}/>
        
      </Routes>
    </BrowserRouter>

  );
}

export default App;
