import './App.css';
import {Routes , Route} from "react-router-dom";
import Home from './pages/Home';
import Customers from './pages/Customers';
import Products from './pages/Products';
import Stores from './pages/Stores';
import Sales from './pages/Sales';
import Layout from './Components/Layout/Layout';



function App() {
    return (
      <>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home />} />
            <Route path="stores" element={<Stores />} />
            <Route path="products" element={<Products />} />
            <Route path="customers" element={<Customers />} />
            <Route path="sales" element={<Sales />} />
          </Route>
        </Routes>
      </>
    );
    
}

export default App;