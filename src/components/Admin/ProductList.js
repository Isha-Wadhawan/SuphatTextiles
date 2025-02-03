import React, { Fragment, useEffect } from "react";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getAdminProduct,
  deleteProduct,
} from "../../actions/productAction";
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import SideBar from "./Sidebar";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';

import { DELETE_PRODUCT_RESET } from "../../constants/productConstant";

const ProductList = ({ history }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);

  const { isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
      dispatch(deleteProduct(id));
  };

  useEffect(() => {
  //  if (error) {
  //     alert(error);
  //     dispatch(clearErrors());
  //   }

    if (isDeleted) {
      alert("Product Deleted Successfully");
     navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch]);


  return (
    <Fragment>
      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
          <table className="productListTable">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>

                   <Link to={`/admin/product/${product._id}`}><EditNoteIcon
                        style={{ color: 'green' }}
                  /></Link>
                  &nbsp; &nbsp; &nbsp; 
                    <DeleteOutlineIcon
                      className="delete-icon"
                       style={{ color: 'red' }}
                        onClick={() => deleteProductHandler(product._id)}
                     />
        
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

    </Fragment>
  );
};

export default ProductList;

