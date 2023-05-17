import React from "react";
import './index.css';

import ListWithSearch from "./components/ListWithSearch";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SingleProductPage from "./pages/SingleProductPage";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<ListWithSearch />} >
        </Route> 
        <Route path="/products/:id" element={<SingleProductPage />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
