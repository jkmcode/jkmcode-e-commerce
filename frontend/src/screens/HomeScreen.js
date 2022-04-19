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
import Cookies from "js-cookie";

import {
  REQUEST_FAILED_WITH_STATUS_CODE_500,
  REQUEST_FAILED_WITH_STATUS_CODE_500_EN,
  REQUEST_FAILED_WITH_STATUS_CODE_500_PL,
} from "../constants/EnvConstans";

function HomeScreen() {
  const { t } = useTranslation();
  const dispach = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

  const [msgError, setMsgError] = useState("");

  let historyy = useHistory();
  let keyword = historyy.location.search;

  const lng = {
    language: Cookies.get("i18next"),
  };

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

  useEffect(() => {
    dispach(listProducts(keyword));
  }, [dispach, keyword]);

  return (
    <div className="margin-top-from-navbar">
      {!keyword && <ProductCarousel />}
      <h3>{t("latest_products")}</h3>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{msgError}</Message>
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
