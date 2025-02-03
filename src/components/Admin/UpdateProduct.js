import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateProduct,
  getProductDetails,
} from "../../actions/productAction";

import { useParams } from 'react-router-dom';
import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstant";
import { useNavigate } from "react-router-dom";
const UpdateProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product } = useSelector((state) => state.productDetails);
  const navigate = useNavigate();
  const {
    loading,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [fabric, setFabric] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Co-ord Sets",
    "Bottom",
    "Tops",
    "Dresses",
  ];
  const fabrics = [
    "Cotton",
    "Polyester",
    "Jacquard",
    "Embroidery",
    "lace",
  ];

 
  useEffect(() => {

    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);
      setDescription(product.description);
      setCategory(product.category);
      setOldImages(product.images);
    }
    if (isUpdated) {
      alert("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    isUpdated,
    id,
    product,
  ]);

  const updateProductSubmitHandler = async (e) => {
    e.preventDefault();
  
    const myForm = new FormData();
  
    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("category", category);
  
    images.forEach((image) => {
      myForm.append("images", image);
    });
  
    try {
      await dispatch(updateProduct(id, myForm));
      alert("Product Updated Successfully");
      dispatch({ type: UPDATE_PRODUCT_RESET });
      navigate("/admin/products");
    } catch (error) {
      console.error("Product update error:", error);
    }
  };
  

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>

            <div>
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
         
            <div>

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
            <select onChange={(e) => setFabric(e.target.value)}>
                <option value="">Choose Fabric</option>
                {fabrics.map((fabric) => (
                  <option key={fabric} value={fabric}>
                    {fabric}
                  </option>
                ))}
              </select>
            </div>
            
            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <input 
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
              value=  "Update"
            />
            </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;