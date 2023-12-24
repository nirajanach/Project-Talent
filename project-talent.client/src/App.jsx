import './App.css';
import {Routes , Route} from "react-router-dom";
import Layout from './pages/Layout';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import Customers from './pages/Customers';
import Products from './pages/Products';
import Stores from './pages/Sales';



function App() {
    return (
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="stores" element={<Stores />} />
            <Route path="products" element={<Products />} />
            <Route path="customers" element={<Customers />} />
          </Route>
        </Routes>
      </>
    );
    
}

export default App;