

import React , {Fragment, useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import './Header.css'

const UserOptions = ({user}) => {
  
  const [open,setOpen]=useState(false);
  const dispatch = useDispatch();

  const { favItems } = useSelector((state) => state.favorites);
  const navigate = useNavigate();
  function logoutUser() {
         dispatch(logout());
         alert("Logout Successfully");
      // Wait for the logout action to complete, then navigate to the home page.
  setTimeout(() => {
    navigate("/");
  }, 10000); // You can adjust the delay as needed.
}
         const isAdmin = user.role === "admin";

         const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  return isAuthenticated ? (
    <Fragment>

        <div class="profile-icon">
        <img src={user?.avatar?.url || "Profile.jpg"} alt="Profile Picture" class="profile-picture"/>
       
     </div> 
          
          <div class="profile-links">
           <ul>
           <li> <NavLink to ="/account" class="profile-link">Profile</NavLink></li>
           <li> <NavLink to = "/favorites" class="profile-link">Favorites({favItems.length})</NavLink></li>
           <li> <NavLink to = "/logout" class="profile-link" onClick={logoutUser}>Logout</NavLink></li>
           {isAdmin && ( 
            <li>
              <NavLink to="admin/dashboard" className="profile-link">
                Dashboard
              </NavLink>
            </li>
          )}
            </ul>    
      
        </div>
    </Fragment>
  ) : null;
}

export default UserOptions
