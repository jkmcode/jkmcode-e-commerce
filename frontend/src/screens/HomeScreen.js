import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import BookingCalendar from "../components/BookingCalendar";
import ExampleDatePicker from "../components/DatePicker";
import ProductCarousel from "../components/ProductCarousel";
import { listProducts } from "../actions/productActions";
import { useTranslation } from "react-i18next";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";

function HomeScreen() {
  const { t } = useTranslation();
  const dispach = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

  let historyy = useHistory();
  let keyword = historyy.location.search;

  console.log("historyy", historyy);
  console.log("keyword", keyword);

  useEffect(() => {
    dispach(listProducts(keyword));
  }, [dispach, keyword]);

  return (
    <div className="margin-top-from-navbar">
      {/* <div className='test-date-picker'>
                <ExampleDatePicker />
            
            <LinkContainer to={'/tutorial'}>
                <Button className='btn-sm'>
                    Tutorial
                </Button>                                     
            </LinkContainer>
            </div> */}

      {!keyword && <ProductCarousel />}
      <h3>{t("latest_products")}</h3>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <div className="zoom">
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          </div>
          <Paginate page={page} pages={pages} keyword={keyword} />
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
