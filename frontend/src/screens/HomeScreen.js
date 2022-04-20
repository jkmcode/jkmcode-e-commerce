import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import { listProducts } from "../actions/productActions";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { REQUEST_FAILED_WITH_STATUS_CODE_500 } from "../constants/EnvConstans";

function HomeScreen() {
  const { t } = useTranslation();
  const dispach = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

  const [error500, setError500] = useState(false);
  const [errorOther, setErrorOther] = useState(false);

  let historyy = useHistory();
  let keyword = historyy.location.search;

  useEffect(() => {
    if (error) {
      if (error === REQUEST_FAILED_WITH_STATUS_CODE_500) {
        setError500(true);
      } else {
        setErrorOther(true);
      }
    }
  }, [error, error500, errorOther]);

  useEffect(() => {
    dispach(listProducts(keyword));
  }, [dispach, keyword]);

  return (
    <div className="margin-top-from-navbar">
      {!keyword && <ProductCarousel />}
      <h3>{t("latest_products")}</h3>

      {loading ? (
        <Loader />
      ) : error500 ? (
        <div>
          <Message variant="danger">{t("Error_500_MSG")}</Message>
        </div>
      ) : errorOther ? (
        <div>
          <Message variant="danger">{t("Error_Other_MSG")}</Message>
        </div>
      ) : null}

      {!error ? (
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
      ) : null}
    </div>
  );
}

export default HomeScreen;
