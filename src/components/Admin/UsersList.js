import React, { Fragment, useEffect } from "react";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "./Sidebar";
import {useNavigate} from 'react-router-dom'
import { getAllUsers, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";
import EditNoteIcon from '@mui/icons-material/EditNote';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const {  users } = useSelector((state) => state.allUsers);

  const {
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {


    if (isDeleted) {
      alert("User Deleted");
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch,  isDeleted, message]);

  return (
    <Fragment>
      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>
          <table className="productListTable">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Email</th>
                <th>Name</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.email}</td>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td>

                    <Link to={`/admin/user/${user._id}`}><EditNoteIcon
                        style={{ color: 'green' }}
                  /></Link>
                  &nbsp; &nbsp; &nbsp; 
                    <DeleteOutlineIcon
                      className="delete-icon"
                       style={{ color: 'red' }}
                        onClick={() => deleteUserHandler(user._id)}
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

export default UsersList;