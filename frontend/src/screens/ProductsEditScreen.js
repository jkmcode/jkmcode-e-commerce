import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import axios from "axios";
import _ from "lodash";
import { Link } from "react-router-dom";
import { Form, Button, Image, Row } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { listProductsDetails, updateProduct } from "../actions/productActions";
import { listProductImages } from "../actions/imagesActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productsConstants";

function ProductEditScreen({ match, history }) {
  const productId = match.params.id;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [showResults] = React.useState(false);
  const [image, setImage] = useState([]);
  const [msgTextUpload, setMsgTextUpload] = useState("");
  const [msgTextUploadImages, setMsgTextUploadImages] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [msg, setMsg] = useState(false);

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = productUpdate;
  const productImagesList = useSelector((state) => state.productImagesList);
  const { images } = productImagesList;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== Number(productId)) {
        dispatch(listProductsDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }

    dispatch(listProductImages(productId));
  }, [dispatch, product, productId, history, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);
    formData.append("product_id", productId);

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/products/upload/",
        formData,
        config
      );
      console.log(data);
      setMsg(true);
      setImage(data.image);
      setUploading(false);
      setMsgTextUpload(data.text);
    } catch (error) {
      setUploading(false);
    }
  };

  const uploadMultiFilesHandler2 = async (e) => {
    const formData = new FormData();
    _.forEach(e.target.files, (file) => {
      formData.append("files", file);
    });
    formData.append("product_id", productId);

    setUploadingImages(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/products/multiupload/",
        formData,
        config
      );
      setMsg(true);
      setUploadingImages(false);
      setMsgTextUploadImages(data[0].text);
    } catch (error) {
      setUploadingImages(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  return (
    <div className="margin-top-from-navbar">
      <Link to="/admin/productlist">{t("ProductsEditScreen_btn_go_back")}</Link>

      <FormContainer>
        <h1>{t("ProductsEditScreen_title_edit_product")}</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>{t("ProductsEditScreen_table_name")}</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>{t("ProductsEditScreen_table_price")}</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>{t("ProductsEditScreen_table_image")}</Form.Label>
            </Form.Group>

            <Form.Group controlId="image" className="choose_main_image">
              <Row>
                <Form.File
                  id="image-file"
                  onChange={uploadFileHandler}
                  custom
                  label={t("ProductsEditScreen_btn_choose_photo")}
                  className="m-3 btn-img-upload rounded"
                ></Form.File>
              </Row>
              <Row>
                <p className="text_img_uploaded">
                  {msg ? t(msgTextUpload) : ""}
                </p>
              </Row>
              <Row>
                <Image src={image} className="currentImage" />
                {uploading && <Loader />}
              </Row>
            </Form.Group>

            <Form.Group
              controlId="formFileMultiple"
              className="btn-img-upload rounded mb-3"
              onChange={uploadMultiFilesHandler2}
            >
              <Form.Label>
                {t("ProductsEditScreen_btn_choose_more_photos")}
              </Form.Label>
              <Form.Control type="file" multiple />
            </Form.Group>

            <Row>
              <p className="text_img_uploaded">
                {msg ? t(msgTextUploadImages) : ""}
              </p>
            </Row>
            {showResults ? (
              <Form.Group>
                {loading ? (
                  <Loader />
                ) : error ? (
                  <Message variant="danger">{error}</Message>
                ) : (
                  <div>
                    <Row>
                      {images.map((img) => (
                        <Image
                          key={img.id}
                          src={img.images}
                          className="currentImage"
                        />
                      ))}

                      {uploadingImages && <Loader />}
                    </Row>
                  </div>
                )}
              </Form.Group>
            ) : null}

            <Form.Group controlId="brand">
              <Form.Label>{t("ProductsEditScreen_table_brand")}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countinstock">
              <Form.Label>{t("ProductsEditScreen_table_stock")}</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>{t("ProductsEditScreen_table_category")}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>
                {t("ProductsEditScreen_table_description")}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="my-3 bnt-block bg-brown rounded"
            >
              {t("ProductsEditScreen_btn_update")}
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default ProductEditScreen;
