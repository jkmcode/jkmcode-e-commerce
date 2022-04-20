import React, { useState, useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Cookies from "js-cookie";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";
import { useTranslation } from "react-i18next";
import {
  REQUEST_FAILED_WITH_STATUS_CODE_500,
  REQUEST_FAILED_WITH_STATUS_CODE_500_EN,
  REQUEST_FAILED_WITH_STATUS_CODE_500_PL,
} from "../constants/EnvConstans";

function OrderScreen({ match }) {
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const lng = {
    language: Cookies.get("i18next"),
  };

  const [sdkReady, setSdkReady] = useState(false);
  const [msgError, setMsgError] = useState("");

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }

  const addPayPalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AdPCHwjt0XfTPOjRQqj2TMpagWCjF65O_MiIFwgygPKEkuxMA7qgqVj61HK2cyJCwup3ukwEJIfTrvlT";
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (
      !order ||
      successPay ||
      order._id !== Number(orderId) ||
      successDeliver
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, orderId, successPay, successDeliver]);

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

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <div className="margin-top-from-navbar">
      <Loader />
    </div>
  ) : error ? (
    <div className="margin-top-from-navbar">
      <Message variant="danger">{msgError}</Message>
    </div>
  ) : (
    <div className="margin-top-from-navbar">
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>{t("OrderScreen_title_shipping")}</h2>
              <p>
                <strong>{t("OrderScreen_shipping_name")}: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>{t("OrderScreen_shipping_shipping")}: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}
                {"  "}
                {order.shippingAddress.postalCode},{"  "}
                {order.shippingAddress.country}
              </p>

              {order.isDelivered ? (
                <Message variant="success">
                  {t("OrderScreen_message_delivered_on")}{" "}
                  {order.deliveredAt.substring(0, 10)}{" "}
                  {t("OrderScreen_message_delivered_on_time")}{" "}
                  {order.deliveredAt.substring(11, 16)}
                </Message>
              ) : (
                <Message variant="warning">
                  {t("OrderScreen_message_not_delivered")} {order.padAt}
                </Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>{t("OrderScreen_title_payment_method")}</h2>
              <p>
                <strong>{t("OrderScreen_payment_method")}: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">
                  {t("OrderScreen_message_paid_on")} {order.padAt}
                </Message>
              ) : (
                <Message variant="warning">
                  {t("OrderScreen_message_not_paid")}
                  {order.padAt}
                </Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>{t("OrderScreen_title_order_items")}</h2>
              {order.orderItems.length === 0 ? (
                <Message variant="info">Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={5}>
                          {item.qty} X ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{t("OrderScreen_table_title_order_summary")}</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>{t("OrderScreen_table_items")}:</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>{t("OrderScreen_table_shipping")}:</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>{t("OrderScreen_table_tax")}:</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>{t("OrderScreen_table_total")}:</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}

                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>

            {userInfo &&
              userInfo.IsAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <Button
                  type="button"
                  className="bg-brown rounded mt-3 mb-3"
                  onClick={deliverHandler}
                >
                  Mark as Deliver
                </Button>
              )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;
