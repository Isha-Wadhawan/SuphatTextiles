import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../Layout/loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile, loadUser } from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import { useNavigate } from "react-router-dom";



const UpdateProfile = () => {
  const dispatch = useDispatch();
 const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { isUpdated, loading } = useSelector((state) => state.profile);


  const [name, setName] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [avatar, setAvatar] = useState(" ");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.jpg");

  
  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };


  useEffect(() => {
    console.log("User Profile Data:", user); // Log the user data received from Redux
    console.log("Is Updated:", isUpdated); // Log whether the update was successful
  
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user?.avatar?.url || "Profile.jpg");
    }

    // if (error) {
    //   alert.error(error);
    //   dispatch(clearErrors());
    // }

    if (isUpdated && user) {
      console.log("Profile Updated Successfully");
      dispatch(loadUser());

       navigate("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, user, isUpdated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                 
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;


