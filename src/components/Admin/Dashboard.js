import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllUsers } from "../../actions/userAction.js";

const Dashboard = () => {
  const dispatch = useDispatch();

const { products } = useSelector((state) => state.products);
 const { users } = useSelector((state) => state.allUsers);



  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <Sidebar />
        <div className="dashboardContainer">
        <div component="h1">Dashboard</div>

        <div className="dashboardSummary">
        <div>
        </div>
        <div className="dashboardSummaryBox2">
        <Link to="/admin/products">
            <p>Product</p>
            <p>{products && products.length}</p>
        </Link>
        <Link to="/admin/users">
            {/* <p>Users</p>
            <p>{users && users.length}</p> */}
        </Link>
        </div>
        </div>

</div>
    </div>
  );
};

export default Dashboard;



