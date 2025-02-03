import './App.css';
import React from "react";
import Header from "./components/Layout/Header/Header"
import Home from "./components/Home/Home"
import Learn from "./components/Services/Learn"
import Products from "./components/Products/Products"
import Search from "./components/Products/Search"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductDetails from "./components/Products/ProductDetails"
import LoginSignUp from './components/User/LoginSignUp';
import store from './store'
import { loadUser } from './actions/userAction';
import UserOptions from './components/Layout/Header/userOptions';
import { useSelector } from 'react-redux';
import Profile from './components/User/Profile';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import ProtectedRoute from './components/Route/ProtectedRoute';
import Fav from './components/Favorites/Fav';
import  Dashboard from './components/Admin/Dashboard';
import  ProductList from './components/Admin/ProductList';
import UpdateProduct from './components/Admin/UpdateProduct';
import UpdateUser from './components/Admin/UpdateUser';
import NewProducts from './components/Admin/NewProducts';
import  UsersList from './components/Admin/UsersList';
import Footer from './components/Layout/Footer/Footer';
import Fabrics from './components/Customizefabric/Fabrics';
import Aboutus from "./components/AboutUS/Aboutus";
import Contact from "./components/ContactUs/Contact";
import ProductReviews from './components/Admin/ProductReviews';
function App() {

  const {isAuthenticated,user} = useSelector(state=>state.user)

  React.useEffect(()=>{
    setInterval(()=>{
      store.dispatch(loadUser())
    }, 40000);
  }, [])

  // React.useEffect(() => {
  //   store.dispatch(loadUser());
  // }, []);

  return (
    <div>
      <BrowserRouter>
    
   
         <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/services" element={<Learn />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route path="/account" element={<Profile />} />
          <Route path="/fabrics" element={<Fabrics />} />
          {/* {isAuthenticated && <Route path="/account" element={<Profile />} />} */}
          <Route path="/me/update" element={<UpdateProfile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/logout" element={<LoginSignUp />} />
          <Route path="/favorites" element={<Fav/>} />
          <Route path="/admin/dashboard" element={<ProductList/>} />
          <Route path="/admin/products" element={<ProductList/>} />
          <Route path="/admin/product" element={<NewProducts/>} />
          <Route path="/admin/product/:id" element={<UpdateProduct/>} />
          <Route path="/admin/users" element={<UsersList/>} />
          <Route path="/admin/user/:id" element={<UpdateUser/>} />
          <Route path="/admin/reviews" element={<ProductReviews/>} />
        </Routes>
        <Footer />
      
      {/* <ProductCard/>*/}
    
      </BrowserRouter>
    
    </div>
  );
}

export default App;
