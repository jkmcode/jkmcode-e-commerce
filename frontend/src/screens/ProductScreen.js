import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { Row, Col, ListGroup, Button, Card, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ImageSlider from "../components/ImageSlider";
import {
  listProductsDetails,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productsConstants";
import { useTranslation } from "react-i18next";
import {
  REQUEST_FAILED_WITH_STATUS_CODE_500,
  REQUEST_FAILED_WITH_STATUS_CODE_500_EN,
  REQUEST_FAILED_WITH_STATUS_CODE_500_PL,
} from "../constants/EnvConstans";

function ProductScreen({ match, history }) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [msgError, setMsgError] = useState("");

  const stock = {
    inStock: t("ProductScreen_status_in_stock"),
  };

  const lng = {
    language: Cookies.get("i18next"),
  };

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (match.params._id) {
      if (successProductReview) {
        setRating(0);
        setComment("");
        dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
      }

      dispatch(listProductsDetails(match.params._id));
    }
  }, [dispatch, match, successProductReview]);

  useEffect(() => {
    if (error === REQUEST_FAILED_WITH_STATUS_CODE_500) {
      if (lng.language === "en") {
        setMsgError(REQUEST_FAILED_WITH_STATUS_CODE_500_EN);
      }
      if (lng.language === "pl") {
        setMsgError(REQUEST_FAILED_WITH_STATUS_CODE_500_PL);
      }
    }
  }, [error, lng]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params._id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params._id, {
        rating,
        comment,
      })
    );
  };

  return (
    <div className="margin-top-from-navbar">
      <Link to="/" className="btn btn-success my-3 rounded bg-brown">
        {t("ProductScreen_btn_go_back")}
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{msgError}</Message>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <ImageSlider className="img-slider" />
            </Col>

            <Col md={5}>
              <ListGroup>
                <ListGroup.Item>
                  <h4>{product.name}</h4>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>
                      <Rating value={product.rating} color={"#f8e825"} />
                    </Col>

                    <Col>{`${product.numReviews} reviews`}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>{t("ProductScreen_price")}:</strong>
                    </Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>{t("ProductScreen_description")}:</strong>
                    </Col>
                    <Col>
                      {product.description
                        ? product.description
                        : t("ProductScreen_status_no_description")}
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>{t("ProductScreen_status")}:</Col>
                      <Col>
                        {product.countInStock > 0
                          ? t("ProductScreen_status_in_stock")
                          : t("ProductScreen_status_out_of_stock")}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col className="vertical-center">
                          {t("ProductScreen_qty")}:
                        </Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <div className="d-grid gap-2">
                      <Button
                        onClick={addToCartHandler}
                        type="button"
                        className="bg-brown rounded"
                        disabled={product.countInStock === 0}
                      >
                        {t("ProductScreen_btn_add_to_cart")}
                      </Button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="my-5">
              <h4>{t("ProductScreen_reviews")}</h4>
              {product.reviews.length === 0 && (
                <Message variant="info">
                  {t("ProductScreen_no_reviews")}
                </Message>
              )}

              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} color="#f8e825" />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}

                <ListGroup.Item className="p-0">
                  <h4 className="mt-4">{t("ProductScreen_write_a_review")}</h4>

                  {loadingProductReview && <Loader />}
                  {successProductReview && (
                    <Message variant="success">
                      {t("ProductScreen_review_submitted")}
                    </Message>
                  )}
                  {errorProductReview && (
                    <div>
                      <Message variant="danger">
                        {t("ProductScreen_product_already_reviewed")}
                      </Message>
                    </div>
                  )}

                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>{t("ProductScreen_rating")}</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">
                            {t("ProductScreen_form_review_selector")}
                          </option>
                          <option value="1">
                            {t("ProductScreen_form_review_poor")}
                          </option>
                          <option value="2">
                            {t("ProductScreen_form_review_fair")}
                          </option>
                          <option value="3">
                            {t("ProductScreen_form_review_good")}
                          </option>
                          <option value="4">
                            {t("ProductScreen_form_review_very_good")}
                          </option>
                          <option value="5">
                            {t("ProductScreen_form_review_excellent")}
                          </option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="comment" className="mb-3">
                        <Form.Label>
                          {t("ProductScreen_form_review_comment")}
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          row="10"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Button
                        disabled={loadingProductReview}
                        type="submit"
                        variant="primary"
                        className="bg-brown rounded"
                      >
                        {t("ProductScreen_btn_form_submit")}
                      </Button>
                    </Form>
                  ) : (
                    <Message variant="info">
                      {lng.language === "en" ? (
                        <div>
                          Please <Link to="/login">login</Link> to write a
                          review
                        </div>
                      ) : (
                        <div>
                          <Link to="/login">Zaloguj się </Link> aby opublikować
                          opinie
                        </div>
                      )}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
