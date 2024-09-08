import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import InventoryHome from './pages/inventory/home.inventory';
import Products from './pages/inventory/products/inventory.products';
import TransferProductsPage from './pages/inventory/products/transferProduct.products';
import RemoveProductsPage from './pages/inventory/products/removeProduct.product';
import ReturnsPage from './pages/inventory/products/returns.products';
import ReconciliationsPage from './pages/inventory/products/reconciliations.product';
import RestockProductsPage from './pages/inventory/products/restock.products';
import AddSingleProductPage from './pages/inventory/products/addSingle.products';
import ProductAnalysisPage from './pages/inventory/analysis/analysis.inventory';


const App: React.FC = (any) => {
  return (
    <div className='body'>
       {/* <ToastContainer /> */}
      <Router>
        <Routes>
         
          <Route path='/' element = {<Login/>} />
          <Route path='/dashboard'  element = {<Dashboard/>}/>
          <Route path='/inventory' element = {<InventoryHome/>} />
          <Route path='/inventory/products' element = {<Products/>}/>
          <Route path='/inventory/products/transfer' element = {<TransferProductsPage/>}/>
          <Route path='/inventory/products/remove' element = {<RemoveProductsPage/>}/>
          <Route path='/inventory/products/returns' element = {<ReturnsPage/>}/>
          <Route path='/inventory/products/reconciliations' element = {<ReconciliationsPage/>}/>
          <Route path='/inventory/products/restock' element = {<RestockProductsPage/>}/>
          <Route path='/product/add/single' element = {<AddSingleProductPage/>}/>
          <Route path='/inventory/analytics' element = {<ProductAnalysisPage/>}/>
          <Route path='/inventory/analytics/details' element = {<ProductAnalysisPage/>}/>




          


    


        </Routes>
      </Router>
    </div>
  );
}

export default App;

